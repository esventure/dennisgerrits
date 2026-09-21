// Contact form emails sent directly through Resend (via the connector gateway).
// Replaces the queued send-transactional-email flow for the contact forms,
// so no unsubscribe footer is appended.

import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'

const GATEWAY_URL = 'https://connector-gateway.lovable.dev/resend'
const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY')
const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
const FROM = 'Dennis Gerrits <dennis@dennisgerrits.com>'
const OWNER_EMAIL = 'dennis@dennisgerrits.com'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
// Optional phone: allows +, digits, spaces, dashes, parentheses and dots.
const PHONE_RE = /^\+?[\d\s\-().]{5,29}$/

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&')
    .replace(/</g, '<')
    .replace(/>/g, '>')
    .replace(/"/g, '"')
    .replace(/'/g, '&#39;')

const notificationHtml = (name: string, email: string, phone: string, message: string) => `
<html lang="en" dir="ltr">
  <body style="background-color:#ffffff;font-family:Outfit,Arial,sans-serif;">
    <div style="padding:32px 24px;max-width:560px;">
      <h1 style="font-family:'Bebas Neue','Arial Narrow',sans-serif;font-size:34px;color:#1c0024;letter-spacing:1px;margin:0 0 24px;">New message</h1>
      <p style="font-size:12px;color:#e66300;text-transform:uppercase;letter-spacing:1.5px;margin:0 0 4px;">From</p>
      <p style="font-size:16px;color:#1a1a1a;margin:0 0 4px;">${escapeHtml(name || '—')}${email ? ` <${escapeHtml(email)}>` : ''}</p>
      <p style="font-size:12px;color:#e66300;text-transform:uppercase;letter-spacing:1.5px;margin:12px 0 4px;">Phone</p>
      <p style="font-size:16px;color:#1a1a1a;margin:0;">${escapeHtml(phone || '—')}</p>
      <hr style="border-color:#e8e2dc;margin:20px 0;" />
      <p style="font-size:12px;color:#e66300;text-transform:uppercase;letter-spacing:1.5px;margin:0 0 4px;">Message</p>
      <p style="font-size:15px;color:#1a1a1a;line-height:1.6;white-space:pre-wrap;margin:0;">${escapeHtml(message || '—')}</p>
      <hr style="border-color:#e8e2dc;margin:20px 0;" />
      <p style="font-size:12px;color:#888888;margin:24px 0 0;">This message was sent via the contact form on dennisgerrits.com.</p>
    </div>
  </body>
</html>`

const notificationText = (name: string, email: string, phone: string, message: string) =>
  `New message\n\nFrom: ${name || '—'}${email ? ` <${email}>` : ''}\nPhone: ${phone || '—'}\n\nMessage:\n${message || '—'}\n\nThis message was sent via the contact form on dennisgerrits.com.`

const confirmationHtml = (name: string) => `
<html lang="en" dir="ltr">
  <body style="background-color:#ffffff;font-family:Outfit,Arial,sans-serif;">
    <div style="padding:32px 24px;max-width:560px;">
      <h1 style="font-family:'Bebas Neue','Arial Narrow',sans-serif;font-size:34px;color:#1c0024;letter-spacing:1px;margin:0 0 24px;">Thank you for reaching out</h1>
      <p style="font-size:16px;color:#1a1a1a;line-height:1.6;margin:0 0 16px;">Hi ${escapeHtml(name || 'there')},</p>
      <p style="font-size:16px;color:#1a1a1a;line-height:1.6;margin:0 0 16px;">Your message just landed safely. Thank you for taking the time to write.</p>
      <p style="font-size:16px;color:#1a1a1a;line-height:1.6;margin:0 0 16px;">I’ll get back to you within 24 hours. If it feels right, we can take the next step with a video call. No pressure, no obligations, just a chance to get to know each other.</p>
      <p style="font-size:16px;color:#1a1a1a;line-height:1.6;margin:0 0 16px;">Dennis</p>
      <hr style="border-color:#e8e2dc;margin:24px 0;" />
      <p style="font-size:12px;color:#888888;">Dennis Gerrits — Storyteller, Host & Travel Companion, Amsterdam · dennisgerrits.com</p>
    </div>
  </body>
</html>`

const confirmationText = (name: string) =>
  `Hi ${name || 'there'},\n\nYour message just landed safely. Thank you for taking the time to write.\n\nI’ll get back to you within 24 hours. If it feels right, we can take the next step with a video call. No pressure, no obligations, just a chance to get to know each other.\n\nDennis\n\nDennis Gerrits — Storyteller, Host & Travel Companion, Amsterdam · dennisgerrits.com`

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    if (!LOVABLE_API_KEY || !RESEND_API_KEY) {
      throw new Error('Email connection is not configured')
    }

    const body = await req.json().catch(() => null)
    const type = body?.type
    const name = typeof body?.name === 'string' ? body.name.slice(0, 200) : ''
    const email = typeof body?.email === 'string' ? body.email.trim() : ''
    const message = typeof body?.message === 'string' ? body.message.slice(0, 5000) : ''
    const phone = typeof body?.phone === 'string' ? body.phone.trim().slice(0, 30) : ''

    if (type !== 'notification' && type !== 'confirmation') {
      return new Response(JSON.stringify({ error: 'Invalid type' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }
    if (!EMAIL_RE.test(email)) {
      return new Response(JSON.stringify({ error: 'Invalid email address' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const payload =
      type === 'notification'
        ? {
            from: FROM,
            to: [OWNER_EMAIL],
            reply_to: email,
            subject: 'New message from Dennis Gerrits',
            html: notificationHtml(name, email, message),
            text: notificationText(name, email, message),
          }
        : {
            from: FROM,
            to: [email],
            subject: 'New message from Dennis Gerrits',
            html: confirmationHtml(name),
            text: confirmationText(name),
          }

    const response = await fetch(`${GATEWAY_URL}/emails`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        'X-Connection-Api-Key': RESEND_API_KEY,
      },
      body: JSON.stringify(payload),
    })

    const responseText = await response.text()
    if (!response.ok) {
      console.error(`Resend send failed [${response.status}]: ${responseText}`)
      return new Response(
        JSON.stringify({ error: 'Email provider request failed', status: response.status, details: responseText }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      )
    }

    return new Response(JSON.stringify({ sent: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    console.error('send-contact-email error:', errorMessage)
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})

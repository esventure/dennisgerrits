import * as React from 'npm:react@18.3.1'
import { Body, Container, Head, Heading, Hr, Html, Preview, Text } from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface Props {
  name?: string
  email?: string
  message?: string
}

const Email = ({ name, email, message }: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>New message from {name || 'a visitor'} on your website</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={heading}>New message</Heading>
        <Text style={label}>From</Text>
        <Text style={value}>
          {name || '—'}
          {email ? ` <${email}>` : ''}
        </Text>
        <Hr style={hr} />
        <Text style={label}>Message</Text>
        <Text style={message}>{message || '—'}</Text>
        <Hr style={hr} />
        <Text style={footer}>
          This message was submitted through the contact form on dennisgerrits.com.
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: Email,
  subject: (data: Record<string, unknown>) =>
    `New message from ${data.name || 'a visitor'}`,
  displayName: 'Contact notification',
  previewData: {
    name: 'Jane Smith',
    email: 'jane@example.com',
    message: 'Hi Dennis, we are visiting Amsterdam in October and would love a personal tour.',
  },
  to: 'dennis@dennisgerrits.com',
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Outfit, Arial, sans-serif' }
const container = { padding: '32px 24px', maxWidth: '560px' }
const heading = {
  fontFamily: 'Bebas Neue, Arial Narrow, sans-serif',
  fontSize: '34px',
  color: '#1c0024',
  marginBottom: '24px',
  letterSpacing: '1px',
  margin: '0 0 24px',
}
const label = {
  fontSize: '12px',
  color: '#e66300',
  textTransform: 'uppercase' as const,
  letterSpacing: '1.5px',
  marginBottom: '4px',
  margin: '0 0 4px',
}
const value = { fontSize: '16px', color: '#1a1a1a', margin: '0 0 4px' }
const hr = { borderColor: '#e8e2dc', margin: '20px 0' }
const message = {
  fontSize: '15px',
  color: '#1a1a1a',
  lineHeight: '1.6',
  whiteSpace: 'pre-wrap' as const,
  margin: '0',
}
const footer = { fontSize: '12px', color: '#888888', margin: '24px 0 0' }

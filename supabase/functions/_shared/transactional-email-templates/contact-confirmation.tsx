import * as React from 'npm:react@18.3.1'
import { Body, Container, Head, Heading, Hr, Html, Preview, Text } from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface Props {
  name?: string
}

const Email = ({ name }: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Thanks for reaching out. I will be in touch within 24 hours.</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={heading}>Thanks for reaching out</Heading>
        <Text style={text}>Hi {name || 'there'},</Text>
        <Text style={text}>
          Your message just landed safely. Thank you for taking the time to write. I read
          every note myself.
        </Text>
        <Text style={text}>
          I will get back to you within 24 hours. If it feels right, we can set up a quick
          video call to see if we are a good match. No pressure, no obligations.
        </Text>
        <Text style={text}>
          Warmly,
          <br />
          Dennis
        </Text>
        <Hr style={hr} />
        <Text style={footer}>
          Dennis Gerrits, Personal Travel Companion, Amsterdam · dennisgerrits.com
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: Email,
  subject: 'Thanks for reaching out',
  displayName: 'Contact confirmation',
  previewData: { name: 'Jane' },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Outfit, Arial, sans-serif' }
const container = { padding: '32px 24px', maxWidth: '560px' }
const heading = {
  fontFamily: 'Bebas Neue, Arial Narrow, sans-serif',
  fontSize: '34px',
  color: '#1c0024',
  letterSpacing: '1px',
  margin: '0 0 24px',
}
const text = { fontSize: '16px', color: '#1a1a1a', lineHeight: '1.6', margin: '0 0 16px' }
const hr = { borderColor: '#e8e2dc', margin: '24px 0' }
const footer = { fontSize: '12px', color: '#888888' }

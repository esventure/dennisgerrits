import type { ComponentType } from 'npm:react@18.3.1'
import { contactNotification } from './contact-notification.tsx'
import { contactConfirmation } from './contact-confirmation.tsx'

export interface TemplateEntry {
  component: ComponentType<Record<string, unknown>>
  subject: string | ((data: Record<string, unknown>) => string)
  displayName?: string
  previewData?: Record<string, unknown>
  to?: string
}

export const TEMPLATES: Record<string, TemplateEntry> = {
  'contact-notification': contactNotification,
  'contact-confirmation': contactConfirmation,
}

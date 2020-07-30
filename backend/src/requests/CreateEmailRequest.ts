/**
 * Fields in a request to email a Registrant.
 */
export interface CreateEmailRequest {
  from: string
  subject: string
  html: string
  to: string
  bcc: [string]
}

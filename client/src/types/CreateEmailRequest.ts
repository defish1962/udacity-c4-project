export interface CreateEmailRequest {
  from: string
  to: string
  subject: string
  html: string
  bcc: string[]
}

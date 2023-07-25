export interface SendEmailData {
  to: string
  from: {
    name: string
    email: string
  }
  subject: string
  body: string
}
export interface SendMail {
  send(data: SendEmailData): Promise<void>
}

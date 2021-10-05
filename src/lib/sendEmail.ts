import nodemailer from "nodemailer"
import SMTPTransport from "nodemailer/lib/smtp-transport"

interface MailConfigType {
  from: string
  to: string
  subject: string
  html: string
}
const initialMailDataConfig: Pick<MailConfigType, "from"> = {
  from: process.env.EMAIL_FROM!,
}

const smtpUrl = process.env.EMAIL_SERVER

export const send = async (
  email: string,
  title: string,
  message: string
): Promise<SMTPTransport.SentMessageInfo | never> => {
  try {
    const transporter = await nodemailer.createTransport(smtpUrl, {
      secure: false,
    })
    const config = {
      ...initialMailDataConfig,
      to: email,
      subject: title,
      html: message,
    }
    const result = await transporter.sendMail(config)

    return result
  } catch {
    throw new Error("Email was not send")
  }
}

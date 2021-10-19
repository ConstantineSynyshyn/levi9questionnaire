import { hash } from "bcrypt"

import { userAutoRegistration } from "@db/entities/User"
import { BASE_APP_URL } from "@constants/configuration"
import { send } from "@lib/sendEmail"
import SMTPTransport from "nodemailer/lib/smtp-transport"
import { userUpdateRegistrationData } from "@db/entities/User/User"
import { getConfirmationHash } from "@services/utils"

const emailTitle = "Confirmation email for Levi9 testing platform registration"

const getEmailTemplateWithUrl = (url: string): string => `
  <h3><b>Welcome to Levi9 testing platform!</b></h3>
  <p>You successfully registered on the testing platform.</p>
  <p>To be able to run the test, please confirm your email:</p>
  <a href="${url}">Verify my email!</a></p>;`

const handleAutoRegistration = async (
  email: string
): Promise<
  { message: SMTPTransport.SentMessageInfo; success: true } | Error
> => {
  const confirmationHash = await getConfirmationHash(email)
  await userAutoRegistration(email, confirmationHash)
  const url =
    BASE_APP_URL +
    `registration/confirm/${encodeURIComponent(confirmationHash)}`
  const html = getEmailTemplateWithUrl(url)
  try {
    const result = await send(email, emailTitle, html)

    return {
      message: result,
      success: true,
    }
  } catch {
    return new Error(
      "Something went wrong. Contact admin to receive your link or try again"
    )
  }
}

const handleRequestAuthLink = async (
  email: string
): Promise<
  { message: SMTPTransport.SentMessageInfo; success: true } | Error
> => {
  const confirmationHash = await getConfirmationHash(email)
  await userUpdateRegistrationData(email, confirmationHash)
  const url =
    BASE_APP_URL +
    `registration/confirm/${encodeURIComponent(confirmationHash)}`
  const html = getEmailTemplateWithUrl(url)
  try {
    const result = await send(email, emailTitle, html)

    return {
      message: result,
      success: true,
    }
  } catch {
    return new Error(
      "Something went wrong. Contact admin to receive your link or try again"
    )
  }
}

export { handleAutoRegistration, handleRequestAuthLink }

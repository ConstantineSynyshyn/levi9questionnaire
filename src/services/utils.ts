import { hash } from "bcrypt"
import { NextApiRequest } from "next"
import { getSession } from "next-auth/client"

export const getUserEmail = async (
  req: NextApiRequest
): Promise<string | null | never> => {
  try {
    const session = await getSession({ req })
    const email = session?.user?.email

    return email ? email : null
  } catch {
    throw new Error("Couldn't retrieve session!")
  }
}

export const getConfirmationHash = async (email: string): Promise<string> =>
  await hash(email + Date.now(), 12)

import { hash } from "bcrypt";

import { getUserByEmail, userAutoRegistration } from "@db/entities/User";
import { BASE_APP_URL } from "@constants/configuration";
import { send } from "@lib/sendEmail";

const emailTitle = "Confirmation email for Levi9 testing platform registration";

const emailTemplate =
  "<h3>Wellcome to Levi9 testing platform</h3>" +
  "<p>You successfully regisetred in testing platform</p>" +
  "<p>To be able to run test, please confirm your email: " +
  '<a href="{url}">{text}</a></p>';

/**
 * It is easier to implement to make that logic without next-auth,
 * because it contains a  little bit  overloaded logic
 */
const handleAutoRegistration = async (
  email: string
): Promise<{ success: any } | { error: string } | null> => {
  const user = await getUserByEmail(email);
  if (user?.isAdmin) {
    return Promise.resolve({
      error: "Email reserved. Try other one or connect to administrator",
    });
  }
  const confirmationHash = await hash(email + Date.now(), 12);
  await userAutoRegistration(email, confirmationHash, Boolean(user));
  const url = BASE_APP_URL + `registration/confirm/${confirmationHash}`;
  const html = emailTemplate.replace("{url}", url).replace("{text}", url);
  try {
    const result = await send(email, emailTitle, html);
    // @TODO should return real response
    return Promise.resolve({ success: true });
    // return Promise.resolve({ success: result });
  } catch {
    return Promise.resolve({
      error:
        "Something went wrong. Connect to admin to receive you link or try  again",
    });
  }
};

export { handleAutoRegistration };

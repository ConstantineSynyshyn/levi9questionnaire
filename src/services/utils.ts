import { NextApiRequest } from "next";
import { getSession } from "next-auth/client";

export const getUserEmail = async (
  req: NextApiRequest
): Promise<string | null> => {
  const session = await getSession({ req });
  return Promise.resolve(session?.user?.email || null);
};

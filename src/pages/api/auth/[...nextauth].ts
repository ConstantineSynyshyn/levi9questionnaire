import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

import { getUserByEmail } from "@db/entities/User";
import { verifyPassword } from '../../../lib/auth';

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Username', type: 'text', placeholder: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const user = await getUserByEmail(credentials.email);

        if (!user) {
          throw new Error(`No user with ${credentials.email} email found!`);
        }

        const isValid = await verifyPassword(credentials.password, user.password);

        if (!isValid) {
          throw new Error('Can not be logged in!');
        }
        return Promise.resolve({ email: user.email, isAdmin: user.isAdmin || false });
      },

    }),
    Providers.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    session: async (session) => {
      if (session && session.user) {
        const user = await getUserByEmail(session?.user?.email!);
        session.user = {
          ...session.user,
          // @ts-ignore We need that flag
          isAdmin: user.isAdmin,
        }
      }

      return Promise.resolve(session)
    },
  }
});

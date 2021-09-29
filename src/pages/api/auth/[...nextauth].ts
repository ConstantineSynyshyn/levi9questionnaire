import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

import { confirmUserEmail, getUserByEmail } from "@db/entities/User";
import { verifyPassword } from '../../../lib/auth';
import { hash } from "bcrypt";

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
    Providers.Credentials({
      name: 'hash',
      id: 'hash',
      credentials: {
        hash: { label: '', type: 'string' },
      },
      async authorize(credentials) {

        const hash = credentials?.hash;
        if (!hash) {
          throw new Error(`Invalid activation link!`);
        }
        const user = await confirmUserEmail(hash);
        if (!user || !user.email) {
          throw new Error(`Invalid activation link!${JSON.stringify(user)}`);
        }
        console.log('Credentials.hash', { credentials, user });
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

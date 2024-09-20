import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth, { type DefaultSession } from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import Resend from 'next-auth/providers/resend';
import { db } from './db';
import {
  AUTH_GITHUB_ID,
  AUTH_GITHUB_SECRET,
  AUTH_GOOGLE_ID,
  AUTH_GOOGLE_SECRET,
  EMAIL_FROM,
  ENVIRONMENT,
  NEXTAUTH_SECRET,
} from '@/config';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
    } & DefaultSession['user'];
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    Google({
      clientId: AUTH_GOOGLE_ID as string,
      clientSecret: AUTH_GOOGLE_SECRET as string,
    }),
    GitHub({
      clientId: AUTH_GITHUB_ID as string,
      clientSecret: AUTH_GITHUB_SECRET as string,
    }),
    Resend({
      from: EMAIL_FROM,
    }),
  ],
  pages: {
    signIn: '/login',
  },
  secret: NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    jwt: async ({ token }) => {
      const user = await db.user.findUnique({
        where: { email: token?.email as string },
      });

      if (user) {
        token.id = user.id;
      }

      return token;
    },
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.id as string;
      }

      return session;
    },
  },
  debug: ENVIRONMENT === 'development',
});

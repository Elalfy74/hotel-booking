import { PrismaAdapter } from '@auth/prisma-adapter';
import { Prisma, Role } from '@prisma/client';
import { DefaultSession, NextAuthOptions } from 'next-auth';
import credentialsProvider from 'next-auth/providers/credentials';
import githubProvider, { GithubProfile } from 'next-auth/providers/github';

import { loginUser } from '@/actions/auth-actions';
import prisma from '@/lib/prisma';

declare module 'next-auth' {
  interface User extends Prisma.UserCreateInput {}

  interface Session {
    user: DefaultSession['user'] & {
      role: Role;
    };
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    githubProvider({
      profile(profile: GithubProfile) {
        return {
          id: profile.id.toString(),
          firstName: profile.name ?? profile.login,
          email: profile.email,
          image: profile.avatar_url,
        };
      },
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    credentialsProvider({
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const { data, error } = await loginUser(credentials);

        if (error || !data) {
          throw new Error(error);
        }

        return {
          id: data.id,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          image: data.image,
          role: data.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;

        if (user.firstName) {
          if (user.lastName) {
            token.name = user.firstName + ' ' + user.lastName;
          }
          token.name = user.firstName;
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (token.role) session.user.role = token.role as Role;

      return session;
    },
  },

  pages: {
    signIn: '/login',
    signOut: '/',
  },

  session: {
    strategy: 'jwt',
  },
};

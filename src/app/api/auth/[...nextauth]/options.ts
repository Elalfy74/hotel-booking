import { PrismaAdapter } from '@auth/prisma-adapter';
import { Prisma, Role } from '@prisma/client';
import { DefaultSession, NextAuthOptions } from 'next-auth';
import credentialsProvider from 'next-auth/providers/credentials';
import githubProvider, { GithubProfile } from 'next-auth/providers/github';

import { loginSchema } from '@/components/auth/login/login-schema';
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
          firstName: profile.login,
          email: profile.email,
          image: profile.avatar_url,
        };
      },
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    credentialsProvider({
      credentials: {
        email: {
          label: 'Email',
          placeholder: 'Email',
          type: 'email',
        },
        password: {
          label: 'Password',
          placeholder: 'Password',
          type: 'password',
        },
      },

      async authorize(credentials) {
        const isValid = loginSchema.safeParse(credentials);

        if (!credentials?.email || !credentials.password) {
          return null;
        }

        if (!isValid.success) {
          throw new Error(isValid.error.message);
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user.password) {
          throw new Error('Invalid email or password');
        }

        if (credentials.password !== user.password) {
          throw new Error('Invalid email or password');
        }

        return {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          image: user.image,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }

      return token;
    },

    async session({ session, token }) {
      if (token.role) session.user.role = token.role as Role;

      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
};

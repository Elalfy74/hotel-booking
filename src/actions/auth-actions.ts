'use server';

import { type User } from '@prisma/client';

import { loginSchema, type LoginSchemaType } from '@/components/auth/login/login-schema';
import { signUpSchema, type SignUpSchemaType } from '@/components/auth/sign-up/sign-up-schema';
import { getAppSession } from '@/lib/get-app-session';
import prisma from '@/lib/prisma';

import { asyncHandler, comparePassword, hashPassword } from './utils';

export const loginUser = asyncHandler(async (data: LoginSchemaType): Promise<User> => {
  // Validate data
  const isValid = loginSchema.safeParse(data);
  if (!isValid.success) {
    throw new Error(isValid.error.message);
  }

  // Check if user exists or password is set (credentials provider)
  const user = await prisma.user.findUnique({
    where: { email: data.email },
  });
  if (!user || !user.password) throw new Error('Invalid email or password');

  // Check password
  const isPasswordValid = comparePassword(data.password, user.password);
  if (!isPasswordValid) throw new Error('Invalid email or password');

  return user;
});

export const signUpUser = asyncHandler(async (data: SignUpSchemaType): Promise<void> => {
  // Validate data
  const isValid = signUpSchema.safeParse(data);
  if (!isValid.success) {
    throw new Error(isValid.error.message);
  }

  // Check if user exists
  const isUserExists = await prisma.user.findUnique({
    where: { email: data.email },
  });
  if (isUserExists) throw new Error('Email already exists');

  // Hash password
  const hashed = hashPassword(data.password);

  // Create user
  await prisma.user.create({
    data: {
      ...data,
      password: hashed,
    },
  });
});

export async function checkAuth() {
  const session = await getAppSession();

  if (!session) {
    throw new Error('Unauthorized');
  }

  return session;
}

export async function checkAdmin() {
  const session = await checkAuth();

  if (session.user.role !== 'ADMIN') {
    throw new Error('Access denied');
  }
}

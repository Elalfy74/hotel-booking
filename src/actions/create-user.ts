'use server';

import { Prisma } from '@prisma/client';

import { signUpSchema, SignUpSchemaType } from '@/components/auth/sign-up/sign-up-schema';
import prisma from '@/lib/prisma';

interface Response<T> {
  data: null | T;
  error: null | string;
}

export const createUser = async (data: SignUpSchemaType) => {
  const response: Response<null> = {
    data: null,
    error: null,
  };

  try {
    const isValid = signUpSchema.safeParse(data);

    if (!isValid.success) {
      response.error = isValid.error.message;
      return response;
    }

    await prisma.user.create({ data });

    return response;
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
      response.error = 'Email already exists';
    } else if (err instanceof Error) {
      response.error = err.message;
    } else {
      response.error = 'Something went wrong';
    }

    return response;
  }
};

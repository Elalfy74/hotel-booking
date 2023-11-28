'use server';

import { Prisma } from '@prisma/client';

import { signUpSchema, SignUpSchemaType } from '@/components/auth/sign-up/sign-up-schema';
import prisma from '@/lib/prisma';

import { ActionRes, asyncAdminHandler } from './utils';

export const createUser = async (data: SignUpSchemaType): Promise<ActionRes<null>> => {
  try {
    const isValid = signUpSchema.safeParse(data);

    if (!isValid.success) {
      return { error: isValid.error.message };
    }

    await prisma.user.create({ data });

    return { data: null };
  } catch (err) {
    let error;

    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
      error = 'Email already exists';
    } else if (err instanceof Error) {
      error = err.message;
    } else {
      error = 'Something went wrong';
    }

    return { error };
  }
};

export const getUsers = asyncAdminHandler(async (args: Prisma.UserFindManyArgs) => {
  return prisma.user.findMany({
    skip: args.skip || 0,
    take: args.take || 10,
    where: args.where,
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      image: true,
      role: true,
      accounts: {
        select: {
          provider: true,
        },
      },
    },
  });
});

export const getUsersCount = asyncAdminHandler(async (args: Prisma.UserFindManyArgs) => {
  return prisma.user.count({
    where: args.where,
  });
});

export const getUserById = asyncAdminHandler(async (id: string) => {
  return prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      image: true,
      role: true,
      accounts: {
        select: {
          provider: true,
        },
      },
    },
  });
});

export const updateUserById = asyncAdminHandler(
  async ({ id, data }: { id: string; data: Prisma.UserUpdateInput }) => {
    return prisma.user.update({
      where: {
        id,
      },
      data,
    });
  },
);

export const deleteUserById = asyncAdminHandler(async (id: string) => {
  return prisma.user.delete({
    where: {
      id,
    },
  });
});

export const deleteManyUsers = asyncAdminHandler(async (ids: string[]) => {
  await prisma.user.deleteMany({
    where: {
      id: {
        in: ids,
      },
    },
  });
});

export type IUser = NonNullable<Awaited<ReturnType<typeof getUsers>>['data']>[number];

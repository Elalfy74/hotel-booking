'use server';

import { type Prisma } from '@prisma/client';

import { asyncAdminHandler } from '@/actions/utils';
import prisma from '@/lib/prisma';

import { type IUser } from './user.type';

export const getUsers = asyncAdminHandler(
  async (args: Prisma.UserFindManyArgs): Promise<IUser[]> => {
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
      orderBy: {
        createdAt: 'desc',
      },
    });
  },
);
export type GetUsersReturnType = AwaitedReturn<typeof getUsers>;

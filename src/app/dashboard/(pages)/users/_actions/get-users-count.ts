'use server';

import { type Prisma } from '@prisma/client';

import { asyncAdminHandler } from '@/actions/utils';
import prisma from '@/lib/prisma';

export const getUsersCount = asyncAdminHandler(
  async (args: Prisma.UserFindManyArgs): Promise<number> => {
    return prisma.user.count({
      where: args.where,
    });
  },
);
export type GetUsersCountReturnType = AwaitedReturn<typeof getUsersCount>;

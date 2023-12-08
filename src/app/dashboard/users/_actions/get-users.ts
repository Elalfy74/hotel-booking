'use server';

import { type Prisma } from '@prisma/client';

import { asyncAdminHandler } from '@/actions/utils';
import prisma from '@/lib/prisma';
import { serialize } from '@/lib/utils';

import { UserDto } from './user.dto';

export const getUsers = asyncAdminHandler(
  async (args: Prisma.UserFindManyArgs): Promise<UserDto[]> => {
    const users = await prisma.user.findMany({
      skip: args.skip || 0,
      take: args.take || 10,
      where: args.where,
      include: {
        accounts: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return serialize(UserDto, users);
  },
);
export type GetUsersReturnType = AwaitedReturn<typeof getUsers>;

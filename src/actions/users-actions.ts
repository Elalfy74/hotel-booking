'use server';

import { type Prisma, type Role } from '@prisma/client';

import { loginSchema, type LoginSchemaType } from '@/components/auth/login/login-schema';
import { signUpSchema, type SignUpSchemaType } from '@/components/auth/sign-up/sign-up-schema';
import prisma from '@/lib/prisma';
import { utapi } from '@/lib/uploadthing';

import { asyncAdminHandler, asyncHandler, comparePassword, hashPassword } from './utils';

export interface IUser {
  id: string;
  firstName: string | null;
  lastName: string | null;
  role: Role;
  email: string;
  image: string | null;
  accounts: {
    provider: string;
  }[];
}

export const loginUser = asyncHandler(async (data: LoginSchemaType) => {
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

export const signUpUser = asyncHandler(async (data: SignUpSchemaType) => {
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

export const createUser = asyncAdminHandler(async (data: FormData): Promise<IUser> => {
  // Check if user exists
  const isUserExists = await prisma.user.findUnique({
    where: {
      email: data.get('email') as string,
    },
  });
  if (isUserExists) throw new Error('Email already exists');

  // Hash password
  const hashed = hashPassword(data.get('password') as string);

  // Upload image
  const imageFile = data.get('image') as File;
  const uploadedImage = await utapi.uploadFiles(imageFile);
  if (!uploadedImage.data) throw new Error('Image upload failed');

  // Create user
  const savedUser = await prisma.user.create({
    data: {
      firstName: data.get('firstName') as string,
      lastName: data.get('lastName') as string,
      email: data.get('email') as string,
      role: data.get('role') as Role,
      password: hashed,
      image: uploadedImage.data.url,
    },
  });

  const res: IUser = {
    id: savedUser.id,
    firstName: savedUser.firstName,
    lastName: savedUser.lastName,
    email: savedUser.email,
    role: savedUser.role,
    image: savedUser.image,
    accounts: [],
  };

  return res;
});

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

export const getUsersCount = asyncAdminHandler(async (args: Prisma.UserFindManyArgs) => {
  return prisma.user.count({
    where: args.where,
  });
});

export const getUserById = asyncAdminHandler(async (id: string): Promise<IUser | null> => {
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
  async ({ id, data }: { id: string; data: FormData }): Promise<IUser> => {
    // Check if user exists
    const isUserExists = await prisma.user.findUnique({ where: { id } });
    if (!isUserExists) throw new Error('User does not exist');

    // Upload image
    let uploadedImage;
    const imageFile = data.get('image') as File;

    if (imageFile) {
      uploadedImage = await utapi.uploadFiles(imageFile);
      if (!uploadedImage.data) throw new Error('Image upload failed');
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        firstName: data.get('firstName') as string | undefined,
        lastName: data.get('lastName') as string | undefined,
        email: data.get('email') as string | undefined,
        role: data.get('role') as Role | undefined,
        image: uploadedImage?.data.url || undefined,
      },
    });

    return {
      id: updatedUser.id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      role: updatedUser.role,
      image: updatedUser.image,
      accounts: [],
    };
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

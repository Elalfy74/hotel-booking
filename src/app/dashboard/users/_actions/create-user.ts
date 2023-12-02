'use server';

import { type Role } from '@prisma/client';

import { asyncAdminHandler, hashPassword } from '@/actions/utils';
import prisma from '@/lib/prisma';
import { utapi } from '@/lib/uploadthing';

import { type IUser } from './user.type';

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

  return {
    id: savedUser.id,
    firstName: savedUser.firstName,
    lastName: savedUser.lastName,
    email: savedUser.email,
    role: savedUser.role,
    image: savedUser.image,
    accounts: [],
  };
});

'use server';

import { asyncAdminHandler, hashPassword } from '@/actions/utils';
import prisma from '@/lib/prisma';
import { utapi } from '@/lib/uploadthing';
import { serialize } from '@/lib/utils';

import { createUserSchema } from '../_schemas';
import { UserDto } from './user.dto';

export const createUser = asyncAdminHandler(async (formData: FormData): Promise<UserDto> => {
  // Convert FormData to object
  const actionData = Object.fromEntries(formData);

  // Validate data
  const validation = createUserSchema.safeParse(actionData);
  if (!validation.success) {
    throw new Error(validation.error.message);
  }

  const data = validation.data;

  // Check if user exists
  const isUserExists = await prisma.user.findUnique({
    where: { email: data.email },
  });
  if (isUserExists) throw new Error('Email already exists');

  // Hash password
  const hashed = hashPassword(data.password);

  // Upload image
  const imageFile = data.image as File;
  const uploadedImage = await utapi.uploadFiles(imageFile);
  if (!uploadedImage.data) throw new Error('Image upload failed');

  // Create user
  const savedUser = await prisma.user.create({
    data: {
      ...data,
      password: hashed,
      image: uploadedImage.data.url,
    },
  });

  return serialize(UserDto, {
    ...savedUser,
    accounts: [],
  });
});

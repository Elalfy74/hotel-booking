'use server';

import { type Role } from '@prisma/client';

import { asyncAdminHandler } from '@/actions/utils';
import prisma from '@/lib/prisma';
import { utapi } from '@/lib/uploadthing';

import { type IUser } from './user.type';

export const updateUser = asyncAdminHandler(
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

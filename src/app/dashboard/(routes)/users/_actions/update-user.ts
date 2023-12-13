'use server';

import { asyncAdminHandler } from '@/actions/utils';
import prisma from '@/lib/prisma';
import { utapi } from '@/lib/uploadthing';
import { serialize } from '@/lib/utils';

import { updateUserSchema } from '../_schemas';
import { UserDto } from './user.dto';

export const updateUser = asyncAdminHandler(
  async ({ id, formData }: { id: string; formData: FormData }): Promise<UserDto> => {
    // Convert FormData to object
    const actionData = Object.fromEntries(formData);

    // Validate Data
    const validation = updateUserSchema.safeParse(actionData);
    if (!validation.success) {
      throw new Error(validation.error.message);
    }

    const data = validation.data;

    // Check if user exists
    const isUserExists = await prisma.user.findUnique({ where: { id } });
    if (!isUserExists) throw new Error('User does not exist');

    // Upload image
    let uploadedImage;
    const imageFile = data.image as File;

    if (imageFile) {
      uploadedImage = await utapi.uploadFiles(imageFile);
      if (!uploadedImage.data) throw new Error('Image upload failed');
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        ...data,
        image: uploadedImage?.data.url,
      },
      include: { accounts: true },
    });

    return serialize(UserDto, updatedUser);
  },
);

// 'use server';

// import { Prisma } from '@prisma/client';

// import { signUpSchema, SignUpSchemaType } from '@/components/auth/sign-up/sign-up-schema';
// import prisma from '@/lib/prisma';

// import { ActionRes } from './utils';

// // export const createUser = async (data: SignUpSchemaType): Promise<ActionRes<null>> => {
// //   try {
// //     const isValid = signUpSchema.safeParse(data);

// //     if (!isValid.success) {
// //       return { error: isValid.error.message };
// //     }

// //     await prisma.user.create({ data });

// //     return { data: null };
// //   } catch (err) {
// //     let error;

// //     if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
// //       error = 'Email already exists';
// //     } else if (err instanceof Error) {
// //       error = err.message;
// //     } else {
// //       error = 'Something went wrong';
// //     }

// //     return { error };
// //   }
// // };

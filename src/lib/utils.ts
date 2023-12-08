import { ClassConstructor, plainToInstance } from 'class-transformer';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function serialize<T, V>(cls: ClassConstructor<T>, plain: V[]): T[];
export function serialize<T, V>(cls: ClassConstructor<T>, plain: V): T;

export function serialize<T, V>(cls: ClassConstructor<T>, plain: V | V[]): T | T[] {
  const results = plainToInstance(cls, plain, {
    excludeExtraneousValues: true,
  });

  if (Array.isArray(results)) {
    return results.map((result) => Object.assign({}, result));
  }

  return Object.assign({}, results);
}

const MAX_FILE_SIZE = 3000000; // 3MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export const fileSchema = z
  .any()
  .refine((file) => file !== undefined, 'Image is required.')
  .refine((file) => file.size <= MAX_FILE_SIZE, `Max file size is 3MB.`)
  .refine(
    (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
    '.jpg, .jpeg, .png and .webp files are accepted.',
  );

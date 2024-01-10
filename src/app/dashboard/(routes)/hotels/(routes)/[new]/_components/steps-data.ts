import { Prisma } from '@prisma/client';

type Step = {
  id: number;
  title: string;
  name: string;
  fields?: (keyof Prisma.HotelCreateArgs['data'])[];
};

export const stepsData: Step[] = [
  {
    id: 0,
    title: 'Step 1',
    name: 'Basics Information',
    fields: ['name', 'description', 'categoryId', 'stars', 'isFeatured'],
  },
  {
    id: 1,
    title: 'Step 2',
    name: 'Address',
    fields: ['cityId', 'address', 'distanceToDTInKm'],
  },
  {
    id: 2,
    title: 'Step 3',
    name: 'Images and Features',
    fields: ['images', 'features'],
  },
  {
    id: 3,
    title: 'Step 4',
    name: 'Rooms',
    fields: ['rooms'],
  },
  {
    id: 4,
    title: 'Step 5',
    name: 'Complete',
  },
];

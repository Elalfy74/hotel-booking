import { Prisma } from '@prisma/client';

export type HotelRoomsFilter = {
  query: string;
  hotelId?: string;
};

export function getHotelRoomsWhereFilter(filter: HotelRoomsFilter) {
  const where: Prisma.HotelRoomFindManyArgs['where'] = {};

  if (filter.query.trim()) {
    where.name = {
      contains: filter.query,
      mode: 'insensitive',
    };
  }

  if (filter?.hotelId) {
    where.hotelId = {
      equals: filter.hotelId,
    };
  }

  return where;
}

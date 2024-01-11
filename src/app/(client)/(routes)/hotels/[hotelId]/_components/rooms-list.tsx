import { type HotelRoom } from '@prisma/client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

import { PricePerNight } from './price-per-night';

export const RoomsList = ({ rooms }: { rooms: HotelRoom[] }) => {
  return (
    <>
      <h1 className="mb-6 text-4xl font-semibold">Select Room</h1>
      <ul>
        {rooms.map((room) => (
          <li key={room.id} className="mb-10">
            <RoomItem room={room} />
          </li>
        ))}
      </ul>
    </>
  );
};

const RoomItem = ({ room }: { room: HotelRoom }) => {
  const { maxAdults, maxChildren, price, beds } = room;

  return (
    <Card className="flex flex-col justify-between px-5 py-6 sm:flex-row">
      <div>
        <h3 className="mb-4 mt-0 text-xl font-medium sm:text-2xl md:text-2xl">{room.name}</h3>
        <p className="capitalize">
          {!!maxAdults && <span>{maxAdults} adults</span>}
          {!!maxChildren && <span> {maxChildren} children</span>}
        </p>
        <p className="capitalize">{beds}</p>
      </div>
      <div className="mt-5 flex items-end justify-between sm:mt-0 sm:flex-col ">
        <div className="order-2 flex flex-col sm:order-1 sm:items-end">
          <PricePerNight price={price} />
          <span className="text-lg text-orange-400">Save $4</span>
        </div>
        <Button className="h-fit sm:order-2">Select</Button>
      </div>
    </Card>
  );
};

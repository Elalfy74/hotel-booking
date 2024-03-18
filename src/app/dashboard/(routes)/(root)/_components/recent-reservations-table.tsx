'use client';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import { useState } from 'react';

import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export const RecentReservationsTable = () => {
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <div className='relative overflow-hidden rounded-md border'>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className='py-4'>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className='h-24 text-center'>
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

interface ReservationDto {
  id: string;
  username: string;
  hotelName: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  totalPayment: number;
}

const columns: ColumnDef<ReservationDto>[] = [
  {
    id: 'selection',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllRowsSelected()}
        onCheckedChange={table.getToggleAllRowsSelectedHandler()}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={row.getToggleSelectedHandler()}
        aria-label='Select row'
      />
    ),
  },
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'username',
    header: 'User',
    cell: (info) => (
      <a href='#' className='text-primary hover:underline'>
        {info.row.original.username}
      </a>
    ),
  },
  {
    accessorKey: 'hotelName',
    header: 'Hotel',
    cell: (info) => (
      <a href='#' className='text-primary hover:underline'>
        {info.row.original.hotelName}
      </a>
    ),
  },
  {
    accessorKey: 'roomName',
    header: 'Room',
  },
  {
    accessorKey: 'checkIn',
    header: 'Check In',
  },
  {
    accessorKey: 'checkOut',
    header: 'Check Out',
  },
  {
    accessorKey: 'totalPayment',
    header: 'Total Payment',
  },
];

const data: ReservationDto[] = [
  {
    id: '123456789',
    username: 'john_doe',
    hotelName: 'Grand Hotel',
    roomName: 'Suite',
    checkIn: '2024-04-01',
    checkOut: '2024-04-05',
    totalPayment: 1500,
  },
  {
    id: '987654321',
    username: 'jane_smith',
    hotelName: 'Luxury Resort',
    roomName: 'Ocean View',
    checkIn: '2024-05-10',
    checkOut: '2024-05-15',
    totalPayment: 2500,
  },
  {
    id: '456789123',
    username: 'sam_jones',
    hotelName: 'Mountain Lodge',
    roomName: 'Cabin',
    checkIn: '2024-06-20',
    checkOut: '2024-06-25',
    totalPayment: 1200,
  },
  {
    id: '654321987',
    username: 'emily_davis',
    hotelName: 'City Hotel',
    roomName: 'Standard',
    checkIn: '2024-07-15',
    checkOut: '2024-07-20',
    totalPayment: 800,
  },
  {
    id: '321654987',
    username: 'michael_brown',
    hotelName: 'Beach Resort',
    roomName: 'Beachfront Villa',
    checkIn: '2024-08-05',
    checkOut: '2024-08-10',
    totalPayment: 3500,
  },
  {
    id: '789123456',
    username: 'olivia_taylor',
    hotelName: 'Ski Chalet',
    roomName: 'Slope-side Suite',
    checkIn: '2024-09-18',
    checkOut: '2024-09-23',
    totalPayment: 1800,
  },
  {
    id: '741852963',
    username: 'daniel_wilson',
    hotelName: 'Riverside Inn',
    roomName: 'River View Room',
    checkIn: '2024-10-12',
    checkOut: '2024-10-17',
    totalPayment: 1000,
  },
  {
    id: '369258147',
    username: 'sophia_miller',
    hotelName: 'Resort & Spa',
    roomName: 'Luxury Suite',
    checkIn: '2024-11-25',
    checkOut: '2024-11-30',
    totalPayment: 2800,
  },
  {
    id: '852963741',
    username: 'william_johnson',
    hotelName: 'Historic Inn',
    roomName: 'Queen Room',
    checkIn: '2025-01-08',
    checkOut: '2025-01-13',
    totalPayment: 900,
  },
  {
    id: '258147369',
    username: 'oliver_martin',
    hotelName: 'Seaside Resort',
    roomName: 'Deluxe Ocean View',
    checkIn: '2025-02-20',
    checkOut: '2025-02-25',
    totalPayment: 3200,
  },
  {
    id: '147258369',
    username: 'emma_anderson',
    hotelName: 'Mountain Retreat',
    roomName: 'Cozy Cabin',
    checkIn: '2025-03-15',
    checkOut: '2025-03-20',
    totalPayment: 1100,
  },
  {
    id: '951753852',
    username: 'noah_martinez',
    hotelName: 'Urban Hotel',
    roomName: 'Executive Suite',
    checkIn: '2025-04-10',
    checkOut: '2025-04-15',
    totalPayment: 2000,
  },
  {
    id: '369147258',
    username: 'ava_taylor',
    hotelName: 'Lakefront Lodge',
    roomName: 'Lake View Room',
    checkIn: '2025-05-22',
    checkOut: '2025-05-27',
    totalPayment: 1500,
  },
  {
    id: '753951852',
    username: 'ethan_anderson',
    hotelName: 'Country Retreat',
    roomName: 'Farmhouse Suite',
    checkIn: '2025-06-17',
    checkOut: '2025-06-22',
    totalPayment: 1300,
  },
];

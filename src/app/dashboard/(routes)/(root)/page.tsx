import { type Metadata } from 'next';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { CalendarDateRangePicker } from './_components/date-range-pricker';
import { Overview } from './_components/overview';
import { RecentReservationsTable } from './_components/recent-reservations-table';
import { ReservationsChart } from './_components/reservations-chart';
import { UsersChart } from './_components/users-chart';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Hotel Booking Dashboard page',
};

const DashboardPage = () => {
  return (
    <>
      {/* Heading */}
      <div className='mb-10 flex items-center justify-between'>
        <h1 className='text-3xl font-semibold capitalize'>Dashboard</h1>
        <div className='flex items-center space-x-2'>
          <CalendarDateRangePicker />
          <Button variant='outline'>Download</Button>
        </div>
      </div>
      {/* Content */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-7'>
        <Card className='col-span-4 bg-transparent shadow-none'>
          <CardHeader>
            <CardTitle>Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <Overview />
          </CardContent>
        </Card>
        <div className='col-span-3'>
          <Card className='mb-4 h-[48%] bg-transparent shadow-none'>
            <CardHeader>
              <CardTitle>Total Reservations</CardTitle>
              <CardDescription>+39 from last month</CardDescription>
            </CardHeader>
            <CardContent>
              <ReservationsChart />
            </CardContent>
          </Card>

          <Card className='h-[48%] bg-transparent shadow-none'>
            <CardHeader>
              <CardTitle>Total Users</CardTitle>
              <CardDescription>+78% from last month</CardDescription>
            </CardHeader>
            <CardContent>
              <UsersChart />
            </CardContent>
          </Card>
        </div>
      </div>
      <div className='mt-8  space-y-3'>
        <h2 className='text-2 xl font-semibold capitalize'>Recent Reservations</h2>
        <RecentReservationsTable />
      </div>
    </>
  );
};

export default DashboardPage;

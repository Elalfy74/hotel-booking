import { Metadata } from 'next';

import { SideBar } from '@/components/layouts/sidebar';

export const metadata: Metadata = {
  title: 'Hotel Booking Dashboard',
  description: 'Hotel Booking Dashboard',
};

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex">
      <SideBar />
      <div className="flex flex-1 flex-col p-7">{children}</div>
    </main>
  );
};

export default DashboardLayout;

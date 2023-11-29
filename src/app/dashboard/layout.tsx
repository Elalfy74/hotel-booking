import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { SideBar } from '@/components/layouts/sidebar';
import { getAppSession } from '@/lib/get-app-session';

export const metadata: Metadata = {
  title: 'Hotel Booking Dashboard',
  description: 'Hotel Booking Dashboard',
};

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getAppSession();

  if (!session || session.user.role !== 'ADMIN') {
    redirect('/');
  }

  return (
    <main className="flex">
      <SideBar />
      <div className="flex flex-1 flex-col p-7">{children}</div>
    </main>
  );
};

export default DashboardLayout;

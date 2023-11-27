import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hotel Booking Dashboard',
  description: 'Hotel Booking Dashboard',
};

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return children;
};

export default DashboardLayout;

'use client';

import { Line, LineChart, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', revenue: 15000 },
  { name: 'Feb', revenue: 21000 },
  { name: 'Mar', revenue: 18000 },
  { name: 'Apr', revenue: 25000 },
  { name: 'May', revenue: 27000 },
];

export const ReservationsChart = () => (
  <ResponsiveContainer height={163}>
    <LineChart data={data}>
      <Line type='monotone' dataKey='revenue' className='fill-primary' strokeWidth={2} />
    </LineChart>
  </ResponsiveContainer>
);

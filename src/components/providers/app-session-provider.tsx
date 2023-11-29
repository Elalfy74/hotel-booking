import { SessionProvider } from 'next-auth/react';

import { getAppSession } from '@/lib/get-app-session';

export const AppSessionProvider = async ({ children }: { children: React.ReactNode }) => {
  const session = await getAppSession();

  return <SessionProvider session={session}>{children}</SessionProvider>;
};

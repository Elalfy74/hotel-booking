'use client';
import { Session } from 'next-auth';
import { useEffect } from 'react';

import { useClientSession } from '@/store/use-client-session';

export const AppSessionProvider = () => {
  const setSession = useClientSession((state) => state.setSession);

  useEffect(() => {
    const getSession = async () => {
      const session: Session | {} = await fetch('/api/auth/session').then((res) => res.json());
      const notEmptySession = 'user' in session;
      setSession(notEmptySession ? session : null);
    };

    getSession();
  }, [setSession]);

  return null;
};

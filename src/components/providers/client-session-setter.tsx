'use client';
import { useEffect } from 'react';

import { useClientSession } from '@/store/use-client-session';

export const ClientSessionSetter = () => {
  const setSession = useClientSession((state) => state.setSession);

  useEffect(() => {
    setSession();
  }, [setSession]);

  return null;
};

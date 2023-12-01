import { Session } from 'next-auth';
import { create } from 'zustand';

const getClientSession = async (): Promise<Session | {}> => {
  const res = await fetch('/api/auth/session');
  return res.json();
};

type ClientSession = { data: Session | null; isLoading: boolean };

interface ClientSessionState {
  session: ClientSession;
  setSession: () => Promise<void>;
}

export const useClientSession = create<ClientSessionState>((set) => ({
  session: { data: null, isLoading: true },

  setSession: async () => {
    set({ session: { data: null, isLoading: true } });

    const session: Session | {} = await getClientSession();

    const notEmptySession = 'user' in session;

    set({ session: { data: notEmptySession ? session : null, isLoading: false } });
  },
}));

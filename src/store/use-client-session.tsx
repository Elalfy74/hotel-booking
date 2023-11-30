import { Session } from 'next-auth';
import { create } from 'zustand';

type ClientSession = { data: Session | null; isLoading: boolean };

interface ClientSessionState {
  session: ClientSession;
  setSession: (session: Session | null) => void;
}

export const useClientSession = create<ClientSessionState>((set) => ({
  session: { data: null, isLoading: true },
  setSession: (session: Session | null) =>
    set({
      session: { data: session, isLoading: false },
    }),
}));

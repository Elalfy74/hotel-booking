import { create } from 'zustand';

interface UseSelectDestination {
  selectedDestination: string | null;
  setSelectedDestination: (destination: string | null) => void;
}
export const useSelectDestination = create<UseSelectDestination>((set) => ({
  selectedDestination: null,
  setSelectedDestination: (destination) => set({ selectedDestination: destination }),
}));

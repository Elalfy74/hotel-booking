import { create } from 'zustand';

type SelectCityState = {
  selectedCity: ICityWCountry | null;
  setCity: (city: ICityWCountry | null) => void;
};

export const useSelectCity = create<SelectCityState>((set) => ({
  selectedCity: null,
  setCity: (city: ICityWCountry | null) => set(() => ({ selectedCity: city })),
}));

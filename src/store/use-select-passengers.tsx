import { create } from 'zustand';

export type PassengersInputs = {
  Adults: number;
  Children: number;
  Infants: number;
};

type PassengersStateType = {
  passengers: PassengersInputs;
  handlePassenger: (key: keyof PassengersInputs, operator: 'plus' | 'minus') => void;
};

const passengerInitialState: PassengersInputs = {
  Adults: 1,
  Children: 0,
  Infants: 0,
};

export const usePassengers = create<PassengersStateType>((set, get) => ({
  passengers: passengerInitialState,
  handlePassenger: (key: keyof PassengersInputs, operator: 'plus' | 'minus') => {
    const passengerNumber = get().passengers[key];

    // If there is only one adult, don't allow to decrease the number of adults
    if (key === 'Adults' && passengerNumber === 1 && operator === 'minus') {
      return;
    }

    if (passengerNumber === 0 && operator === 'minus') return;
    if (passengerNumber === 8 && operator === 'plus') return;

    set((prevState) => ({
      passengers: {
        ...prevState.passengers,
        [key]: operator === 'minus' ? passengerNumber - 1 : passengerNumber + 1,
      },
    }));
  },
}));

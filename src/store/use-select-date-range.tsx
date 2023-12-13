import { DateRange } from 'react-day-picker';
import { create } from 'zustand';

type DateRangeState = {
  date: DateRange | undefined;
  handleSelectDate: (newDate: DateRange) => void;
};

export const useSelectDateRange = create<DateRangeState>((set) => ({
  date: undefined,
  handleSelectDate: (newDate: DateRange) => {
    return set(() => ({ date: newDate }));
  },
}));

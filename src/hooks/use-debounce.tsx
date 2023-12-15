import { useEffect, useState } from 'react';

interface UseDebounceProps {
  initialState?: string;
  delay?: number;
  onValueChange: (value: string) => void;
}

export const useDebounce = ({
  initialState = '',
  delay = 500,
  onValueChange,
}: UseDebounceProps) => {
  const [value, setValue] = useState(initialState);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onValueChange(value);
    }, delay);

    return () => clearTimeout(timeout);
  }, [value, onValueChange, delay]);

  return [value, setValue] as const;
};

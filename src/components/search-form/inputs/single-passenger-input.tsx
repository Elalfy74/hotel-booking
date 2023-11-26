import { MinusCircleIcon, PlusCircleIcon } from 'lucide-react';

type SinglePassengerInputProps = {
  passengerTitle: string;
  passengerDesc: string;
  passenger: number;
  // handlePassenger: (key: keyof PassengersState, operator: 'plus' | 'minus') => void;
};

const MIN_PASSENGERS = 0;
const MAX_PASSENGERS = 8;

export const SinglePassengerInput = (props: SinglePassengerInputProps) => {
  const { passengerTitle, passenger, passengerDesc } = props;

  return (
    <div className="flex items-center justify-between py-3">
      <div>
        <h4>{passengerTitle}</h4>
        <p className="text-sm text-muted-foreground">{passengerDesc}</p>
      </div>
      <div className="flex items-center">
        <button
          className="text-gray-400 disabled:text-gray-200 dark:disabled:text-muted"
          disabled={passenger === MIN_PASSENGERS}
          // onClick={() => handlePassenger(passengerTitle, 'minus')}
        >
          <MinusCircleIcon className="h-7 w-7" />
        </button>
        <span className="block w-6 text-center">{passenger}</span>
        <button
          className="text-gray-400 disabled:text-gray-200 dark:disabled:text-muted"
          disabled={passenger === MAX_PASSENGERS}
          // onClick={() => handlePassenger(passengerTitle, 'plus')}
        >
          <PlusCircleIcon className="h-7 w-7" />
        </button>
      </div>
    </div>
  );
};

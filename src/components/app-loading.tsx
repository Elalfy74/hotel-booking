import { Spinner } from './ui/spinner';

export const AppLoading = () => {
  return (
    <div className="flex flex-1 items-center justify-center">
      <Spinner size="lg" />
    </div>
  );
};

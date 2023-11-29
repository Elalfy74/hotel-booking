import { Spinner } from '@/components/ui/spinner';

const DashboardLoading = () => {
  return (
    <div className="flex h-full flex-1 items-center justify-center">
      <Spinner size="lg" />
    </div>
  );
};
export default DashboardLoading;

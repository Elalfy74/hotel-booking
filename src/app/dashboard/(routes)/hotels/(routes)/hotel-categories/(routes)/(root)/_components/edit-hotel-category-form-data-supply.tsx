import { notFound } from 'next/navigation';

import { Spinner } from '@/components/ui/spinner';

import { useHotelCategory } from '../_hooks/use-hotel-category';
import { EditHotelCategoryForm } from './edit-hotel-category-form';

interface EditHotelCategoryFormDataSupplyProps {
  id: string;
  onSubmit: (formData: FormData) => void;
  isPending: boolean;
}

export const EditHotelCategoryFormDataSupply = ({
  id,
  onSubmit,
  isPending,
}: EditHotelCategoryFormDataSupplyProps) => {
  const { data, isLoading } = useHotelCategory(id);

  if (isLoading || !data || data.data === undefined) {
    return (
      <div className="mx-auto my-5">
        <Spinner />
      </div>
    );
  }

  if (data.error) {
    throw data.error;
  }

  if (data.data === null) {
    return notFound();
  }

  return (
    <EditHotelCategoryForm onSubmit={onSubmit} isPending={isPending} initialValues={data.data} />
  );
};

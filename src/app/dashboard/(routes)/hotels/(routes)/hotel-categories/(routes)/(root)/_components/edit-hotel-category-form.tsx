import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';

import {
  updateHotelCategorySchema,
  type UpdateHotelCategoryType,
} from '../../../_schemas/update-hotel-category';

export const EditHotelCategoryForm = ({
  initialValues,
  onSubmit,
  isPending,
}: {
  onSubmit: (formData: FormData) => void;
  isPending: boolean;
  initialValues: UpdateHotelCategoryType;
}) => {
  const form = useForm<UpdateHotelCategoryType>({
    resolver: zodResolver(updateHotelCategorySchema),
    defaultValues: initialValues,
  });

  const handleSubmit = (values: UpdateHotelCategoryType) => {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, String(value));
    });

    onSubmit(formData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Hotel Category Name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="ml-auto block"
          disabled={isPending || !form.formState.isDirty}
        >
          {isPending ? <Spinner className="text-white" size="sm" /> : 'Edit'}
        </Button>
      </form>
    </Form>
  );
};

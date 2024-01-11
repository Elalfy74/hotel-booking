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
  createHotelCategorySchema,
  type CreateHotelCategoryType,
} from '../../../_schemas/create-hotel-category';

export const CreateHotelCategoryForm = ({
  onSubmit,
  isPending,
}: {
  onSubmit: (formData: FormData) => void;
  isPending: boolean;
}) => {
  const form = useForm<CreateHotelCategoryType>({
    resolver: zodResolver(createHotelCategorySchema),
  });

  const handleSubmit = (values: CreateHotelCategoryType) => {
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
        <Button type="submit" className="ml-auto block" disabled={isPending}>
          {isPending ? <Spinner className="text-white" /> : 'Create'}
        </Button>
      </form>
    </Form>
  );
};

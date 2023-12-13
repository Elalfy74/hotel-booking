import { zodResolver } from '@hookform/resolvers/zod';
import { type City } from '@prisma/client';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

import { Dropzone } from '@/components/dropzone';
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
import { Loader } from '@/components/ui/loader';
import { Switch } from '@/components/ui/switch';

import { updateCitySchema, UpdateCityType } from '../../../_schemas';
import { useUpdateCity } from '../_hooks/use-update-city';

interface EditCityFormProps {
  city: City;
}

export const EditCityForm = ({ city }: EditCityFormProps) => {
  const { mutateAsync } = useUpdateCity();

  const form = useForm<UpdateCityType>({
    resolver: zodResolver(updateCitySchema),
    defaultValues: {
      name: city.name,
      isFeatured: city.isFeatured,
      images: undefined,
    },
  });

  const onSubmit = async ({ images, ...values }: UpdateCityType) => {
    // const formData = new FormData();
    // if (image) {
    //   formData.append('image', image);
    // }
    // Object.entries(values).forEach(([key, value]) => {
    //   formData.append(key, String(value));
    // });
    // await mutateAsync({
    //   id: country.id,
    //   formData,
    // });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 max-w-4xl space-y-6">
        {/* <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Dropzone onChange={field.onChange} defaultPreview={country.image} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isFeatured"
          render={({ field }) => (
            <FormItem className="flex items-center gap-4">
              <FormLabel>isFeatured</FormLabel>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} className="!mt-0" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-4">
          <Button variant="secondary" asChild>
            <Link href="/dashboard/cities">Discard</Link>
          </Button>
          <Button type="submit" disabled={form.formState.isSubmitting || !form.formState.isDirty}>
            {form.formState.isSubmitting ? <Loader className="h-2 w-2 bg-white" /> : 'Save Changes'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

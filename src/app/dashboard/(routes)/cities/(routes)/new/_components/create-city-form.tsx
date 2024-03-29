'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

import { ImagesDropzone } from '@/components/images-dropzone';
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

import { CountryInput } from '../../../_components/country-input';
import { createCitySchema, type CreateCityType } from '../../../_schemas';
import { useCreateCity } from '../_hooks/use-create-city';

export const CreateCityForm = () => {
  const { mutateAsync } = useCreateCity();

  const form = useForm<CreateCityType>({
    resolver: zodResolver(createCitySchema),
    defaultValues: {
      isFeatured: false,
    },
  });

  const onSubmit = async ({ images, ...values }: CreateCityType) => {
    const formData = new FormData();

    images.forEach((image) => {
      formData.append('images', image);
    });

    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, String(value));
    });
    await mutateAsync(formData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 max-w-4xl space-y-6">
        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Images</FormLabel>
              <FormControl>
                <ImagesDropzone onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
          name="countryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block">Country</FormLabel>
              <FormControl>
                <CountryInput onSelect={field.onChange} />
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
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? <Loader className="h-2 w-2 bg-white" /> : 'Save'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

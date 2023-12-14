import { zodResolver } from '@hookform/resolvers/zod';
import { type City, CityImage } from '@prisma/client';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

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

import { CityDto } from '../../../_actions/city.dto';
import { updateCitySchema, UpdateCityType } from '../../../_schemas';
import { useUpdateCity } from '../_hooks/use-update-city';
import { ImagesInput } from './images-input';

interface EditCityFormProps {
  city: CityDto;
}

export const EditCityForm = ({ city }: EditCityFormProps) => {
  const { mutateAsync } = useUpdateCity();

  const form = useForm<UpdateCityType>({
    resolver: zodResolver(updateCitySchema),
    defaultValues: {
      name: city.name,
      isFeatured: city.isFeatured,
      images: undefined,
      removeImages: [],
    },
  });

  const onAddImageToRemove = (image: CityImage) => {
    const oldRemoveImagesArray = form.getValues().removeImages || [];
    form.setValue('removeImages', [...oldRemoveImagesArray, image], {
      shouldDirty: true,
    });
  };

  const onSubmit = async ({ images, removeImages, ...values }: UpdateCityType) => {
    if (removeImages?.length === city.images.length) {
      if (!images || images.length === 0) {
        return toast.error('City must have at least one image');
      }
    }

    const formData = new FormData();

    if (images && images.length > 0) {
      images.forEach((image) => formData.append('images', image));
    }

    if (removeImages && removeImages.length > 0) {
      removeImages.forEach((image) => formData.append('removeImages', JSON.stringify(image)));
    }

    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, String(value));
    });

    await mutateAsync({
      id: city.id,
      formData,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 max-w-4xl space-y-6">
        <FormField
          control={form.control}
          name="images"
          render={({ field, formState }) => (
            <FormItem>
              <FormLabel>Images</FormLabel>
              <FormControl>
                <ImagesInput
                  onChange={field.onChange}
                  defaultPreview={city.images}
                  onAddImageToRemove={onAddImageToRemove}
                />
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

        {/* //TODO ADD COUNTRY Input */}
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

'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { m } from 'framer-motion';
import { MinusIcon, PlusIcon, XIcon } from 'lucide-react';
import { Fragment, useState } from 'react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { Rating } from 'react-simple-star-rating';
import { toast } from 'sonner';

import { ImagesDropzone } from '@/components/images-dropzone';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
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
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';

import { createHotelSchema, CreateHotelType } from '../../../_schemas';
import { CityInput } from './city-input';
import { HotelCategoryInput } from './hotel-category-input';
import { HotelFeaturesInput } from './hotel-features-input';
import { Navigation } from './navigation';
import { Steps } from './steps';
import { stepsData } from './steps-data';

export const CreateHotelForm = () => {
  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const delta = currentStep - previousStep;

  const form = useForm<CreateHotelType>({
    resolver: zodResolver(createHotelSchema),
    mode: 'onChange',
    defaultValues: {
      isFeatured: false,
      rooms: [
        {
          name: '',
          price: 0,
          maxAdults: 0,
          maxChildren: 0,
          beds: 0,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'rooms',
  });

  const processForm: SubmitHandler<CreateHotelType> = (data) => {
    console.log(data);
    form.reset();
  };

  type FieldName = keyof CreateHotelType;

  const next = async () => {
    const fields = stepsData[currentStep].fields;
    const output = await form.trigger(fields as FieldName[], { shouldFocus: true });

    if (!output) return;

    if (currentStep < stepsData.length - 1) {
      if (currentStep === stepsData.length - 2) {
        await form.handleSubmit(processForm)();
      }
      setPreviousStep(currentStep);
      setCurrentStep((step) => step + 1);
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step - 1);
    }
  };

  return (
    <section className="mt-8">
      <Steps currentStep={currentStep} />
      <Separator className="my-8" />
      <Form {...form}>
        <form className="max-w-4xl">
          {currentStep === 0 && (
            <m.div
              className="relative space-y-6"
              initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 1 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <h2 className="text-xl font-semibold">Hotel Information</h2>
              <p className="!my-2 text-sm text-gray-600 dark:text-gray-300">
                Provide hotel personal details.
              </p>

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Description" {...field} className="resize-none" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block">Category</FormLabel>
                    <FormControl>
                      <HotelCategoryInput onSelect={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="stars"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block">Rating</FormLabel>
                    <FormControl>
                      <Rating onClick={field.onChange} size={30} />
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
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="!mt-0"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </m.div>
          )}

          {currentStep === 1 && (
            <m.div
              className="space-y-6"
              initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <h2 className="text-xl font-semibold">Location</h2>
              <p className="!my-2 text-sm text-gray-600 dark:text-gray-300">
                Provide hotel location details.
              </p>

              <FormField
                control={form.control}
                name="cityId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block">City</FormLabel>
                    <FormControl>
                      <CityInput onSelect={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="distanceToDTInKm"
                render={({ field: { onChange, ...rest } }) => (
                  <FormItem>
                    <FormLabel>Distance to DownTown in KM</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="10"
                        type="number"
                        onChange={(e) => onChange(Number(e.target.value))}
                        {...rest}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </m.div>
          )}

          {currentStep === 2 && (
            <m.div
              className="space-y-6"
              initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <h2 className="text-xl font-semibold">Images</h2>
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

              <Separator className="!mt-10" />

              <h2 className="text-xl font-semibold">Features</h2>
              <FormField
                control={form.control}
                name="features"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block">Features</FormLabel>
                    <FormControl>
                      <HotelFeaturesInput setSelectedFeaturesIds={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </m.div>
          )}

          {currentStep === 3 && (
            <m.div
              className="space-y-6"
              initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <h2 className="text-xl font-semibold">Rooms</h2>
              <p className="!my-2 text-sm text-gray-600 dark:text-gray-300">
                Provide hotel rooms details.
              </p>

              <Accordion
                type="multiple"
                className="w-full"
                defaultValue={fields.map((item) => item.id)}
              >
                {fields.map((item, index) => (
                  <AccordionItem value={item.id} key={item.id}>
                    <AccordionTrigger className="text-lg">Room {index + 1}</AccordionTrigger>
                    <AccordionContent className="flex items-center gap-20 px-1">
                      <div className="flex-1 space-y-2">
                        <FormField
                          name={`rooms.${index}.name`}
                          control={form.control}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="grid grid-cols-2 gap-20">
                          <FormField
                            name={`rooms.${index}.price`}
                            control={form.control}
                            render={({ field: { onChange, ...field } }) => (
                              <FormItem>
                                <FormLabel>Price</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="10"
                                    type="number"
                                    onChange={(e) => onChange(Number(e.target.value))}
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            name={`rooms.${index}.beds`}
                            control={form.control}
                            render={({ field: { onChange, ...field } }) => (
                              <FormItem>
                                <FormLabel>No of Beds</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="2"
                                    type="number"
                                    onChange={(e) => onChange(Number(e.target.value))}
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-20">
                          <FormField
                            name={`rooms.${index}.maxAdults`}
                            control={form.control}
                            render={({ field: { onChange, ...field } }) => (
                              <FormItem>
                                <FormLabel>Max Adults Number</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="2"
                                    type="number"
                                    onChange={(e) => onChange(Number(e.target.value))}
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            name={`rooms.${index}.maxChildren`}
                            control={form.control}
                            render={({ field: { onChange, ...field } }) => (
                              <FormItem>
                                <FormLabel>Max Children Number</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="2"
                                    type="number"
                                    onChange={(e) => onChange(Number(e.target.value))}
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="destructive"
                        className="rounded-full"
                        size="icon"
                        onClick={() => remove(index)}
                      >
                        <MinusIcon />
                      </Button>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              <Button
                type="button"
                variant="secondary"
                className="rounded-full"
                size="icon"
                onClick={async () => {
                  if (fields.length >= 5) {
                    return toast.error('You can only add up to 5 rooms at a time', {
                      position: 'top-center',
                    });
                  }
                  const output = await form.trigger('rooms', {
                    shouldFocus: true,
                  });

                  if (!output) {
                    return toast.error(
                      'Please fill previous rooms details before adding new ones',
                      {
                        position: 'top-center',
                      },
                    );
                  }

                  append({
                    name: '',
                    beds: 0,
                    maxAdults: 0,
                    maxChildren: 0,
                    price: 0,
                  });
                }}
              >
                <PlusIcon />
              </Button>
            </m.div>
          )}
        </form>
      </Form>
      <Navigation currentStep={currentStep} next={next} prev={prev} />
    </section>
  );
};

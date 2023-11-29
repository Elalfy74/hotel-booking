'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { createUser, IUser } from '@/actions/users-actions';
import { AvatarInput } from '@/components/avatar-input.client';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { usersQueryKey } from '../../(root)/_hooks/use-users';
import { createUserSchema, CreateUserSchemaType } from './create-user-schema';

export const CreateUserForm = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const form = useForm<CreateUserSchemaType>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      role: 'USER',
    },
  });

  const onSubmit = async ({ image, ...values }: CreateUserSchemaType) => {
    if (!(image instanceof File)) return;

    const formData = new FormData();

    formData.append('image', image);
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const { error, data } = await createUser(formData);
    if (error || !data) return toast.error(error);

    toast.success('User created successfully');
    // queryClient.invalidateQueries({
    //   predicate: (query) => {
    //     if (query.queryKey[0] === 'users') return true;
    //     if (query.queryKey[0] === 'users count') return true;
    //     return false;
    //   },
    // });
    queryClient.setQueryData<IUser[]>(usersQueryKey, (oldData) => {
      if (!oldData) return undefined;
      return [data, ...oldData];
    });

    setTimeout(() => {
      router.push('/dashboard/users');
    }, 1000);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 max-w-4xl space-y-6">
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <AvatarInput onChange={field.onChange} priority />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-x-6">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>first name</FormLabel>
                <FormControl>
                  <Input placeholder="first name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>last name</FormLabel>
                <FormControl>
                  <Input placeholder="last name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>email address</FormLabel>
              <FormControl>
                <Input
                  placeholder="email@example.com"
                  type="email"
                  autoComplete="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>password</FormLabel>
              <FormControl>
                <Input
                  placeholder="*******"
                  type="password"
                  autoComplete="current-password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-60">
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="USER">USER</SelectItem>
                  <SelectItem value="ADMIN">ADMIN</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-4">
          <Button variant="secondary" asChild>
            <Link href="/dashboard/users">Discard</Link>
          </Button>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? <Loader className="h-2 w-2 bg-white" /> : 'Save Changes'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { IUser, updateUserById } from '@/actions/users-actions';
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

import { EditUserSchema, editUserSchema } from './edit-user-schema';

interface EditUserFormProps {
  user: IUser;
}

export const EditUserForm = ({ user }: EditUserFormProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const form = useForm<EditUserSchema>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      email: user.email,
      role: user.role,
      image: undefined,
    },
  });

  const onSubmit = async ({ image, ...values }: EditUserSchema) => {
    const formData = new FormData();

    if (image && image instanceof File) {
      formData.append('image', image);
    }

    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const { error } = await updateUserById({
      id: user.id,
      data: formData,
    });

    if (error) return toast.error(error);

    toast.success('User updated successfully');
    queryClient.invalidateQueries({
      predicate: ({ queryKey }) => {
        if (queryKey[0] === 'users') return true;
        if (queryKey[0] === 'user' && queryKey[1] === user.id) return true;
        return false;
      },
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
                <AvatarInput
                  onChange={field.onChange}
                  defaultPreview={user.image}
                  width={300}
                  height={300}
                  priority
                />
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
                <Input placeholder="email@example.com" {...field} autoComplete="email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-x-6">
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

          <FormItem>
            <FormLabel>Provider</FormLabel>
            <FormControl className="capitalize">
              <Input value={user.accounts[0]?.provider || 'Credentials'} disabled />
            </FormControl>
          </FormItem>
        </div>

        <div className="flex justify-end space-x-4">
          <Button variant="secondary" asChild>
            <Link href="/dashboard/users">Discard</Link>
          </Button>
          <Button type="submit" disabled={form.formState.isSubmitting || !form.formState.isDirty}>
            {form.formState.isSubmitting ? <Loader className="h-2 w-2 bg-white" /> : 'Save Changes'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

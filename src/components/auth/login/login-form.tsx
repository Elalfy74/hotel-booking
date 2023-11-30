'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Loader } from '@/components/ui/loader';

import { AuthInput } from '../shared/auth-input';
import { loginSchema, LoginSchemaType } from './login-schema';

interface LoginFormProps {
  handleForgotPassword?: () => void;
}

export const LoginForm = ({ handleForgotPassword }: LoginFormProps) => {
  const router = useRouter();
  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });

  const [error, setError] = useState<null | string>(null);

  const onSubmit = async (values: LoginSchemaType) => {
    const res = await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (res?.error) {
      setError(res.error);
    }

    if (res?.ok) {
      window.location.href = '/';
    }
  };

  const onForgotPassword = () => {
    if (handleForgotPassword) {
      return handleForgotPassword();
    }
    router.push('/forgot-password');
  };

  return (
    <>
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>email address</FormLabel>
                <FormControl>
                  <AuthInput placeholder="email@example.com" {...field} autoComplete="email" />
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <AuthInput
                    placeholder="enter your password here"
                    {...field}
                    type="password"
                    autoComplete="current-password"
                  />
                </FormControl>
                <FormMessage />
                <Button
                  variant="link"
                  type="button"
                  className="p-0"
                  size="sm"
                  onClick={onForgotPassword}
                >
                  Forgot Password?
                </Button>
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? <Loader className="h-2 w-2 bg-white" /> : 'Login'}
          </Button>
        </form>
      </Form>
    </>
  );
};

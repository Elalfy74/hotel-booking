'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { LoginForm } from '@/components/auth/login/login-form';
import { SocialAuth } from '@/components/auth/shared/social-auth';
import { Button } from '@/components/ui/button';
import { Divider } from '@/components/ui/divider';
import { Logo } from '@/components/ui/logo';

const LoginPage = () => {
  const router = useRouter();

  return (
    <div className="mx-auto max-w-lg">
      {/* Heading */}
      <div className="mb-14 flex flex-col items-center">
        <Link href="/">
          <Logo className="h-12 w-12" />
        </Link>
        <h1 className="mt-6 text-3xl font-bold">Sign in to your account</h1>
      </div>
      <SocialAuth />
      <Divider>Or continue with</Divider>
      <LoginForm handleForgotPassword={() => router.push('/forgot-password')} />
      {/* Footer */}
      <div className="mt-6 flex items-center justify-center text-sm text-muted-foreground">
        Doesn&apos;t have an account?
        <Button variant="link" size="sm" asChild>
          <Link href="/sign-up">Sign up</Link>
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;

import Link from 'next/link';

import { SocialAuth } from '@/components/auth/shared/social-auth';
import { SignUpForm } from '@/components/auth/sign-up/sign-up-form';
import { Button } from '@/components/ui/button';
import { Divider } from '@/components/ui/divider';
import { Logo } from '@/components/ui/logo';

const SignUpPage = () => {
  return (
    <div className="mx-auto max-w-xl">
      {/* Heading */}
      <div className="mb-14 flex flex-col items-center">
        <Link href="/">
          <Logo className="h-12 w-12" />
        </Link>
        <h1 className="mt-6 text-3xl font-bold">Let&apos;s go!</h1>
      </div>
      <SocialAuth />
      <Divider>Or continue with</Divider>
      <SignUpForm />
      {/* Footer */}
      <div className="mt-6 flex items-center justify-center text-sm text-muted-foreground">
        Already have an account?
        <Button variant="link" size="sm" asChild>
          <Link href="/login">Login</Link>
        </Button>
      </div>
    </div>
  );
};

export default SignUpPage;

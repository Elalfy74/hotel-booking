import Link from 'next/link';

import { ForgotPasswordForm } from '@/components/auth/forgot-password/forgot-password-form';
import { Logo } from '@/components/ui/logo';

const ForgotPasswordPage = () => {
  return (
    <div className="mx-auto max-w-lg">
      {/* Heading */}
      <div className="mb-14 flex flex-col items-center">
        <Link href="/">
          <Logo className="h-12 w-12" />
        </Link>
        <h1 className="mb-2 mt-6 text-3xl font-bold">Password Recovery</h1>
        <p className="text-muted-foreground">Enter your email to recover your password</p>
      </div>
      <ForgotPasswordForm />
    </div>
  );
};

export default ForgotPasswordPage;

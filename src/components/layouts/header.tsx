import Link from 'next/link';

import { LoginModal } from '../auth/login/login-modal';
import { SignUpModal } from '../auth/sign-up/sign-up-modal';
import { Logo } from '../ui/logo';

export const Header = () => {
  return (
    <header className="flex items-center justify-between px-6 py-4 shadow">
      <h2 className="text-2xl font-bold">
        <Link href="/">
          <Logo className="h-8 w-8" />
        </Link>
      </h2>
      <div className="space-x-3">
        <LoginModal />
        <SignUpModal />
      </div>
    </header>
  );
};

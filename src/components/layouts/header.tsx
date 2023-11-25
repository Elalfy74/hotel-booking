import Link from 'next/link';

import { ThemeSwitcher } from '../theme-switcher';
import { Logo } from '../ui/logo';
import { UserButton } from '../user-button';

export const Header = () => {
  return (
    <header className="flex items-center justify-between px-6 py-4 shadow">
      <h2 className="text-2xl font-bold">
        <Link href="/">
          <Logo className="h-8 w-8" />
        </Link>
      </h2>
      <div className="flex items-center space-x-3">
        <UserButton />
        <ThemeSwitcher />
      </div>
    </header>
  );
};

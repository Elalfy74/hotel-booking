import Link from 'next/link';

import { ThemeSwitcher } from '@/components/theme-switcher';
import { Logo } from '@/components/ui/logo';

import { Nav } from './nav';
import { SidebarUser } from './sidebar-user';

export function SideBar() {
  return (
    <div className="sticky top-0 flex h-screen w-72 flex-col border-r">
      <div className="flex flex-1 flex-col overflow-y-auto pb-4 pt-5">
        <div className="flex flex-shrink-0 items-center justify-between px-4">
          <Link href="/" className="h-8 w-8 ">
            <Logo />
          </Link>
          <ThemeSwitcher />
        </div>
        <Nav />
      </div>
      <div className="border-t p-4">
        <SidebarUser />
      </div>
    </div>
  );
}

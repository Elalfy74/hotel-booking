'use client';

import { BarChart3Icon, Building2Icon, BuildingIcon, GlobeIcon, Users2Icon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback } from 'react';

import { cn } from '@/lib/utils';

const navigation = [
  {
    name: 'Dashboard',
    icon: BarChart3Icon,
    href: '/dashboard',
  },
  { name: 'Users', icon: Users2Icon, href: '/dashboard/users' },
  { name: 'Countries', icon: GlobeIcon, href: '/dashboard/countries' },
  { name: 'Cities', icon: Building2Icon, href: '/dashboard/cities' },
  { name: 'Hotels', icon: BuildingIcon, href: '/dashboard/hotels' },
];

export const Nav = () => {
  const currentRoute = usePathname();

  const getIsActive = useCallback(
    (href: string) => {
      if (href === '/dashboard') {
        return currentRoute === href;
      }

      return currentRoute.startsWith(href);
    },
    [currentRoute],
  );

  return (
    <nav className="mt-5 flex-1 space-y-1 px-2" aria-label="Sidebar">
      {navigation.map((item) => {
        const isActive = getIsActive(item.href);

        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              'group flex items-center rounded-md px-2 py-2 text-sm font-medium transition-colors',
              isActive
                ? 'bg-primary/5 text-primary hover:bg-primary/5 hover:text-primary'
                : 'text-muted-foreground hover:bg-muted/50',
            )}
          >
            <>
              <item.icon
                className={cn(
                  'mr-3 h-6 w-6 flex-shrink-0',
                  isActive ? 'text-primary' : 'text-gray-400 ',
                )}
                aria-hidden="true"
              />
              <span className="flex-1">{item.name}</span>
            </>
          </Link>
        );
      })}
    </nav>
  );
};

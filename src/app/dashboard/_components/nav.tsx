'use client';

import {
  BarChart3Icon,
  Building2Icon,
  BuildingIcon,
  ChevronDown,
  ChevronRight,
  GlobeIcon,
  Users2Icon,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';

const getIsActive = (href: string, currentRoute: string, shouldEq: boolean = false) => {
  if (shouldEq) {
    return href === currentRoute;
  }

  return currentRoute.startsWith(href);
};

const navigation = [
  {
    name: 'Dashboard',
    icon: BarChart3Icon,
    href: '/dashboard',
  },
  { name: 'Users', icon: Users2Icon, href: '/dashboard/users' },
  { name: 'Countries', icon: GlobeIcon, href: '/dashboard/countries' },
  { name: 'Cities', icon: Building2Icon, href: '/dashboard/cities' },
];

export const Nav = () => {
  const currentRoute = usePathname();

  return (
    <nav className="mt-5 flex-1 space-y-1 px-2" aria-label="Sidebar">
      {navigation.map((item) => {
        let isActive: boolean;

        if (item.name === 'Dashboard') {
          isActive = getIsActive(item.href, currentRoute, true);
        } else {
          isActive = getIsActive(item.href, currentRoute);
        }

        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              'flex items-center rounded-md p-2 text-sm font-medium transition-colors',
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
      <HotelsCatalogNav />
    </nav>
  );
};

export const HotelsCatalogNav = () => {
  const currentRoute = usePathname();
  const [isOpen, setOpen] = useState(getIsActive('/dashboard/hotels', currentRoute));

  const isActive = getIsActive('/dashboard/hotels', currentRoute);
  return (
    <Collapsible className="space-y-2" open={isOpen} onOpenChange={setOpen}>
      <div
        className={cn(
          'rounded-md p-2 text-sm font-medium transition-colors',
          isActive
            ? 'bg-primary/5 text-primary hover:bg-primary/5 hover:text-primary'
            : 'text-muted-foreground hover:bg-muted/50',
        )}
      >
        <CollapsibleTrigger asChild>
          <div className="flex w-full cursor-pointer items-center gap-3">
            <h4 className="flex items-center">
              <BuildingIcon
                className={cn(
                  'mr-3 h-6 w-6 flex-shrink-0',
                  isActive ? 'text-primary' : 'text-gray-400 ',
                )}
                aria-hidden="true"
              />
              Hotels Catalog
            </h4>
            {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </div>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="space-y-2">
        <Link
          className={cn(
            'block w-fit px-6 py-2 text-sm hover:underline',
            getIsActive('/dashboard/hotels', currentRoute, true)
              ? 'text-primary'
              : 'text-muted-foreground',
          )}
          href="/dashboard/hotels"
        >
          - Hotels
        </Link>
        <Link
          className={cn(
            'block w-fit px-6 py-2 text-sm hover:underline',
            getIsActive('/dashboard/hotels/hotel-categories', currentRoute, true)
              ? 'text-primary'
              : 'text-muted-foreground',
          )}
          href="/dashboard/hotels/hotel-categories"
        >
          - Hotel Categories
        </Link>
      </CollapsibleContent>
    </Collapsible>
  );
};

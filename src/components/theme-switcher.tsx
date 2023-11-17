'use client';

import { DesktopIcon, MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const themeElements = {
    light: <SunIcon className="h-4 w-4" />,
    dark: <MoonIcon className="h-4 w-4" />,
    system: <DesktopIcon className="h-4 w-4" />,
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {/* @ts-ignore */}
        <Button variant="outline">{themeElements[theme]}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[5rem]">
        {Object.entries(themeElements).map(([key, value]) => (
          <DropdownMenuCheckboxItem
            key={key}
            checked={theme === key}
            onCheckedChange={() => setTheme(key)}
          >
            {value}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

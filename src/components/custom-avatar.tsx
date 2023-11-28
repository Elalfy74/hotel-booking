import Image from 'next/image';

import { cn } from '@/lib/utils';

import { Avatar, AvatarFallback } from './ui/avatar';

interface CustomAvatarProps {
  className?: string;
  src?: string | null;
  fallBack: string;
}

export const CustomAvatar = ({ className, src, fallBack }: CustomAvatarProps) => {
  return (
    <Avatar className={cn('border', className)}>
      {src && (
        <Image
          src={src}
          alt="avatar"
          className="aspect-square h-full w-full"
          width={32}
          height={32}
        />
      )}
      {!src && <AvatarFallback>{fallBack}</AvatarFallback>}
    </Avatar>
  );
};

import Image from 'next/image';

import { cn } from '@/lib/utils';

import { Avatar, AvatarFallback } from './ui/avatar';

interface CustomAvatarProps {
  className?: string;
  src?: string | null;
  children: React.ReactNode;
  onLoad?: () => void;
}

export const CustomAvatar = ({ className, src, children, onLoad }: CustomAvatarProps) => {
  return (
    <Avatar className={cn('border', className)}>
      {src && (
        <Image
          src={src}
          alt="avatar"
          className="aspect-square h-full w-full object-cover"
          width={32}
          height={32}
          onLoad={onLoad}
        />
      )}
      {!src && <AvatarFallback>{children}</AvatarFallback>}
    </Avatar>
  );
};

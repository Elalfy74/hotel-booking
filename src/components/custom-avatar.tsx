import Image from 'next/image';

import { cn } from '@/lib/utils';

import { Avatar, AvatarFallback } from './ui/avatar';

export interface CustomAvatarProps {
  className?: string;
  src?: string | null;
  children: React.ReactNode;
  onLoad?: () => void;
  width?: number;
  height?: number;
  priority?: boolean;
}

export const CustomAvatar = ({
  className,
  src,
  children,
  onLoad,
  width = 32,
  height = 32,
  priority,
}: CustomAvatarProps) => {
  return (
    <Avatar className={cn('border', className)}>
      {src && (
        <Image
          src={src}
          alt="avatar"
          className="aspect-square h-full w-full object-cover"
          width={width}
          height={height}
          onLoad={onLoad}
          priority={priority}
        />
      )}
      {!src && <AvatarFallback>{children}</AvatarFallback>}
    </Avatar>
  );
};

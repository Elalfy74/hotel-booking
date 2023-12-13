import { UploadIcon, UserIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { CustomAvatar, CustomAvatarProps } from './custom-avatar';

interface AvatarInputProps extends Omit<CustomAvatarProps, 'onLoad' | 'src' | 'children'> {
  onChange: (file: File) => void;
  defaultPreview?: string | null;
}

export const AvatarInput = ({ onChange, defaultPreview, ...avatarProps }: AvatarInputProps) => {
  const [file, setFile] = useState<{ file: File; preview: string }>();

  useEffect(() => {
    return () => {
      if (file?.preview) URL.revokeObjectURL(file.preview);
    };
  }, [file]);

  return (
    <>
      <div className="relative w-fit">
        <CustomAvatar
          src={file?.preview || defaultPreview}
          className="relative h-44 w-44"
          onLoad={() => {
            if (file?.preview) {
              URL.revokeObjectURL(file.preview);
            }
          }}
          {...avatarProps}
        >
          <UserIcon className="h-20 w-20 text-gray-400" />
        </CustomAvatar>
        <Button
          className="absolute bottom-4 right-0 cursor-pointer bg-background"
          variant="outline"
          size="icon"
          asChild
        >
          <label htmlFor="image">
            <UploadIcon className="h-4 w-4" />
          </label>
        </Button>
      </div>
      <Input
        id="image"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          if (!e.target.files || e.target.files.length < 1) return;

          setFile({
            file: e.target.files[0],
            preview: URL.createObjectURL(e.target.files[0]),
          });

          onChange(e.target.files[0]);
        }}
      />
    </>
  );
};

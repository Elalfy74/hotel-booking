import { UploadIcon, UserIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { usePreviewFile } from '@/hooks/use-preview-file';

import { CustomAvatar, type CustomAvatarProps } from './custom-avatar';

interface AvatarInputProps
  extends ImageInputProps,
    Omit<CustomAvatarProps, 'onLoad' | 'src' | 'children'> {}

export const AvatarInput = ({
  value,
  onChange,
  defaultPreview,
  ...avatarProps
}: AvatarInputProps) => {
  const previewFile = usePreviewFile(value);
  const preview = previewFile ?? defaultPreview;

  return (
    <>
      <div className="relative w-fit">
        <CustomAvatar
          src={preview}
          className="relative h-44 w-44"
          onLoad={() => {
            if (previewFile) {
              URL.revokeObjectURL(previewFile);
            }
          }}
          fallback={<UserIcon className="h-20 w-20 text-gray-400" />}
          {...avatarProps}
        />

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

          onChange(e.target.files[0]);
        }}
      />
    </>
  );
};

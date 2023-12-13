import { XIcon } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { type DropzoneRootProps, useDropzone } from 'react-dropzone';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface DropzoneProps {
  onChange: (file: File[]) => void;
  defaultPreview?: string[] | null;
}

export const ImagesDropzone = ({ onChange, defaultPreview }: DropzoneProps) => {
  const [files, setFiles] = useState<{ file: File; preview: string }[]>([]);

  useEffect(() => {
    return () => {
      if (files.length > 0) {
        files.forEach((file) => URL.revokeObjectURL(file.preview));
      }
    };
  }, [files]);

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } = useDropzone({
    accept: {
      'image/*': [],
    },
    maxFiles: 5,
    onDrop: (files) => {
      if (!files || files.length < 1) return;

      setFiles(files.map((file) => ({ file, preview: URL.createObjectURL(file) })));
      onChange(files);
    },
    onDropRejected(fileRejections, event) {
      if (fileRejections.length > 5) {
        toast.error('You can only upload 5 images at a time');
      }
    },
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject],
  );

  const couldAddMore = files.length < 5;

  const onAddInputChange = (inputFiles: File[]) => {
    if (files.length + inputFiles.length > 5) {
      toast.error('You can only upload 5 images at a time');
      return;
    }

    const newFiles = inputFiles.map((file) => ({ file, preview: URL.createObjectURL(file) }));
    setFiles([...files, ...newFiles]);
  };

  const filePreviews = files.length > 0 ? files.map((file) => file.preview) : defaultPreview;

  return (
    <>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />

        {files.length === 0 ? (
          <p>Drag &apos;n&apos; drop images here, or click to select images</p>
        ) : (
          <p>Drag &apos;n&apos; drop images here, or click to replace images</p>
        )}
      </div>
      {filePreviews && (
        <div className="flex flex-wrap gap-6 pt-6">
          {filePreviews.map((preview) => (
            <div key={preview} className="relative h-36 w-48">
              <Image
                src={preview}
                className="h-full w-full object-cover"
                alt="image"
                priority
                width={600}
                height={400}
                onLoad={() => {
                  if (preview) {
                    URL.revokeObjectURL(preview);
                  }
                }}
              />
              <Button
                className="absolute -right-3 -top-3 rounded-full"
                variant="secondary"
                size="icon"
                onClick={() => {
                  const newFiles = files.filter((file) => file.preview !== preview);
                  setFiles(newFiles);
                  onChange(newFiles.map((file) => file.file));
                }}
              >
                <XIcon className="h-4 w-4" />
              </Button>
            </div>
          ))}

          {couldAddMore && (
            <div className="flex h-36 w-48 items-center justify-center">
              <Input
                id="file"
                type="file"
                className="hidden"
                multiple
                onChange={(e) => {
                  if (!e.target.files || e.target.files.length < 1) return;
                  onAddInputChange(Array.from(e.target.files));
                }}
                accept="image/*"
              />
              <Button variant="secondary" asChild>
                <label htmlFor="file">Add more</label>
              </Button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

const baseStyle: DropzoneRootProps = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
};

const focusedStyle = {
  borderColor: '#2F234F',
};

const acceptStyle = {
  borderColor: '#00e676',
};

const rejectStyle = {
  borderColor: '#ff1744',
};

import Image from 'next/image';
import { useMemo } from 'react';
import { type DropzoneRootProps, useDropzone } from 'react-dropzone';

import { usePreviewFile } from '@/hooks/use-preview-file';

interface DropzoneProps extends ImageInputProps {}

export const Dropzone = ({ value, onChange, defaultPreview }: DropzoneProps) => {
  const previewFile = usePreviewFile(value);
  const preview = previewFile ?? defaultPreview;

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } = useDropzone({
    accept: {
      'image/*': [],
    },
    multiple: false,
    onDrop: (files) => {
      if (!files || files.length < 1) return;

      onChange(files[0]);
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

  return (
    <div {...getRootProps({ style })}>
      <input {...getInputProps()} />
      {preview && (
        <Image
          src={preview}
          className="h-80 object-cover"
          alt="image"
          priority
          width={600}
          height={400}
          onLoad={() => {
            if (previewFile) {
              URL.revokeObjectURL(previewFile);
            }
          }}
        />
      )}

      <p>Drag &apos;n&apos; drop image here, or click to select image</p>
    </div>
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

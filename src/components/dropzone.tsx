import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { type DropzoneRootProps, useDropzone } from 'react-dropzone';

interface DropzoneProps {
  onChange: (file: File) => void;
  defaultPreview?: string | null;
}

export const Dropzone = ({ onChange, defaultPreview }: DropzoneProps) => {
  const [preview, setPreview] = useState<string>();

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } = useDropzone({
    accept: {
      'image/*': [],
    },
    multiple: false,
    onDrop: (files) => {
      if (!files || files.length < 1) return;

      setPreview(URL.createObjectURL(files[0]));
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

  const filePreview = preview || defaultPreview;

  return (
    <div {...getRootProps({ style })}>
      <input {...getInputProps()} />
      {filePreview && (
        <Image
          src={filePreview}
          className="h-80 object-cover"
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

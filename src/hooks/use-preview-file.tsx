import { useEffect, useMemo } from 'react';

export const usePreviewFile = (value: File | undefined) => {
  const previewFile = useMemo(() => value && URL.createObjectURL(value), [value]);

  useEffect(() => {
    return () => {
      if (previewFile) URL.revokeObjectURL(previewFile);
    };
  }, [previewFile]);

  return previewFile;
};

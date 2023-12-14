import { CityImage } from '@prisma/client';
import { XIcon } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ImagesInputProps {
  onChange: (file: File[]) => void;
  defaultPreview: CityImage[];
  onAddImageToRemove: (image: CityImage) => void;
}

export const ImagesInput = ({ defaultPreview, onChange, onAddImageToRemove }: ImagesInputProps) => {
  const [currentPreview, setCurrentPreview] = useState<CityImage[]>(defaultPreview);
  const [files, setFiles] = useState<{ file: File; preview: string }[]>([]);

  useEffect(() => {
    return () => {
      if (files.length > 0) {
        files.forEach((file) => URL.revokeObjectURL(file.preview));
      }
    };
  }, [files]);

  const totalImages = currentPreview.length + files.length;
  const couldAddMore = totalImages < 5;

  const onAddInputChange = (inputFiles: File[]) => {
    if (totalImages + inputFiles.length > 5) {
      toast.error('City can only have up to 5 images');
      return;
    }

    const newFiles = [
      ...files,
      ...inputFiles.map((file) => ({ file, preview: URL.createObjectURL(file) })),
    ];
    setFiles(newFiles);
    onChange(newFiles.map((file) => file.file));
  };

  const filePreviews = [
    ...currentPreview.map((image) => image.url),
    ...files.map((file) => file.preview),
  ];

  const onDeleteClick = (preview: string) => {
    // Check if the file is from the server or from the input
    const newFille = files.find((file) => file.preview === preview);

    // If the file is from the input, remove it from the state  and call the onChange function
    if (newFille) {
      const newFiles = files.filter((file) => file.preview !== preview);
      setFiles(newFiles);
      onChange(newFiles.map((file) => file.file));
    }
    // If the file is from the server, remove it from the state
    else {
      const fileToRemove = currentPreview.find((image) => image.url === preview);
      if (!fileToRemove) return;

      setCurrentPreview((prev) => prev.filter((image) => image.url !== preview));
      onAddImageToRemove(fileToRemove);
    }
  };

  return (
    <>
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
                onClick={() => onDeleteClick(preview)}
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

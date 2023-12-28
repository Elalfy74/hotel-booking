type AwaitedReturn<T extends (...args: any) => any> = Awaited<ReturnType<T>>;

interface ImageInputProps {
  value: File | undefined;
  onChange: (file: File) => void;
  defaultPreview?: string | null | undefined;
}

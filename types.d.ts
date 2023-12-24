type AwaitedReturn<T extends (...args: any) => any> = Awaited<ReturnType<T>>;

interface ImageInputProps {
  value: File | undefined;
  onChange: (file: File) => void;
  defaultPreview?: string | null | undefined;
}

interface ICountry {
  id: string;
  name: string;
  photo?: string;
  isFeatured?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
interface ICountryWCityCount extends ICountry {
  cityCount: number;
}

interface ICity {
  id: string;
  name: string;
  country: string;
  photos?: string[];
  isFeatured?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
interface ICityWCountry extends Omit<ICity, 'country'> {
  country: ICountry;
}

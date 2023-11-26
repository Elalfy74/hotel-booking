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

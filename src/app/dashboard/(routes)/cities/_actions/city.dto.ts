import { CityImage, Country } from '@prisma/client';
import { Expose, Transform } from 'class-transformer';

export class CityDto {
  @Expose() id!: string;
  @Expose() name!: string;
  @Expose() country!: Country;
  @Expose() isFeatured!: boolean;
  @Expose()
  @Transform(({ value }) => value.map((image: CityImage) => image.url))
  images!: string[];
}

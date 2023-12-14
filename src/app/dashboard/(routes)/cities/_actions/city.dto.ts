import { CityImage, Country } from '@prisma/client';
import { Expose } from 'class-transformer';

export class CityDto {
  @Expose() id!: string;
  @Expose() name!: string;
  @Expose() country!: Country;
  @Expose() isFeatured!: boolean;
  @Expose() images!: CityImage[];
}

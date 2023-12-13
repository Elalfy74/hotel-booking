import { Role } from '@prisma/client';
import { Expose, Transform } from 'class-transformer';

export class UserDto {
  @Expose() id!: string;
  @Expose() firstName!: string | null;
  @Expose() lastName!: string | null;
  @Expose() role!: Role;
  @Expose() email!: string;
  @Expose() image!: string | null;

  @Expose({ name: 'accounts' })
  @Transform(({ value }) => {
    if (value.length === 0) {
      return 'credentials';
    }
    return value[0].provider;
  })
  provider!: string;
}

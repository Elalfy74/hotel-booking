import { Role } from '@prisma/client';

export interface IUser {
  id: string;
  firstName: string | null;
  lastName: string | null;
  role: Role;
  email: string;
  image: string | null;
  accounts: {
    provider: string;
  }[];
}

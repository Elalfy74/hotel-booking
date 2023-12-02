import bcrypt from 'bcrypt';
import { type Session } from 'next-auth';

import { checkAdmin, checkAuth } from './auth-actions';

export interface ActionRes<T> {
  data?: T;
  error?: string;
}

type AsyncFunction<TResponse, TArgs> = (args: TArgs) => Promise<TResponse>;

export function createAsyncHandler<TResponse, TArgs>(
  fn: AsyncFunction<TResponse, TArgs>,
  authCheck?: () => Promise<void | Session>,
): AsyncFunction<ActionRes<TResponse>, TArgs> {
  return async function (args: TArgs) {
    try {
      if (authCheck) {
        await authCheck();
      }

      const data = await fn(args);
      return { data };
    } catch (error) {
      const err = error as Error;
      return { error: err.message };
    }
  };
}

export function asyncHandler<TResponse, TArgs>(fn: AsyncFunction<TResponse, TArgs>) {
  return createAsyncHandler(fn);
}

export function asyncAuthHandler<TResponse, TArgs>(fn: AsyncFunction<TResponse, TArgs>) {
  return createAsyncHandler(fn, checkAuth);
}

export function asyncAdminHandler<TResponse, TArgs>(fn: AsyncFunction<TResponse, TArgs>) {
  return createAsyncHandler(fn, checkAdmin);
}

export function hashPassword(password: string) {
  return bcrypt.hashSync(password, 10);
}

export function comparePassword(password: string, hashed: string) {
  return bcrypt.compareSync(password, hashed);
}

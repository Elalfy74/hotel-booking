import { getAppSession } from '@/lib/get-app-session';

export interface ActionRes<T> {
  data?: T;
  error?: string;
}

export async function checkAuth() {
  const session = await getAppSession();

  if (!session) {
    throw new Error('Unauthorized');
  }
}

export async function checkAdmin() {
  const session = await getAppSession();

  if (!session || session.user.role !== 'ADMIN') {
    throw new Error('Access denied');
  }
}

type AsyncFunction<T, U> = (args: U) => Promise<T>;

export function asyncHandler<T, U>(fn: AsyncFunction<T, U>): AsyncFunction<ActionRes<T>, U> {
  return async function (args: U) {
    try {
      const data = await fn(args);
      return { data };
    } catch (error) {
      const err = error as Error;

      return { error: err.message };
    }
  };
}

export function asyncAuthHandler<T, U>(fn: AsyncFunction<T, U>): AsyncFunction<ActionRes<T>, U> {
  return async function (args: U) {
    try {
      await checkAuth();

      const data = await fn(args);
      return { data };
    } catch (error) {
      const err = error as Error;

      return { error: err.message };
    }
  };
}

export function asyncAdminHandler<T, U>(fn: AsyncFunction<T, U>): AsyncFunction<ActionRes<T>, U> {
  return async function (args: U) {
    try {
      await checkAdmin();

      const data = await fn(args);
      return { data };
    } catch (error) {
      const err = error as Error;

      return { error: err.message };
    }
  };
}

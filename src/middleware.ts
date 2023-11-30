import { withAuth } from 'next-auth/middleware';

export const middleware = withAuth({
  callbacks: {
    authorized: ({ token }) => {
      return token?.role === 'ADMIN';
    },
  },
});

export const config = { matcher: '/dashboard/:path*' };

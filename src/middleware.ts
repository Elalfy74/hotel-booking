import { withAuth } from 'next-auth/middleware';

export default withAuth({
  pages: { signIn: '/' },
  callbacks: {
    authorized: ({ token }) => {
      return token?.role === 'ADMIN';
    },
  },
});

export const config = { matcher: '/dashboard/:path*' };

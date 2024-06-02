import { MiddlewareConfig} from 'next/server';
import { withAuth } from "next-auth/middleware"
import { getToken } from 'next-auth/jwt';

export default withAuth({
  callbacks: {
    authorized: async ({ req, token }) => {
      const { pathname } = req.nextUrl;

      const t = await getToken({ secret: process.env.NEXTAUTH_SECRET, req });
      console.log("t", t);
      

      console.log("secret", process.env.NEXTAUTH_SECRET);
      
      console.log("pathname", pathname);
      console.log("token", token);
      
      if(!token) return false;

      const role = token.role;
      if (role === "ADMIN" && !pathname.startsWith('/admin')) {
        return false;
      }

      if (role === 'SELLER' && !pathname.startsWith('/seller')) {
        return false;
      }

      if (role === 'USER' && (pathname.startsWith('/admin') || pathname.startsWith('/seller'))) {
        return false;
      }

      return true;
    }
  }
})


export const config: MiddlewareConfig = {
  matcher: [
    '/admin/:path*',
    '/seller/:path*',
    '/cart/:path*',
    '/checkout/:path*',
    '/orders/:path*',
    '/thank-you',
  ],
};

import { MiddlewareConfig} from 'next/server';
import { withAuth } from "next-auth/middleware"

export default withAuth({
  callbacks: {
    authorized: ({ req, token }) => {
      const { pathname } = req.nextUrl;

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

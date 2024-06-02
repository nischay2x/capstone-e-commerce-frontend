import { getToken } from 'next-auth/jwt';
import { MiddlewareConfig, NextRequest, NextResponse } from 'next/server';


export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  
  // If no token, redirect to login page
  if (!token) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  const { role } = token;

  if (role === "ADMIN" && !pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/admin', req.url));
  }

  if (role === 'SELLER' && !pathname.startsWith('/seller')) {
    return NextResponse.redirect(new URL('/seller', req.url));
  }

  if (role === 'USER' && (pathname.startsWith('/admin') || pathname.startsWith('/seller'))) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

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

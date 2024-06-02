

import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

const OPEN_ROUTES = ['/public', '/api/auth', '/auth', "/support", "/_next"]; // Define your open routes here

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  console.log("middleware: ", pathname);


  if (pathname.endsWith(".jpg") || pathname.endsWith(".png") || OPEN_ROUTES.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  const token = await getToken({ req }) as { role: "ADMIN" | "SELLER" | "USER" } | null;

  if (pathname === "/" || pathname.startsWith("/shop")) {
    if (token && token.role !== "USER") {
      return NextResponse.redirect(new URL(`/${token.role.toLowerCase()}`, req.url));
    }

    return NextResponse.next();
  }

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

export const config = {
  matcher: [
    // Match all paths to apply the middleware
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};



import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

const OPEN_ROUTES = ['/public', '/api/auth', '/auth', "/support", "/_next"]; // Define your open routes here

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.endsWith(".jpg") || pathname.endsWith(".png")) {
    return NextResponse.next();
  }

  const token = await getToken({ req });
  if(token) {
    const { role } = token as { role: "ADMIN" | "SELLER" | "USER" };
    if(pathname === "/" && role !== "USER"){
        return NextResponse.redirect(new URL(`/${role.toLowerCase()}`, req.url));
    }
  }

  if(pathname === "/"){
    return NextResponse.next();
}

  // Allow open routes without authentication
  if (OPEN_ROUTES.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  if(pathname.startsWith("/shop")) {
    if(!token) {
        return NextResponse.next();
    }
    const { role } = token as { role: "ADMIN" | "SELLER" | "USER" };
    if( role !== "USER") {
        return NextResponse.redirect(new URL(`/${role.toLowerCase()}`, req.url));
    }
  }

  // If no token, redirect to login page
  if (!token) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  const { role } = token as { role: "ADMIN" | "SELLER" | "USER" };

  if(role === "ADMIN" && !pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/admin', req.url));
  }

  // Role-based path restrictions
  if (role === 'ADMIN' && pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  if (role === 'SELLER' && !pathname.startsWith('/seller')) {
    return NextResponse.redirect(new URL('/seller', req.url));
  }

  if (role === 'SELLER' && pathname.startsWith('/seller')) {
    return NextResponse.next();
  }

  if (role === 'USER' && !pathname.startsWith('/admin') && !pathname.startsWith('/seller')) {
    return NextResponse.next();
  }

  // Redirect to not authorized page or home page if role doesn't match the path
  return NextResponse.redirect(new URL('/', req.url));
}

export const config = {
  matcher: [
    // Match all paths to apply the middleware
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};

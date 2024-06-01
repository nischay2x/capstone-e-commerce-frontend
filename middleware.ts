// middleware.js

import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

const OPEN_ROUTES = ['/public', '/api/auth', '/auth', "/support", "/shop"]; // Define your open routes here

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  
  if(pathname === "/"){
    return NextResponse.next();
  }

  // Allow open routes without authentication
  if (OPEN_ROUTES.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  const token = await getToken({ req });

  // If no token, redirect to login page
  if (!token) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  const { role } = token;

  // Role-based path restrictions
  if (role === 'ADMIN' && pathname.startsWith('/admin')) {
    return NextResponse.next();
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

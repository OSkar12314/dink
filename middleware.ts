import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PASSWORD = 'dink2026';
const COOKIE = 'dink_auth';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Låt lösenordssidan och API-routen passera fritt
  if (pathname === '/login' || pathname === '/api/login') {
    return NextResponse.next();
  }

  const auth = request.cookies.get(COOKIE)?.value;

  if (auth !== PASSWORD) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};

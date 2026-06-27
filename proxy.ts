import { NextResponse } from 'next/server';
import type { NextRequest, NextFetchEvent } from 'next/server';

const PASSWORD = 'dink2026';
const COOKIE = 'dink_auth';

export function proxy(request: NextRequest, event: NextFetchEvent) {
  const { pathname } = request.nextUrl;

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

export const config: import('next/server').ProxyConfig = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Skip middleware for public assets
  if (request.nextUrl.pathname.startsWith('/public/')) {
    return NextResponse.next()
  }

  // Check if trying to access dashboard
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    // Get authentication status from session
    const isAuthenticated = request.cookies.get('authenticated')?.value === 'true'

    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  return NextResponse.next()
}

// Configure which routes to run middleware on
export const config = {
  matcher: '/dashboard/:path*'
}
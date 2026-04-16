import createMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { routing } from './src/routing'

//this file is the middleware of the application, it's used to check if the user is authenticated before accessing 
// any page that is not public (login and register) and to handle the internationalization of the application.
const intlMiddleware = createMiddleware(routing)

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  const isPublicPage = /^\/(fr|en|es)\/(login|register)/.test(pathname) || pathname === '/'

  if (!isPublicPage) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
    if (!token) {
      const locale = pathname.split('/')[1] || 'fr'
      return NextResponse.redirect(new URL(`/${locale}/login`, req.url))
    }
  }

  return intlMiddleware(req)
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'], // Exclude API routes, Next.js internals, and static files
}
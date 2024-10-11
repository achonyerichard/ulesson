// src/middleware.ts

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Define paths that are considered public (accessible without a token)
  const noAuth = ['/login' ]
  const auth =["/overview"]
  
  // Get the token from the cookies
  const token = !!request.cookies.has('ulesson-token')

  // Redirect logic based on the path and token presence
  if (token && noAuth.includes(path)) {
    return NextResponse.redirect(new URL("/overview", request.url));
  } 
  if (!token && auth.includes(path)) {
    return NextResponse.redirect(new URL("/login", request.url));
  } 
  if(path ==="/"){
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

// It specifies the paths for which this middleware should be executed. 
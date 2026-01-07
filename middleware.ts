import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  // Get the secret - must match the one in NextAuth config
  const secret = process.env.NEXTAUTH_SECRET;
  
  if (!secret) {
    console.error("NEXTAUTH_SECRET is not set in middleware");
    return NextResponse.next(); // Allow access if no secret (dev fallback)
  }

  const token = await getToken({ 
    req: request, 
    secret: secret,
  });

  // If no token and trying to access protected route, redirect to home
  if (!token) {
    const url = new URL("/", request.url);
    url.searchParams.set("callbackUrl", request.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Protect these routes - users must be signed in to access them
export const config = {
  matcher: ["/dashboards/:path*"],
};


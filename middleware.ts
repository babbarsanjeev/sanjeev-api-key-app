import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  // Get the secret from environment
  const secret = process.env.NEXTAUTH_SECRET;
  
  // If no secret configured, allow access (will fail at NextAuth level anyway)
  if (!secret) {
    console.warn("NEXTAUTH_SECRET not available in middleware");
    return NextResponse.next();
  }

  try {
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
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.next();
  }
}

// Protect these routes - users must be signed in to access them
export const config = {
  matcher: ["/dashboards/:path*"],
};


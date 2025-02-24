import { NextResponse, NextRequest } from "next/server";

const protectedRoutes = ["/", "/dashoboard","/user-manage","/setting"];

export function middleware(req: NextRequest) {
  const isAuthenticated = req.cookies.has("userToken");

  if (!isAuthenticated && protectedRoutes.includes(req.nextUrl.pathname)) {
    const absoluteURL = new URL("/auth/sign-in", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
}

export const config = {
  matcher: ["/", "/dashoboard","/user-manage","/setting"],
};

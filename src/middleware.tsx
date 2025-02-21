import { NextResponse, NextRequest } from "next/server";

const protectedRoutes: string[] = [
  "/write-blog",
  "/your-stories",
  "/category/for-you",
  "/library",
  "/profile-setting",
  "/notifications",
  "/payment-history",
  "/",
];

export function middleware(req: NextRequest) {
  const isAuthenticated = req.cookies.has("userToken");

  if (!isAuthenticated && protectedRoutes.includes(req.nextUrl.pathname)) {
    const absoluteURL = new URL("/auth/sign-in", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
}

export const config = {
  matcher: protectedRoutes,
};

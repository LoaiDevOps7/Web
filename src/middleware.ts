import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicRoutes = [
  "/sign-in",
  "/sign-up",
  "/forgot-password",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authToken = request.cookies.get("authToken")?.value;

  if (pathname.startsWith("/_next") || pathname.includes(".")) {
    return NextResponse.next();
  }

   if (pathname === "/") {
     return NextResponse.next();
   }

  if (pathname.startsWith("/reset-password/")) {
    return NextResponse.next();
  }

  if (publicRoutes.includes(pathname)) {
    if (authToken) {
      return NextResponse.redirect(new URL("/user", request.url));
    }
    return NextResponse.next();
  }

  if (!authToken) {
    if (pathname !== "/sign-in") {
      return NextResponse.redirect(
        new URL(
          `/sign-in?redirect=${encodeURIComponent(pathname)}`,
          request.url,
        ),
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

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

  // إذا كان المستخدم مسجل الدخول وحاول الوصول إلى صفحة تسجيل الدخول
  if (publicRoutes.includes(pathname) && authToken) {
    return NextResponse.redirect(new URL("/user", request.url));
  }

  // إذا لم يكن مسجل الدخول وحاول الوصول إلى صفحة محمية
  if (!authToken && !publicRoutes.includes(pathname)) {
    const decodedPath = decodeURIComponent(pathname); // فك الترميز أولاً
    const encodedRedirect = encodeURIComponent(decodedPath); // ترميز مرة واحدة
    return NextResponse.redirect(
      new URL(`/sign-in?redirect=${encodedRedirect}`, request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

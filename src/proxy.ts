import { headers } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { auth } from "@/lib/auth";
import { ROUTES } from "@/lib/client-navigation-paths";

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const { pathname } = request.nextUrl;

  // Ignore static & internal
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    /\.[^/]+$/.test(pathname)
  ) {
    return NextResponse.next();
  }

  const publicRoutes = [
    ROUTES.HOME,
    ROUTES.SIGN_IN,
    ROUTES.SIGN_UP,
    ROUTES.FORGOT_PASSWORD,
    ROUTES.RESET_PASSWORD,
  ];

  // Not logged in
  if (!session?.user?.id) {
    if (publicRoutes.some((route) => route === pathname)) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL(ROUTES.SIGN_IN, request.url));
  }

  // Email not verified
  if (!session.user.emailVerified) {
    if (pathname === ROUTES.VERIFY_EMAIL) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL(ROUTES.VERIFY_EMAIL, request.url));
  }

  return NextResponse.next();
}

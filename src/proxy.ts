import { headers } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { UserRole } from "@/generated/prisma/enums";
import { auth } from "@/lib/auth";
import { EMPLOYER_ROUTES, JOB_SEEKER_ROUTES, ROUTES } from "@/lib/routes";

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const { pathname } = request.nextUrl;

  // Ignore static & internal
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Not logged in
  if (!session?.user.id) {
    if (
      pathname === ROUTES.HOME ||
      pathname === ROUTES.SIGN_IN ||
      pathname === ROUTES.SIGN_UP ||
      pathname === ROUTES.FORGOT_PASSWORD ||
      pathname === ROUTES.RESET_PASSWORD
    ) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL(ROUTES.HOME, request.url));
  }

  // Logged in but email not verified
  if (!session.user.emailVerified) {
    if (pathname === ROUTES.VERIFY_EMAIL) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL(ROUTES.VERIFY_EMAIL, request.url));
  }

  // Logged in but no role
  if (session.user.role === UserRole.NOT_ASSIGNED) {
    if (pathname === ROUTES.SELECT_USER_ROLE) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL(ROUTES.SELECT_USER_ROLE, request.url));
  }

  if (pathname === ROUTES.HOME) {
    return NextResponse.next();
  }

  // Job Seeker
  if (session.user.role === UserRole.JOB_SEEKER) {
    if (pathname.startsWith(JOB_SEEKER_ROUTES.BASE)) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL(JOB_SEEKER_ROUTES.JOBS, request.url));
  }

  // Employer
  if (session.user.role === UserRole.EMPLOYER) {
    if (pathname.startsWith(EMPLOYER_ROUTES.BASE)) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL(EMPLOYER_ROUTES.JOBS, request.url));
  }

  return NextResponse.next();
}

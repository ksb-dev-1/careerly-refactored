import { Suspense } from "react";

import { Metadata } from "next";

import { CustomLink } from "@/components/custom-link";
import { LoadingFallback } from "@/components/loading-fallback";
import { ROUTES } from "@/lib/routes";

import { ResetPasswordForm } from "./reset-password-form";

export const metadata: Metadata = {
  title: "Reset Password - Careerly",
  description:
    "Create a new password to securely access your Careerly account.",
};

async function GetToken({
  searchParams,
}: {
  searchParams: Promise<{ token: string }>;
}) {
  const { token } = await searchParams;

  if (!token) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4 text-center">
        <p className="font-bold text-xl text-red-600 dark:text-red-400">
          Token missing!
        </p>
        <p>You can’t reset your password without a valid token.</p>
        <CustomLink
          href={ROUTES.FORGOT_PASSWORD}
          className="text-slate-600 dark:text-muted-foreground underline"
        >
          Please request a new password reset link.
        </CustomLink>
      </div>
    );
  }
  return <ResetPasswordForm token={token} />;
}

export default function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token: string }>;
}) {
  return (
    <Suspense fallback={<LoadingFallback color="text-brand" />}>
      <GetToken searchParams={searchParams} />
    </Suspense>
  );
}

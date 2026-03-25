"use client";

import { useRouter } from "next/navigation";

import { LoadingFallback } from "@/components/loading-fallback";
import { authClient } from "@/lib/auth-client";
import { ROUTES } from "@/lib/routes";

import { ResendVerificationButton } from "./resend-verification-button";

export function VerifyEmailContent() {
  const { data: session, isPending, error } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();

  if (isPending) {
    return <LoadingFallback color="text-brand" />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <p className="font-bolf text-xl">Failed to fetch user session</p>
        <p className="text-sm text-slate-600 dark:text-muted-foreground">
          Refresh page to try again
        </p>
      </div>
    );
  }

  if (!user?.email) {
    router.push(ROUTES.SIGN_IN);
    return;
  }

  return (
    <div className="min-h-screen flex flex-1 items-center justify-center px-4 text-center">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">Verify your email</h1>
          <p className="text-slate-600 dark:text-muted-foreground">
            A verification email was sent to your inbox.
          </p>
        </div>
        <ResendVerificationButton email={user.email} />
      </div>
    </div>
  );
}

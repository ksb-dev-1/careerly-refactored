import type { Metadata } from "next";

import { VerifyEmailContent } from "./verify-email-content";

export const metadata: Metadata = {
  title: "Verify Email - Careerly",
  description:
    "Verify your email address to activate your Careerly account and start finding jobs or hiring talented professionals.",
};

export default async function VerifyEmailPage() {
  return <VerifyEmailContent />;
}

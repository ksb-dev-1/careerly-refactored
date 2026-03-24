import { Metadata } from "next";

import { SignInForm } from "./sign-in form";

export const metadata: Metadata = {
  title: "Sign In - Careerly",
  description: "Sign in to your Careerly account.",
};

export default function SignInPage() {
  return <SignInForm />;
}

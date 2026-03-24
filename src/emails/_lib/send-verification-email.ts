"use server";

import VerifyEmail from "../_components/verify-email";
import { resend } from "./resend";

type SendEmailVerifyParams = {
  from: string;
  to: string;
  url: string;
  name: string;
};

export async function sendEmailVerify({
  from,
  to,
  name,
  url,
}: SendEmailVerifyParams) {
  await resend.emails.send({
    from,
    to,
    subject: "Verify your Careerly account",
    react: VerifyEmail({
      url,
      name,
    }),
  });
}

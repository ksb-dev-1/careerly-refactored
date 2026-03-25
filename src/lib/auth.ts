import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

import { sendResetPasswordEmail } from "@/emails/_lib/send-reset-password-email";
import { sendEmailVerify } from "@/emails/_lib/send-verification-email";
import { prisma } from "@/lib/prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url }) => {
      void sendResetPasswordEmail({
        from: process.env.EMAIL_FROM!,
        to: user.email,
        name: user.name,
        url,
      });
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      void sendEmailVerify({
        from: process.env.EMAIL_FROM!,
        to: user.email,
        name: user.name,
        url,
      });
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        // required: true,
        input: false,
      },
    },
  },
  // If your application runs on a port other than 3000, you must add it to the trustedOrigins
  //   trustedOrigins: ["http://localhost:3001"],
});

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;

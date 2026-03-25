export const ROUTES = {
  HOME: "/",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  SELECT_USER_ROLE: "/select-user-role",
  VERIFY_EMAIL: "/verify-email",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",
} as const;

export const JOB_SEEKER_ROUTES = {
  BASE: "/job-seeker",
  JOBS: "/job-seeker/jobs?page=1",
  JOB_DETAILS: (jobId: string | number) => `/job-seeker/jobs/${jobId}`,
  BOOKMARKS: "/job-seeker/bookmarks",
  APPLICATIONS: "/job-seeker/applications",
  PROFILE: (callbackUrl?: string) =>
    callbackUrl
      ? `/job-seeker/profile?callbackUrl=${encodeURIComponent(callbackUrl)}`
      : "/job-seeker/profile",
  EDIT_PROFILE: "/job-seeker/profile/edit",
} as const;

export const EMPLOYER_ROUTES = {
  BASE: "/employer",
  JOBS: "/employer/jobs?page=1",
  JOB_DETAILS: (jobId: string | number) => `/employer/jobs/${jobId}`,
  APPLICATIONS: "/employer/applications",
  PROFILE: "/employer/profile",
  EDIT_PROFILE: "/employer/profile/edit",
} as const;

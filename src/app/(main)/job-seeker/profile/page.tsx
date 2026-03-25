import { Metadata } from "next";

import { JobSeekerProfileDetails } from "./profile-details";

export const metadata: Metadata = {
  title: "Profile - Careerly",
  description: "Manage your job seeker profile easily.",
};

export default function JobSeekerProfileDetailsPage() {
  return (
    <div className="min-h-screen max-w-custom w-full mx-auto mt-32 mb-16 px-4">
      <JobSeekerProfileDetails />
    </div>
  );
}

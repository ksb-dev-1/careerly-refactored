"use client";

import { EmptyState } from "@/components/errors/empty-state";
import { ServerError } from "@/components/errors/server-error";
import { Unauthenticated } from "@/components/errors/unauthenticated";
import { ProfileProgress } from "@/components/job-seeker/profile/profile-progress";
import { QuickLinks } from "@/components/job-seeker/profile/quick-links";
import { useFetchJobSeekerProfile } from "@/hooks/job-seeker/useFetchJobSeekerProfile";

import { UserDetails } from "./user-details";

export function JobSeekerProfileDetails() {
  const { data, isLoading, error } = useFetchJobSeekerProfile();

  if (isLoading) return <div>Loading...</div>;

  if (error) {
    if (error.status === 401) return <Unauthenticated />;
    return <ServerError />;
  }

  if (!data) {
    return <EmptyState />;
  }

  const profile = data.profile;
  const { name, email, image, jobSeekerProfile, resume } = profile;

  return (
    <div className="flex flex-col md:flex-row items-start gap-6">
      <div className="w-full md:w-100 space-y-6">
        <UserDetails name={name} email={email} profileImage={image} />

        <div className="hidden md:flex">
          <QuickLinks />
        </div>

        <div className="flex md:hidden">
          <ProfileProgress profile={profile} />
        </div>
      </div>
      <div className="w-full space-y-6">
        <div className="hidden md:flex">
          <ProfileProgress profile={profile} />
        </div>

        {/* <UploadResume jobSeekerId={jobSeekerId} resume={details.resume} /> */}

        {/* Employer or Company Details */}
        {/* <MoreAboutJobSeeker
            experience={experience}
            skills={skills}
            projects={projects}
            socials={socials}
            location={location}
            about={markdown}
          /> */}

        {/* Quick Links */}
        <div className="flex md:hidden">{/* <QuickLinks /> */}</div>
      </div>
    </div>
  );
}

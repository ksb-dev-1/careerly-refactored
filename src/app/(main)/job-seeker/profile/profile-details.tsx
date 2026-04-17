"use client";

import { EmptyState } from "@/components/errors/empty-state";
import { ServerError } from "@/components/errors/server-error";
import { Unauthenticated } from "@/components/errors/unauthenticated";
import { ProfileProgress } from "@/components/job-seeker/profile/profile-progress";
import { QuickLinks } from "@/components/job-seeker/profile/quick-links";
import { JobSeekerProfileDetailsSkeleton } from "@/components/skeletons/job-seeker-profile-details-skeleton";
import { useFetchJobSeekerProfile } from "@/hooks/job-seeker/useFetchJobSeekerProfile";

import { MoreAboutJobSeeker } from "./more-about-job-seeker";
import { UploadResume } from "./upload-resume";
import { UserDetails } from "./user-details";

export default function JobSeekerProfileDetails() {
  const { data, isPending, error } = useFetchJobSeekerProfile();

  if (isPending) return <JobSeekerProfileDetailsSkeleton />;

  if (error) {
    if (error.status === 401) return <Unauthenticated />;
    return <ServerError />;
  }

  if (!data?.profile) {
    return <EmptyState />;
  }

  const profile = data.profile;
  const { id, name, email, image, jobSeekerProfile, resume } = profile;

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

        <UploadResume userId={id} resume={resume} />

        <MoreAboutJobSeeker
        // experience={experience}
        // skills={skills}
        // projects={projects}
        // socials={socials}
        // location={location}
        // about={markdown}
        />

        <div className="flex md:hidden">
          <QuickLinks />
        </div>
      </div>
    </div>
  );
}

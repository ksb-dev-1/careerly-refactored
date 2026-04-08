"use client";

import Image from "next/image";
import Link from "next/link";

import {
  Bookmark,
  BriefcaseBusiness,
  BriefcaseBusinessIcon,
  Edit,
  FileText,
  Layers,
  Mail,
  MapPin,
  User,
} from "lucide-react";

import { CustomLink } from "@/components/custom-link";
import { EditLink } from "@/components/edit-link";
import { EmptyState } from "@/components/errors/empty-state";
import { ServerError } from "@/components/errors/server-error";
import { Unauthenticated } from "@/components/errors/unauthenticated";
// import TurndownService from "turndown";

import { Badge } from "@/components/ui/badge";
// import { UploadResume } from "@/components/job-seeker/upload-resume";
// import { EditLink } from "@/components/edit-link";
// import { Markdown } from "@/components/markdown";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useFetchJobSeekerProfile } from "@/hooks/job-seeker/useFetchJobSeekerProfile";
import { JOB_SEEKER_ROUTES } from "@/lib/routes";
import { ProjectType, SocialLinkType } from "@/lib/validation";

interface UserDetailsProps {
  name: string | null | undefined;
  email: string;
  profileImage: string | null | undefined;
}

function UserDetails({ name, email, profileImage }: UserDetailsProps) {
  return (
    <Card className="relative w-full p-6 flex flex-col items-center md:items-start shadow-sm">
      {profileImage ? (
        <div className="relative w-20 h-20 rounded-full border shadow-sm overflow-hidden">
          <Image
            src={profileImage}
            alt={name || "Profile"}
            fill
            className="object-cover"
            sizes="(max-width: 80px) 100vw, 80px"
            priority
          />
        </div>
      ) : (
        <div className="relative w-20 h-20 rounded-full border flex items-center justify-center shadow-sm">
          <User size={48} className="text-brand" />
        </div>
      )}

      <div>
        <CardTitle className="text-center md:text-start capitalize font-bold">
          {name || "Anonymous User"}
        </CardTitle>
        <p className="flex items-center gap-2 mt-2 text-muted-foreground text-center md:text-start">
          <Mail className="w-4 h-4" />
          <span className="text-sm">{email}</span>
        </p>
      </div>

      <EditLink
        href={`/job-seeker/profile/edit`}
        className="absolute top-4 right-4"
      />
    </Card>
  );
}

function QuickLinks() {
  return (
    <Card className="w-full shadow-sm">
      <CardHeader className="border-b">
        <CardTitle className="font-bold">Quick Links</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        <CustomLink
          href={JOB_SEEKER_ROUTES.JOBS}
          className="flex items-center gap-2 text-sm rounded-md font-medium hover:text-brand"
        >
          <BriefcaseBusiness className="w-4 h-4" />
          Jobs
        </CustomLink>

        <CustomLink
          href={JOB_SEEKER_ROUTES.BOOKMARKS}
          className="flex items-center gap-2 text-sm rounded-md font-medium hover:text-brand"
        >
          <Bookmark className="w-4 h-4" />
          Saved
        </CustomLink>

        <CustomLink
          href={JOB_SEEKER_ROUTES.APPLICATIONS}
          className="flex items-center gap-2 text-sm rounded-md font-medium hover:text-brand"
        >
          <FileText className="w-4 h-4" />
          Applied
        </CustomLink>

        <CustomLink
          href={JOB_SEEKER_ROUTES.EDIT_PROFILE}
          className="flex items-center gap-2 text-sm rounded-md font-medium hover:text-brand"
        >
          <Edit className="w-4 h-4" />
          Edit Profile
        </CustomLink>
      </CardContent>
    </Card>
  );
}

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
        {/* User Details */}
        <UserDetails name={name} email={email} profileImage={image} />

        {/* Quick Links */}
        <div className="hidden md:flex">
          <QuickLinks />
        </div>

        {/* Profile Progress */}
        <div className="flex md:hidden">
          {/* <ProfileProgress
              completion={completion}
              missingFields={missingFields}
            /> */}
        </div>
      </div>
      <div className="w-full space-y-6">
        {/* Profile Progress */}
        <div className="hidden md:flex">
          {/* <ProfileProgress
              completion={completion}
              missingFields={missingFields}
            /> */}
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

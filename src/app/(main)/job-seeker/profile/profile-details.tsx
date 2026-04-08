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
import { ProjectType, SocialLinkType } from "@/lib/validation";

export function JobSeekerProfileDetails() {
  const { data, isLoading, error } = useFetchJobSeekerProfile();

  if (isLoading) return <div>Loading...</div>;

  if (error) {
    if (error.status === 401) return <Unauthenticated />;
    return <ServerError />;
  }

  return <div>Job Seeker Profile Details</div>;
}

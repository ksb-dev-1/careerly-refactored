import { NextResponse } from "next/server";

import { Prisma } from "@/generated/prisma/client";
import { getServerSession } from "@/lib/get-server-session";
import { prisma } from "@/lib/prisma";

type ProfileWithRelations = Prisma.UserGetPayload<{
  include: {
    jobSeekerProfile: {
      include: {
        skills: true;
        projects: true;
        socials: true;
      };
    };
    resume: true;
  };
}>;

export interface JobSeekerProfileDetailsApiSuccessResponse {
  success: true;
  profile: ProfileWithRelations | null;
}

export interface JobSeekerProfileDetailsApiErrorResponse {
  success: false;
  error: string;
}

export type JobSeekerProfileDetailsApiResponse =
  | JobSeekerProfileDetailsApiSuccessResponse
  | JobSeekerProfileDetailsApiErrorResponse;

export async function GET(): Promise<
  NextResponse<JobSeekerProfileDetailsApiResponse>
> {
  const session = await getServerSession();

  if (!session?.user?.id) {
    return NextResponse.json(
      {
        success: false,
        error: "Authentication required",
      },
      { status: 401 },
    );
  }

  try {
    const profile = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        jobSeekerProfile: {
          include: {
            skills: true,
            projects: true,
            socials: true,
          },
        },
        resume: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        profile,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("GET /api/job-seeker/profile error:", {
      userId: session.user.id,
      error,
    });

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch job seeker profile details",
      },
      { status: 500 },
    );
  }
}

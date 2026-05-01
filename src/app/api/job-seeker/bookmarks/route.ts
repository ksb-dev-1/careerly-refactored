import { NextResponse } from "next/server";

import { getServerSession } from "@/lib/get-server-session";
import { prisma } from "@/lib/prisma";
import { JobListItem } from "@/types/api";

export interface BookmarksApiSuccessResponse {
  success: true;
  bookmarks: JobListItem[];
}

export interface BookmarksApiErrorResponse {
  success: false;
  error: string;
}

export type BookmarksApiResponse =
  | BookmarksApiSuccessResponse
  | BookmarksApiErrorResponse;

export async function GET(): Promise<NextResponse<BookmarksApiResponse>> {
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
    const bookmarks = await prisma.bookmark.findMany({
      where: {
        userId: session.user.id,
      },
      select: {
        job: {
          select: {
            id: true,
            companyLogo: true,
            companyName: true,
            role: true,

            skills: {
              select: {
                jobId: true,
                skillId: true,
                skill: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },

            jobType: true,
            jobMode: true,

            city: true,
            state: true,
            country: true,

            salaryMin: true,
            salaryMax: true,
            salaryPeriod: true,
            isSalaryVisible: true,
            currency: true,

            experienceMin: true,
            experienceMax: true,

            openings: true,
            jobStatus: true,
            isFeatured: true,

            createdAt: true,
            updatedAt: true,

            applications: {
              where: { userId: session.user.id },
              take: 1,
              select: {
                createdAt: true,
                applicationStatus: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const formattedJobs: JobListItem[] = bookmarks.map(({ job }) => {
      const application = job.applications[0];

      return {
        id: job.id,

        companyLogo: job.companyLogo,
        companyName: job.companyName,
        role: job.role,

        skills: job.skills,

        jobType: job.jobType,
        jobMode: job.jobMode,

        city: job.city,
        state: job.state,
        country: job.country,

        salaryMin: job.salaryMin,
        salaryMax: job.salaryMax,
        salaryPeriod: job.salaryPeriod,
        currency: job.currency,
        isSalaryVisible: job.isSalaryVisible,

        experienceMin: job.experienceMin,
        experienceMax: job.experienceMax,

        openings: job.openings,

        jobStatus: job.jobStatus,
        isFeatured: job.isFeatured,

        createdAt: job.createdAt,
        updatedAt: job.updatedAt,

        isBookmarked: true,
        appliedOn: application?.createdAt ?? null,
        applicationStatus: application?.applicationStatus ?? null,
      };
    });

    return NextResponse.json(
      {
        success: true,
        bookmarks: formattedJobs,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("❌ GET /api/job-seeker/bookmarks error:", {
      userId: session.user.id,
      error,
    });

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch bookmarks",
      },
      { status: 500 },
    );
  }
}

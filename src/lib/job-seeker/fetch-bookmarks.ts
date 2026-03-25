import { ApplicationStatus, Job } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { FetchBookmarksResponse } from "@/types";

export async function fetchBookmarks(
  jobSeekerId?: string,
): Promise<FetchBookmarksResponse> {
  console.log("🔵 DB HIT: fetching bookmarks");

  if (!jobSeekerId) {
    return {
      success: false,
      message: "You must sign in to access this page.",
      status: 401,
    };
  }

  try {
    const bookmarks = await prisma.bookmark.findMany({
      where: {
        userId: jobSeekerId,
      },
      select: {
        job: {
          select: {
            id: true,
            companyLogo: true,
            companyName: true,
            role: true,
            skills: {
              include: {
                skill: true,
              },
            },
            jobType: true,
            jobMode: true,
            location: true,
            salary: true,
            salaryPeriod: true,
            currency: true,
            experienceMin: true,
            experienceMax: true,
            openings: true,
            jobStatus: true,
            isFeatured: true,
            description: true,
            createdAt: true,
            updatedAt: true,
            applications: {
              where: { userId: jobSeekerId },
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
        createdAt: "asc",
      },
    });
    const bookmarksWithStatus = bookmarks.map((item) => {
      const application = item.job.applications[0] ?? null;

      return {
        ...item.job,
        isBookmarked: true,
        appliedOn: application?.createdAt ?? null,
        applicationStatus:
          application?.applicationStatus ?? ApplicationStatus.PENDING,
      };
    });

    return {
      success: true,
      bookmarks: bookmarksWithStatus,
    };
  } catch (error) {
    console.error("Failed to fetch bookmarks:", (error as Error).message);

    return {
      success: false,
      status: 500,
      message: (error as Error).message || "Internal Server Error",
    };
  }
}

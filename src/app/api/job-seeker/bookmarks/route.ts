import { NextResponse } from "next/server";

import { getServerSession } from "@/lib/get-server-session";
import { prisma } from "@/lib/prisma";
import { BookmarksApiResponse, JobListItem } from "@/types/api";

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
        createdAt: "asc",
      },
    });
    const formattedJobs: JobListItem[] = bookmarks.map(({ job }) => ({
      ...job,
      isBookmarked: true,
      appliedOn: job.applications[0]?.createdAt ?? null,
      applicationStatus: job.applications[0]?.applicationStatus ?? null,
    }));
    return NextResponse.json(
      {
        success: true,
        bookmarks: formattedJobs,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("GET /api/job-seeker/bookmarks error:", {
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
// -------------------------------------------------------------------------
// import { NextRequest, NextResponse } from "next/server";

// import { getServerSession } from "@/lib/get-server-session";
// import { fetchBookmarks } from "@/lib/job-seeker/fetch-bookmarks";
// import { BookmarksApiResponse } from "@/types/api";

// export async function GET(
//   request: NextRequest,
// ): Promise<NextResponse<BookmarksApiResponse>> {
//   const session = await getServerSession();

//   if (!session?.user?.id) {
//     return NextResponse.json(
//       { success: false, error: "Authentication required" },
//       { status: 401 },
//     );
//   }

//   try {
//     const bookmarks = await fetchBookmarks(session.user.id);

//     return NextResponse.json({ success: true, bookmarks }, { status: 200 });
//   } catch (error) {
//     console.error("GET /api/bookmarks error:", {
//       userId: session.user.id,
//       error,
//     });

//     return NextResponse.json(
//       { success: false, error: "Failed to fetch bookmarks" },
//       { status: 500 },
//     );
//   }
// }

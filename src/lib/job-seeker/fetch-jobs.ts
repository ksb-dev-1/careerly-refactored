import {
  ApplicationStatus,
  JobMode,
  JobStatus,
  JobType,
  Prisma,
} from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import {
  FetchJobsResponse,
  Filter,
  JobListItem,
  JobWithBookmarkAndAppliedStatus,
} from "@/types/index";

function parseJobTypes(values: string[] | undefined): JobType[] | undefined {
  if (!values) return undefined;
  //   const values = value.split(",").map((v) => v.trim());
  const valid = values.filter((v) =>
    Object.values(JobType).includes(v as JobType),
  ) as JobType[];
  return valid.length > 0 ? valid : undefined;
}

function parseJobModes(values: string[] | undefined): JobMode[] | undefined {
  if (!values) return undefined;
  //   const values = value.split(",").map((v) => v.trim());
  const valid = values.filter((v) =>
    Object.values(JobMode).includes(v as JobMode),
  ) as JobMode[];
  return valid.length > 0 ? valid : undefined;
}

export async function fetchJobs(
  jobSeekerId: string,
  filters: Filter,
): Promise<FetchJobsResponse> {
  console.log("🟢 DB HIT: fetching jobs");

  try {
    const page = Math.max(parseInt(filters.page ?? "1", 10) || 1, 1);
    const limit = Math.min(parseInt(filters.limit ?? "6", 10) || 10, 50);
    const search = filters.search;
    const jobTypes = parseJobTypes(filters.jobType);
    const jobModes = parseJobModes(filters.jobMode);
    const experience = filters.experience;

    const [expMinStr, expMaxStr] = (experience ?? "").split("-");
    const expMin = Number(expMinStr);
    const expMax = Number(expMaxStr);

    const hasExperience = !isNaN(expMin) && !isNaN(expMax);
    const skip = (page - 1) * limit;

    // ✅ Collect all conditions here
    const conditions: Prisma.JobWhereInput[] = [];

    // ✅ Base conditions
    conditions.push({
      isDeleted: false,
      jobStatus: JobStatus.OPEN,
    });

    // ✅ Search filter (FIXED)
    if (search?.trim()) {
      const searchTerm = search.trim();

      conditions.push({
        OR: [
          { role: { contains: searchTerm, mode: "insensitive" } },
          { companyName: { contains: searchTerm, mode: "insensitive" } },
          {
            skills: {
              some: {
                skill: {
                  name: {
                    contains: searchTerm,
                    mode: "insensitive",
                  },
                },
              },
            },
          },
        ],
      });
    }

    // ✅ Job Type filter
    if (jobTypes?.length) {
      conditions.push({
        jobType: { in: jobTypes },
      });
    }

    // ✅ Job Mode filter
    if (jobModes?.length) {
      conditions.push({
        jobMode: { in: jobModes },
      });
    }

    // ✅ Experience filter
    if (hasExperience) {
      conditions.push({
        AND: [
          {
            OR: [{ experienceMin: null }, { experienceMin: { lte: expMax } }],
          },
          {
            OR: [{ experienceMax: null }, { experienceMax: { gte: expMin } }],
          },
        ],
      });
    }

    // ✅ Final where
    const where: Prisma.JobWhereInput = {
      AND: conditions,
    };

    const [jobs, totalCount] = await Promise.all([
      prisma.job.findMany({
        where,
        orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
        skip,
        take: limit,

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

          bookmarks: {
            where: { userId: jobSeekerId },
            select: { id: true },
          },

          applications: {
            where: { userId: jobSeekerId },
            take: 1,
            select: {
              createdAt: true,
              applicationStatus: true,
            },
          },
        },
      }),

      prisma.job.count({ where }),
    ]);

    const formattedJobs: JobWithBookmarkAndAppliedStatus[] = jobs.map(
      ({ bookmarks, applications, ...job }) => ({
        ...job,
        isBookmarked: bookmarks.length > 0,
        appliedOn: applications[0]?.createdAt ?? null,
        applicationStatus: applications[0]?.applicationStatus ?? null,
      }),
    );

    const totalPages = Math.ceil(totalCount / limit);

    return {
      success: true,
      jobs: formattedJobs,
      totalCount,
      totalPages,
    };
  } catch (error) {
    console.error("GET /api/jobs error:", { userId: jobSeekerId, error });

    return {
      success: false,
      status: 500,
      message: "Server Error",
    };
  }
}

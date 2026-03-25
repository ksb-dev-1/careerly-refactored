import {
  ApplicationStatus,
  Currency,
  JobMode,
  JobStatus,
  JobType,
  SalaryPeriod,
} from "@/generated/prisma/browser";

export type Skill = {
  id: string;
  name: string;
};

export type JobSkill = {
  jobId: string;
  skillId: string;
  skill: Skill;
};

export type JobListItem = {
  id: string;
  companyLogo: string | null;
  companyName: string;
  role: string;
  skills: JobSkill[];
  jobType: JobType;
  jobMode: JobMode;
  location: string;
  salary: number;
  salaryPeriod: SalaryPeriod;
  currency: Currency;
  experienceMin: number | null;
  experienceMax: number | null;
  openings: number;
  jobStatus: JobStatus;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
  isBookmarked: boolean;
  appliedOn: Date | null;
  applicationStatus: ApplicationStatus | null;
};

export type JobWithBookmarkAndAppliedStatus = JobListItem & {
  isBookmarked: boolean;
  applicationStatus: ApplicationStatus;
  appliedOn: Date | null;
};

export type FetchJobsSuccess = {
  success: true;
  jobs: JobWithBookmarkAndAppliedStatus[];
  totalCount: number;
  totalPages: number;
};

export type FetchJobsError = {
  success: false;
  status: 401 | 500;
  message: string;
};

export type FetchJobsResponse = FetchJobsSuccess | FetchJobsError;

export type Filter = {
  page?: string;
  limit?: string;
  search?: string;
  jobType?: string[];
  jobMode?: string[];
  experience?: string;
};

export type BookmarkWithAppliedStatus = JobListItem & {
  isBookmarked: boolean;
  applicationStatus: ApplicationStatus;
  appliedOn: Date | null;
};

export type FetchBookmarkSuccess = {
  success: true;
  bookmarks: BookmarkWithAppliedStatus[];
};

export type FetchBookmarkError = {
  success: false;
  status: 401 | 500;
  message: string;
};

export type FetchBookmarksResponse = FetchBookmarkSuccess | FetchBookmarkError;

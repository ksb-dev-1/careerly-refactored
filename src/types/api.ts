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

  city: string | null;
  state: string | null;
  country: string | null;

  salaryMin: number;
  salaryMax: number;
  salaryPeriod: SalaryPeriod;
  currency: Currency;
  isSalaryVisible: boolean;

  experienceMin: number | null;
  experienceMax: number | null;

  openings: number;

  jobStatus: JobStatus;
  isFeatured: boolean;

  createdAt: Date;
  updatedAt: Date;

  // user-specific
  isBookmarked: boolean;
  appliedOn: Date | null;
  applicationStatus: ApplicationStatus | null;
};

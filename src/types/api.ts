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
  skills: { skill: { id: string; name: string } }[];
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

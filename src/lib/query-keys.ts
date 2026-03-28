export const queryKeys = {
  jobs: (filters: Record<string, string | null>, jobSeekerId?: string) => [
    "jobs",
    filters.page,
    filters.limit,
    filters.jobType,
    filters.jobMode,
    filters.experience,
    filters.search,
    jobSeekerId,
  ],
  bookmarks: (jobSeekerId?: string) => ["bookmarks", jobSeekerId],
  appliedJobs: (jobSeekerId?: string) => ["appliedJobs", jobSeekerId],
  profile: (jobSeekerId?: string) => ["job-seeker-profile", jobSeekerId],
};

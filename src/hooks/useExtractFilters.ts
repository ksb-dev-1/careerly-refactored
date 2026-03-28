"use client";

import { useSearchParams } from "next/navigation";

export function useExtractJobFilters() {
  const searchParams = useSearchParams();

  const search = searchParams.get("search") || "";
  const experience = searchParams.get("experience") || "";
  const jobType = searchParams.get("jobType")?.split(",") || [];
  const jobMode = searchParams.get("jobMode")?.split(",") || [];

  const isFilterApplied =
    Boolean(search) ||
    Boolean(experience) ||
    jobType.length > 0 ||
    jobMode.length > 0;

  return {
    search,
    experience,
    jobType,
    jobMode,
    isFilterApplied,
  };
}

"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { X } from "lucide-react";

export function ActiveFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const search = searchParams.get("search") || "";
  const experience = searchParams.get("experience") || "";

  const jobType = searchParams.get("jobType")?.split(",") || [];
  const jobMode = searchParams.get("jobMode")?.split(",") || [];

  const removeFilter = (key: string, value?: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      // For multi-value filters
      const values = params.get(key)?.split(",") || [];
      const updated = values.filter((v) => v !== value);

      if (updated.length > 0) {
        params.set(key, updated.join(","));
      } else {
        params.delete(key);
      }
    } else {
      // For single-value filters
      params.delete(key);
    }

    router.push(`/jobs?${params.toString()}`);
  };

  return (
    <div className="flex gap-2 flex-wrap">
      {/* Search */}
      {search && (
        <FilterChip
          label={`${search}`}
          onRemove={() => removeFilter("search")}
        />
      )}

      {/* Experience */}
      {experience && (
        <FilterChip
          label={`Exp: ${experience}`}
          onRemove={() => removeFilter("experience")}
        />
      )}

      {/* Job Type */}
      {jobType.map((type) => (
        <FilterChip
          key={type}
          label={type}
          onRemove={() => removeFilter("jobType", type)}
        />
      ))}

      {/* Job Mode */}
      {jobMode.map((mode) => (
        <FilterChip
          key={mode}
          label={mode}
          onRemove={() => removeFilter("jobMode", mode)}
        />
      ))}
    </div>
  );
}

function FilterChip({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) {
  return (
    <div className="flex items-center gap-2 border px-3 py-1 rounded-full text-sm text-gray-600 dark:text-muted-foreground shadow-sm">
      <span>{label}</span>
      <X
        size={16}
        onClick={onRemove}
        className="text-red-500 hover:text-red-400 cursor-pointer"
      />
    </div>
  );
}

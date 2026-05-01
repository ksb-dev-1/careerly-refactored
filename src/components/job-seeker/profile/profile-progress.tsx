import { JobSeekerProfileDetailsApiSuccessResponse } from "@/app/api/job-seeker/profile/route";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Profile = JobSeekerProfileDetailsApiSuccessResponse["profile"];

/* ✅ Safe field validator */
function isFieldFilled(value: unknown) {
  if (value === undefined || value === null) return false;

  if (typeof value === "string") {
    return value.trim() !== "";
  }

  if (typeof value === "number") {
    return true;
  }

  if (Array.isArray(value)) {
    return value.length > 0;
  }

  return Boolean(value);
}

function calculateProfileCompletion(profile: Profile) {
  const { name, email, image, jobSeekerProfile, resume } = profile;

  const location = [
    jobSeekerProfile?.city,
    jobSeekerProfile?.state,
    jobSeekerProfile?.country,
  ]
    .filter(Boolean)
    .join(", ");

  const fields = [
    { label: "Name", value: name },
    { label: "Email", value: email },
    { label: "Profile Image", value: image },
    {
      label: "Experience",
      value: jobSeekerProfile?.experience,
    },
    {
      label: "Skills",
      value: jobSeekerProfile?.skills?.length,
    },
    {
      label: "Projects",
      value: jobSeekerProfile?.projects?.length,
    },
    {
      label: "Social Links",
      value: jobSeekerProfile?.socials?.length,
    },
    {
      label: "Resume",
      value: resume?.url,
    },
    {
      label: "Location",
      value: location,
    },
    {
      label: "About",
      value: jobSeekerProfile?.about,
    },
  ];

  const filledFields = fields.filter((field) => isFieldFilled(field.value));

  const missingFields = fields
    .filter((field) => !isFieldFilled(field.value))
    .map((field) => field.label);

  const completion = Math.round((filledFields.length / fields.length) * 100);

  return { completion, missingFields };
}

export function ProfileProgress({ profile }: { profile: Profile }) {
  const { completion, missingFields } = calculateProfileCompletion(profile);

  return (
    <Card className="relative w-full shadow-sm">
      <CardHeader>
        <CardTitle className="font-bold">Profile Progress</CardTitle>
        <CardDescription>
          A stronger profile increases your chances of getting hired.
        </CardDescription>
      </CardHeader>

      <CardContent>
        {/* Progress header */}
        <div className="flex justify-between items-center mb-1">
          <span />
          <span className="font-semibold">{completion}%</span>
        </div>

        {/* Progress bar */}
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              completion === 100
                ? "bg-green-600"
                : completion > 70
                  ? "bg-orange-500"
                  : completion > 30
                    ? "bg-yellow-500"
                    : "bg-red-500"
            }`}
            style={{ width: `${completion}%` }}
          />
        </div>

        {/* Missing fields */}
        <div className={completion !== 100 ? "mt-8" : ""}>
          {completion === 100 ? (
            <p className="text-xs text-brand mt-2">
              Your profile is complete and visible to candidates
            </p>
          ) : (
            <div>
              <p className="text-sm">
                Provide the following fields to complete your profile
              </p>

              <div className="flex items-center flex-wrap gap-2 mt-4">
                {missingFields.map((field) => (
                  <Badge
                    key={field}
                    variant="secondary"
                    className="text-gray-600 dark:text-muted-foreground"
                  >
                    {field}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

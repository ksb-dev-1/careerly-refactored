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

function calculateProfileCompletion(profile: Profile) {
  const { name, email, image, jobSeekerProfile, resume } = profile;

  const fields = [
    { key: "name", label: "Name", value: name },
    { key: "email", label: "Email", value: email },
    {
      key: "profileImage",
      label: "Profile Image",
      value: image,
    },
    {
      key: "experience",
      label: "Experience",
      value: jobSeekerProfile?.experience,
    },
    {
      key: "skills",
      label: "Skills",
      value: jobSeekerProfile?.skills?.length,
    },
    {
      key: "projects",
      label: "Projects",
      value: jobSeekerProfile?.projects?.length,
    },
    {
      key: "socials",
      label: "Social Links",
      value: jobSeekerProfile?.socials?.length,
    },
    {
      key: "resume",
      label: "Resume",
      value: resume?.url,
    },
    {
      key: "location",
      label: "Location",
      value: jobSeekerProfile?.location,
    },
    {
      key: "about",
      label: "About",
      value: jobSeekerProfile?.about,
    },
  ];

  const filledFields = fields.filter(
    (field) =>
      field.value !== undefined &&
      field.value !== null &&
      field.value.toString().trim() !== "",
  );

  const missingFields = fields.filter(
    (field) =>
      field.value === undefined ||
      field.value === null ||
      field.value.toString().trim() === "",
  );

  const completion = Math.round((filledFields.length / fields.length) * 100);

  return {
    completion,
    missingFields: missingFields.map((f) => f.label),
  };
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
        <div className="flex justify-between items-center mb-1">
          <span />
          <span className="font-semibold">{completion}%</span>
        </div>

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

        <div className={`${completion !== 100 ? "mt-8" : ""}`}>
          {completion === 100 ? (
            <p className="text-xs text-brand mt-2">
              Your profile is complete and visible to candidates
            </p>
          ) : (
            <div>
              <p className="text-sm">
                Provide follwing fields to complete your profile
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

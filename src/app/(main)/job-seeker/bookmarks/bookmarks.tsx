import { formatDistanceToNowStrict } from "date-fns";
import { DollarSign, Euro, IndianRupeeIcon } from "lucide-react";
import {
  BriefcaseBusiness,
  Building,
  Building2,
  Calendar,
  Layers,
  MapPin,
  Timer,
} from "lucide-react";
import { FaStar } from "react-icons/fa";

import { BookmarkButton } from "@/components/bookmark-button";
import { CustomLink } from "@/components/custom-link";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Currency, JobMode, JobType } from "@/generated/prisma/enums";
import { BookmarkWithAppliedStatus, JobListItem } from "@/types";

export function getCurrencyIcon(currency: Currency): React.ReactNode {
  switch (currency) {
    case Currency.INR:
      return <IndianRupeeIcon size={16} />;
    case Currency.EUR:
      return <Euro size={16} />;
    default:
      return <DollarSign size={16} />;
  }
}

export function formatMoney(
  amount: number,
  currency: Currency = Currency.INR,
  locale?: string,
) {
  // Default locale for each currency
  const currencyLocales: Record<string, string> = {
    USD: "en-US",
    INR: "en-IN",
    EUR: "de-DE",
  };

  // If locale is not provided, use the default locale for that currency
  const selectedLocale = locale || currencyLocales[currency];

  // Create a number formatter for currency
  const formatter = new Intl.NumberFormat(selectedLocale, {
    style: "decimal",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  // Format the amount and return it
  return formatter.format(amount);
}

export function formatEnums(value: JobType | JobMode): string {
  return value
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function relativeDate(from: Date) {
  return formatDistanceToNowStrict(from, { addSuffix: true });
}

function JobCard({ job }: { job: JobListItem }) {
  const {
    id,
    companyName,
    role,
    skills,
    isFeatured,
    isBookmarked,
    jobMode,
    jobType,
    salary,
    currency,
    experienceMin,
    experienceMax,
    appliedOn,
    location,
    createdAt,
  } = job;

  return (
    <div className="relative">
      <CustomLink href={`/job-seeker/jobs/${id}`}>
        <Card className="py-4! sm:py-6! gap-0!">
          <CardHeader className="px-4! sm:px-6!">
            <div className="flex items-start gap-4">
              <div className="hidden sm:flex items-center justify-center h-12 w-12 bg-brand/10 text-brand border border-brand/20 rounded-lg">
                <Building2 size={20} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <CardTitle className="font-bold">{role}</CardTitle>
                  {appliedOn && <Badge>Applied</Badge>}
                </div>
                <CardDescription className="mt-1 flex items-center gap-2 text-brand font-bold">
                  {companyName}
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="px-4! sm:px-6!">
            <div className="mt-4 flex items-center flex-wrap gap-3 text-gray-600 dark:text-muted-foreground">
              <Layers size={16} />
              {skills.slice(0, 3).map((js, index) => (
                <span key={js.skillId} className="flex items-center gap-2">
                  <span className="capitalize text-sm font-medium">
                    {js.skill.name}
                  </span>

                  {index < Math.min(skills.length, 3) - 1 && (
                    <span className="h-1 w-1 rounded-full bg-gray-600 dark:bg-muted-foreground"></span>
                  )}
                </span>
              ))}

              {skills.length > 3 && (
                <span className="text-sm font-medium">
                  +{skills.length - 3}
                </span>
              )}
            </div>

            <div className="mt-6 flex items-center flex-wrap gap-2 sm:gap-3 text-gray-700 dark:text-muted-foreground">
              <Badge variant="secondary">
                <BriefcaseBusiness />
                {experienceMin}-{experienceMax} years
              </Badge>
              <Badge variant="secondary">
                <Timer />
                {formatEnums(jobType)}
              </Badge>
              <Badge variant="secondary">
                <Building />
                {formatEnums(jobMode)}
              </Badge>
              <Badge variant="secondary">
                {getCurrencyIcon(currency)} {formatMoney(salary, currency)}
              </Badge>
              <Badge variant="secondary">
                <MapPin />
                {location}
              </Badge>
            </div>

            <span className="mt-6 text-muted-foreground flex items-center gap-1 text-xs">
              <Calendar size={12} /> {relativeDate(createdAt)}
            </span>
          </CardContent>
        </Card>
      </CustomLink>
      {isFeatured && (
        <span className="absolute top-0 right-0 px-2 py-1 flex items-center gap-1 text-xs rounded-tr-xl rounded-bl-xl bg-brand text-white dark:text-background">
          <FaStar className="h-3 w-3" />
          <span className="">Featured</span>
        </span>
      )}
      <BookmarkButton
        jobId={id}
        isBookmarked={isBookmarked}
        className="absolute right-4 sm:right-6 bottom-4 sm:bottom-6"
      />
    </div>
  );
}

export function Bookmarks({
  bookmarks,
}: {
  bookmarks: BookmarkWithAppliedStatus[];
}) {
  return (
    <div className="grid gap-6">
      {bookmarks.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}

"use client";

import { formatDistanceToNowStrict } from "date-fns";
import { DollarSign, Euro, IndianRupeeIcon } from "lucide-react";
import {
  BriefcaseBusiness,
  Building,
  Building2,
  Layers,
  MapPin,
  Timer,
} from "lucide-react";
import { FaStar } from "react-icons/fa";

import { CustomLink } from "@/components/custom-link";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Currency, JobMode, JobType } from "@/generated/prisma/browser";
import { JobListItem } from "@/types/api";

import { BookmarkButton } from "./bookmark-button";

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
  if (!value) return "";

  return value
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function relativeDate(from: Date) {
  return formatDistanceToNowStrict(from, { addSuffix: true });
}

export function JobCard({ job }: { job: JobListItem }) {
  const {
    id,
    companyName,
    role,
    skills,
    isFeatured,
    isBookmarked,
    jobMode,
    jobType,
    salaryMin,
    salaryMax,
    currency,
    experienceMin,
    experienceMax,
    appliedOn,
    city,
    state,
    country,
    createdAt,
  } = job;

  return (
    <div className="relative">
      <CustomLink href={`/job-seeker/jobs/${id}`}>
        <Card className="hover:outline hover:outline-brand">
          <CardHeader className="border-b">
            <div className="flex items-start gap-4">
              <div className="hidden sm:flex items-center justify-center h-12 w-12 bg-muted rounded-lg border">
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

          <CardContent>
            <div className="max-w-xl grid grid-cols-2 sm:grid-cols-4 gap-2 text-gray-700 dark:text-gray-300">
              <span className="flex items-center gap-2">
                <BriefcaseBusiness size={16} />
                {experienceMin}-{experienceMax} years
              </span>
              {/* <span className="flex items-center gap-2">
                {getCurrencyIcon(currency)} {formatMoney(salaryMin, currency)}
              </span> */}
              <span className="flex items-center gap-2">
                <Timer size={16} />
                {formatEnums(jobType)}
              </span>
              <span className="flex items-center gap-2">
                <Building size={16} />
                {formatEnums(jobMode)}
              </span>
            </div>

            <span className="mt-6 flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <MapPin size={16} />
              {city}, {state}, {country}
            </span>

            <div className="mt-6 flex items-center flex-wrap gap-3">
              {/* <Layers
                size={16}
                className="text-gray-600 dark:text-muted-foreground"
              /> */}
              {skills.slice(0, 3).map((item, index) => (
                <span key={item.skill.id} className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">
                    {item.skill.name}
                  </span>

                  {index < Math.min(skills.length, 3) - 1 && (
                    <span className="h-1 w-1 rounded-full bg-gray-600 dark:bg-muted-foreground"></span>
                  )}
                </span>
              ))}

              {skills.length > 4 && (
                <span className="text-xs font-medium text-gray-600 dark:text-muted-foreground">
                  +{skills.length - 4}
                </span>
              )}
            </div>
          </CardContent>

          <CardFooter className="h-[56.79px]">
            <div className="w-full flex items-center justify-between">
              <span className="text-xs">{relativeDate(createdAt)}</span>

              {isFeatured && (
                <span className="px-2 py-1 flex items-center gap-1 text-xs rounded-full bg-brand text-white dark:text-background">
                  <FaStar className="h-3 w-3" />
                  <span className="">Featured</span>
                </span>
              )}
            </div>
          </CardFooter>
        </Card>
      </CustomLink>
      <BookmarkButton
        jobId={id}
        isBookmarked={isBookmarked}
        className="absolute top-4 right-4"
      />
    </div>
  );
}

"use client";

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

import { Skeleton } from "../ui/skeleton";

export function JobCardSkeleton() {
  return (
    <div className="relative">
      <Card>
        <CardHeader className="border-b">
          <div className="flex items-start gap-4">
            <Skeleton className="hidden sm:flex h-12 w-12 rounded-lg border" />

            <div>
              <div className="flex items-center gap-2">
                <CardTitle className="font-bold">
                  <Skeleton className="w-50 text-transparent">Role</Skeleton>
                </CardTitle>
              </div>
              <CardDescription className="mt-1 font-bold">
                <Skeleton className="w-35 text-transparent">
                  Company Name
                </Skeleton>
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div>
            <Skeleton className="h-5 w-[70%]" />
            <Skeleton className="h-5 w-[50%] mt-4" />
          </div>
          <Skeleton className="h-5 w-[40%] mt-6" />
        </CardContent>

        <CardFooter className="h-[56.79px]">
          <div className="w-full flex items-center justify-between">
            <Skeleton className="h-4 w-12" />

            {/* {isFeatured && (
                <span className="px-2 py-1 flex items-center gap-1 text-xs rounded-full bg-brand text-white dark:text-background">
                  <FaStar className="h-3 w-3" />
                  <span className="">Featured</span>
                </span>
              )} */}
          </div>
        </CardFooter>
      </Card>

      <Skeleton className="h-8 w-8 rounded-lg absolute top-4 right-4" />
    </div>
  );
}

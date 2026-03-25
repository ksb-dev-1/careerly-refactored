"use client";

import { Card, CardContent, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export function JobCardSkeleton() {
  return (
    <div className="relative">
      <Card className="py-4! sm:py-6! gap-0!">
        <CardHeader className="px-4! sm:px-6!">
          <div className="flex items-start gap-4">
            <Skeleton className="hidden sm:flex h-12 w-12 text rounded-lg" />
            <div>
              <Skeleton className="font-bold text-transparent w-40 sm:w-60">
                Job Role
              </Skeleton>
              <Skeleton className="w-fit h-5 mt-2 text-transparent">
                Company Name
              </Skeleton>
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-4! sm:px-6!">
          <Skeleton className="w-[50%] h-[21.59px] mt-4 text-transparent">
            Metadata
          </Skeleton>
          <Skeleton className="w-[40%] mt-4 h-5 text-transparent">
            Skills
          </Skeleton>
          <Skeleton className="w-fit mt-6 h-[15.99px] text-transparent text-xs">
            Posten on
          </Skeleton>
        </CardContent>
      </Card>
      <Skeleton className="absolute right-4 sm:right-6 bottom-4 sm:bottom-6 w-8 h-8 rounded-md" />
    </div>
  );
}

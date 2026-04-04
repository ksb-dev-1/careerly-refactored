import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { JobListSkeleton } from "./job-list-skeleton";

export default function JobsPageSkeleton() {
  return (
    <div className="max-w-6xl w-full mx-auto flex items-start gap-6">
      <Card className="hidden md:flex max-w-80 w-full sticky top-24 shadow-sm">
        <CardHeader className="border-b">
          <CardTitle>
            <Skeleton className="h-6 w-[80%]" />
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col gap-2">
            <Skeleton className="h-5 w-[50%]" />
            <Skeleton className="h-5 w-[60%]" />
            <Skeleton className="h-5 w-[40%]" />
          </div>
        </CardContent>

        <CardFooter className="border-t">
          <Skeleton className="h-9 w-full" />
        </CardFooter>
      </Card>

      <div className="w-full">
        <div className="w-full flex flex-col gap-6">
          <JobListSkeleton />
        </div>
      </div>
    </div>
  );
}

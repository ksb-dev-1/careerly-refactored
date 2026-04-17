import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";

function UserDetailsSkeleton() {
  return (
    <Card className="relative w-full p-6 flex flex-col items-center md:items-start text-transparent min-h-48.5">
      <Skeleton className="relative w-20 h-20 rounded-full border flex items-center justify-center shadow-sm" />

      <div className="flex flex-col items-center md:items-start text-sm">
        <Skeleton className="w-fit text-center md:text-start capitalize font-bold">
          User Name
        </Skeleton>
        <Skeleton className="flex items-center gap-2 mt-2 text-center md:text-start">
          johndoe@gmail.com
        </Skeleton>
      </div>

      <Skeleton className="h-8 w-8 rounded-lg absolute top-4 right-4" />
    </Card>
  );
}

function QuickLinksSkeleton() {
  return (
    <Card className="w-full text-transparent min-h-[202.8px]">
      <CardHeader className="border-b">
        <CardTitle>
          <Skeleton className="h-5.5 font-bold">Quick Links</Skeleton>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        <Skeleton className="text-sm h-5 font-medium w-[65%]">
          Quick Link
        </Skeleton>
        <Skeleton className="text-sm h-5 font-medium w-[50%]">
          Quick Link
        </Skeleton>
        <Skeleton className="text-sm h-5 font-medium w-[40%]">
          Quick Link
        </Skeleton>
        <Skeleton className="text-sm h-5 font-medium w-[70%]">
          Quick Link
        </Skeleton>
      </CardContent>
    </Card>
  );
}

function ProfileProgressSkeleton() {
  return (
    <Card className="relative w-full text-transparent min-h-53.5">
      <CardHeader>
        <CardTitle>
          <Skeleton className="w-fit text-lg font-bold">
            Profile Progress
          </Skeleton>
        </CardTitle>
        <CardDescription>
          <Skeleton className="w-fit text-transparent">
            A stronger profile increases your chances of getting hired.
          </Skeleton>
        </CardDescription>
      </CardHeader>

      <CardContent className="mt-6">
        <Skeleton className="h-2 rounded-full" />

        <Skeleton className="h-5 my-4 w-[75%]" />

        <div className="flex items-center flex-wrap gap-2 mt-4">
          {[1, 2, 3, 4].map((num) => (
            <Skeleton
              key={num}
              className="w-20 px-2 py-0.5 rounded-full text-xs"
            >
              skill
            </Skeleton>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function MoreAboutJobSeekerSkeleton() {
  return (
    <Card className="w-full text-transparent">
      <CardHeader>
        <CardTitle>
          <Skeleton className="text-lg font-bold">More Details</Skeleton>
        </CardTitle>
      </CardHeader>

      <Separator />

      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <Skeleton className="w-fit flex items-center gap-2 text-sm font-semibold">
                Skills
              </Skeleton>

              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4].map((num) => (
                  <Skeleton key={num} className="px-2 py-0.5 rounded-full w-20">
                    skill
                  </Skeleton>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <Skeleton className="w-fit flex items-center gap-2 text-sm font-semibold">
                Experience
              </Skeleton>
              <Skeleton className="text-sm">2 years</Skeleton>
            </div>

            <div className="space-y-4">
              <Skeleton className="w-fit flex items-center gap-2 text-sm font-semibold">
                Location
              </Skeleton>
              <Skeleton className="text-sm">Seattle, USA</Skeleton>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <Skeleton className="w-fit text-sm font-semibold">
              Projects
            </Skeleton>

            <div className="space-y-1 text-sm">
              {[1, 2].map((num) => (
                <Skeleton key={num} className="w-28">
                  link
                </Skeleton>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Skeleton className="w-fit text-sm font-semibold">
              Projects
            </Skeleton>

            <div className="space-y-1 text-sm">
              {[1, 2].map((num) => (
                <Skeleton key={num} className="w-28">
                  link
                </Skeleton>
              ))}
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <Skeleton className="w-fit text-sm font-semibold">About</Skeleton>

            <Skeleton className="text-sm">Not provided</Skeleton>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function JobSeekerProfileDetailsSkeleton() {
  return (
    <div className="flex flex-col md:flex-row items-start gap-6 text-transparent">
      <div className="w-full md:w-100 space-y-6">
        <UserDetailsSkeleton />

        <div className="hidden md:flex">
          <QuickLinksSkeleton />
        </div>

        <div className="flex md:hidden">
          <ProfileProgressSkeleton />
        </div>
      </div>
      <div className="w-full space-y-6">
        <div className="hidden md:flex">
          <ProfileProgressSkeleton />
        </div>

        <MoreAboutJobSeekerSkeleton />

        <div className="flex md:hidden">
          <QuickLinksSkeleton />
        </div>
      </div>
    </div>
  );
}

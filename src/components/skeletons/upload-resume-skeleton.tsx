import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export function UploadResumeSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Skeleton className="text-lg font-bold h-6 w-30" />
          <Skeleton className="text-sm h-5 w-50 mt-1" />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative border-2 border-dashed rounded-xl h-40 flex items-center justify-center hover:bg-muted-foreground/10 dark:hover:bg-background/20">
          <div className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
          <div className="flex flex-col items-center p-4 text-center">
            <Skeleton className="text-lg font-bold h-6 w-60" />
            <Skeleton className="text-sm h-5 w-40 mt-1" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

import { Bookmark, BriefcaseBusiness, Edit, FileText } from "lucide-react";

import { CustomLink } from "@/components/custom-link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { JOB_SEEKER_ROUTES } from "@/lib/routes";

export function QuickLinks() {
  return (
    <Card className="w-full shadow-sm">
      <CardHeader className="border-b">
        <CardTitle className="font-bold">Quick Links</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        <CustomLink
          href={JOB_SEEKER_ROUTES.JOBS}
          className="flex items-center gap-2 text-sm rounded-md font-medium hover:text-brand"
        >
          <BriefcaseBusiness className="w-4 h-4" />
          Jobs
        </CustomLink>

        <CustomLink
          href={JOB_SEEKER_ROUTES.BOOKMARKS}
          className="flex items-center gap-2 text-sm rounded-md font-medium hover:text-brand"
        >
          <Bookmark className="w-4 h-4" />
          Saved
        </CustomLink>

        <CustomLink
          href={JOB_SEEKER_ROUTES.APPLICATIONS}
          className="flex items-center gap-2 text-sm rounded-md font-medium hover:text-brand"
        >
          <FileText className="w-4 h-4" />
          Applied
        </CustomLink>

        <CustomLink
          href={JOB_SEEKER_ROUTES.EDIT_PROFILE}
          className="flex items-center gap-2 text-sm rounded-md font-medium hover:text-brand"
        >
          <Edit className="w-4 h-4" />
          Edit Profile
        </CustomLink>
      </CardContent>
    </Card>
  );
}

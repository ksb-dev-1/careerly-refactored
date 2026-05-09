import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function MoreAboutJobSeeker() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-bold">More Details</CardTitle>
        <CardDescription>More information about job seeker</CardDescription>
      </CardHeader>
      <Separator />

      <CardContent>Content</CardContent>
    </Card>
  );
}

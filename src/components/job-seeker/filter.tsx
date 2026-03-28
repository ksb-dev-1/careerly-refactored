import { ListFilter } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function Filter() {
  return (
    <Card className="hidden md:flex max-w-70 w-full sticky top-24">
      <CardHeader className="border-b">
        <CardTitle>
          <p className="flex items-center gap-2">
            <ListFilter size={16} /> Filters
          </p>
        </CardTitle>
      </CardHeader>

      <CardContent>Options</CardContent>

      <CardFooter className="border-t">
        <Button variant="brand" className="w-full">
          Apply Filters
        </Button>
      </CardFooter>
    </Card>
  );
}

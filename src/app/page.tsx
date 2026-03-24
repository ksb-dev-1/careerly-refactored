import { CustomLink } from "@/components/custom-link";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/client-navigation-paths";
import { getServerSession } from "@/lib/get-server-session";

export default async function HomePage() {
  const session = await getServerSession();

  return (
    <div className="min-h-screen max-w-5xl w-full mx-auto pt-16 flex flex-col items-center">
      <p className="text-3xl font-bold">Better Auth Tutorial</p>
      {session?.user && (
        <Button asChild>
          <CustomLink href={ROUTES.DASHBOARD} className="mt-4">
            Go to Dashboard
          </CustomLink>
        </Button>
      )}
    </div>
  );
}

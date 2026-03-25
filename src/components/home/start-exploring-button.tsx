import { CustomLink } from "@/components/custom-link";
import { ROUTES } from "@/lib/routes";

export function StartExploringButton() {
  return (
    <div className="flex items-center">
      <CustomLink
        href={ROUTES.SIGN_IN}
        className="bg-brand font-semibold shadow-md rounded-full px-6 py-4 hover:bg-brand-hover transition text-white dark:text-background"
        prefetch
      >
        Start Exploring
      </CustomLink>
    </div>
  );
}

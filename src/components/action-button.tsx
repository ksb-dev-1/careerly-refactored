import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { Spinner } from "./spinner";

interface ActionButtonProps extends React.ComponentProps<typeof Button> {
  loading: boolean;
}

export function ActionButton({
  loading,
  disabled,
  children,
  className,

  ...props
}: ActionButtonProps) {
  return (
    <Button
      variant="brand"
      disabled={loading || disabled}
      className={cn("font-semibold", className)}
      {...props}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          {children}
          <Spinner color="text-white dark:text-background" />
        </span>
      ) : (
        children
      )}
    </Button>
  );
}

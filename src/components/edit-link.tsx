"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { SquarePen } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "./ui/button";

export function EditLink({
  href,
  className,
}: {
  href: string;
  className?: string;
}) {
  const pathname = usePathname();

  return (
    <Button
      asChild
      size="icon"
      className={cn("bg-brand/10 text-brand hover:bg-brand/20!", className)}
      aria-label="edit-link"
    >
      <Link href={`${href}?callbackUrl=${encodeURIComponent(pathname)}`}>
        <SquarePen />
      </Link>
    </Button>
  );
}

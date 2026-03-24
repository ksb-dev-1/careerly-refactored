"use client";

import { authClient } from "@/lib/auth-client";

import { CustomLink } from "./custom-link";
import { ModeToggle } from "./mode-toggle";
import { ProfileDropdownMenu } from "./profile-dropdown";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

function NavbarLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-b h-16 w-full flex items-center justify-center">
      <nav className="flex items-center justify-between max-w-5xl w-full mx-auto px-2">
        <CustomLink href="/" className="font-bold">
          Home
        </CustomLink>
        <div className="flex items-center gap-2">
          <ModeToggle />
          {children}
        </div>
      </nav>
    </div>
  );
}

function NotSignedIn() {
  return (
    <Button asChild>
      <CustomLink href="/sign-in">Sign in</CustomLink>
    </Button>
  );
}

function SignedIn({ imageUrl }: { imageUrl: string | null | undefined }) {
  return <ProfileDropdownMenu image={imageUrl} />;
}

function Loading() {
  return <Skeleton className="h-9 w-9 rounded-full" />;
}

export function Navbar() {
  const { data: session, isPending } = authClient.useSession();

  let content;

  if (isPending) {
    content = <Loading />;
  } else if (session?.user?.id) {
    content = <SignedIn imageUrl={session.user.image} />;
  } else {
    content = <NotSignedIn />;
  }
  return <NavbarLayout>{content}</NavbarLayout>;
}

"use client";

import { useState } from "react";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import { LogOut, User } from "lucide-react";
import { toast } from "sonner";

import { UserRole } from "@/generated/prisma/browser";
import { authClient } from "@/lib/auth-client";
import { EMPLOYER_ROUTES, JOB_SEEKER_ROUTES, ROUTES } from "@/lib/routes";

import { CustomLink } from "../custom-link";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface ProfileDropdownProps {
  image?: string | null;
  role?: UserRole;
}

const AVATAR_SIZE = 32;

export function ProfileDropdownMenu({ image, role }: ProfileDropdownProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const path = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    setOpen(false);
    setIsSigningOut(true);

    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push(ROUTES.SIGN_IN);
            toast.success("Signed out successfully");
          },
          onError: (error) => {
            toast.error("Failed to sign out");
            console.error("Sign out error:", error);
          },
        },
      });
    } catch (error) {
      console.error("Sign out error:", error);
      toast.error("Failed to sign out. Please try again.");
    } finally {
      setIsSigningOut(false);
    }
  };

  let profileRoute;

  if (role === UserRole.JOB_SEEKER) {
    profileRoute = JOB_SEEKER_ROUTES.PROFILE();
  } else if (role === UserRole.EMPLOYER) {
    profileRoute = EMPLOYER_ROUTES.PROFILE;
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-full ml-2"
        aria-label="Open user menu"
      >
        <Avatar>
          {image ? (
            <Image
              src={image}
              alt="Profile picture"
              height={AVATAR_SIZE}
              width={AVATAR_SIZE}
              className="border rounded-full object-cover"
            />
          ) : (
            <AvatarFallback>
              <User size={16} aria-hidden="true" />
            </AvatarFallback>
          )}
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-36">
        <DropdownMenuLabel className="font-bold">My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {profileRoute && (
          <DropdownMenuItem asChild onClick={() => setOpen(false)}>
            <CustomLink
              href={profileRoute}
              className="cursor-pointer"
              prefetch={false}
              isActive={path === profileRoute}
            >
              <User className="mr-2 h-4 w-4" aria-hidden="true" />
              Profile
            </CustomLink>
          </DropdownMenuItem>
        )}

        <DropdownMenuItem
          disabled={isSigningOut}
          onClick={handleSignOut}
          className="cursor-pointer"
        >
          <LogOut className="mr-2 h-4 w-4" aria-hidden="true" />
          {isSigningOut ? "Signing out..." : "Sign out"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

"use client";

import { useState } from "react";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import { LogOut, User } from "lucide-react";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";
import { ROUTES } from "@/lib/client-navigation-paths";

import { Avatar, AvatarFallback } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface ProfileDropdownProps {
  image: string | null | undefined;
}

const AVATAR_SIZE = 36;

export function ProfileDropdownMenu({ image }: ProfileDropdownProps) {
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

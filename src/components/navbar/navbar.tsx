"use client";

import { Suspense, useState } from "react";

import { usePathname } from "next/navigation";

import {
  Bookmark,
  BriefcaseBusiness,
  FileText,
  LogOut,
  Menu,
  User,
} from "lucide-react";
import { LuFileCheck } from "react-icons/lu";
import { toast } from "sonner";

import { UserRole } from "@/generated/prisma/browser";
import { useAutoCloseOnGreaterThanOrEqualToBreakpoint } from "@/hooks/useAutoCloseModalOnBreakPoint";
import { Session as UserSession } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";
import { JOB_SEEKER_ROUTES } from "@/lib/routes";

import { CustomLink } from "../custom-link";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Skeleton } from "../ui/skeleton";
import { ProfileDropdownMenu } from "./profile-dropdown-menu";
import { ThemeSwitch } from "./theme-switch";
import { ThemeSwitchMobile } from "./theme-switch-mobile";

type Session = typeof authClient.$Infer.Session | null;

type NavItem = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

const JOB_SEEKER_NAV_ITEMS: NavItem[] = [
  {
    href: JOB_SEEKER_ROUTES.JOBS,
    label: "Jobs",
    icon: <BriefcaseBusiness size={16} />,
  },
  {
    href: JOB_SEEKER_ROUTES.BOOKMARKS,
    label: "Saved",
    icon: <Bookmark size={16} />,
  },
  {
    href: JOB_SEEKER_ROUTES.APPLICATIONS,
    label: "Applied",
    icon: <LuFileCheck size={16} />,
  },
];

const EMPLOYER_NAV_ITEMS: NavItem[] = [
  {
    href: "/employer/jobs?page=1",
    label: "Posted Jobs",
    icon: <BriefcaseBusiness size={16} />,
  },
];

function NavbarWrapper({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session;
}) {
  const path = usePathname();

  return (
    <header className="fixed z-20 top-0 left-0 right-0 w-full border-b h-16 flex items-center justify-center bg-background">
      <nav className="flex items-center justify-between max-w-7xl w-full px-4">
        <CustomLink
          href="/"
          className="font-extrabold text-xl text-brand hover:text-brand-hover transition-colors flex items-center gap-1"
          isActive={path === "/"}
        >
          Careerly
        </CustomLink>
        <Suspense>
          <SideMenu session={session} />
        </Suspense>
        {children}
      </nav>
    </header>
  );
}

function NavbarLoading({ session }: { session: Session }) {
  return (
    <NavbarWrapper session={session}>
      <div className="hidden md:flex items-center gap-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-20" />
        ))}
        <ThemeSwitch />
        <Skeleton className="h-9 w-9" />
      </div>
    </NavbarWrapper>
  );
}

function NavbarWithoutAuth({ session }: { session: Session }) {
  const path = usePathname();

  return (
    <NavbarWrapper session={session}>
      <div className="hidden md:flex items-center gap-3">
        <ThemeSwitch />
        <Button variant="brand">
          <CustomLink href="/sign-in" isActive={path === "/sign-in"}>
            Sign in
          </CustomLink>
        </Button>
      </div>
    </NavbarWrapper>
  );
}

function NavbarWithAuth({ session }: { session: UserSession }) {
  return (
    <NavbarWrapper session={session}>
      <div className="hidden md:flex items-center gap-3">
        <ThemeSwitch />
        <ProfileDropdownMenu
          image={session.user.image}
          role={session.user.role as UserRole}
        />
      </div>
    </NavbarWrapper>
  );
}

function JobSeekerNavbar({ session }: { session: UserSession }) {
  const path = usePathname();

  return (
    <NavbarWrapper session={session}>
      <div className="hidden md:flex items-center gap-3">
        {JOB_SEEKER_NAV_ITEMS.map(({ href, label, icon }) => {
          const isActive = path === href.split("?")[0];

          return (
            <Button
              key={href}
              asChild
              variant="ghost"
              className={`${isActive ? "text-brand hover:text-brand" : ""}`}
            >
              <CustomLink
                href={href}
                prefetch={true}
                isActive={isActive}
                className="font-semibold"
              >
                {label}
              </CustomLink>
            </Button>
          );
        })}

        <ThemeSwitch />
        <ProfileDropdownMenu
          image={session.user.image}
          role={session.user.role as UserRole}
        />
      </div>
    </NavbarWrapper>
  );
}

function EmployerNavbar({ session }: { session: UserSession }) {
  const path = usePathname();

  return (
    <NavbarWrapper session={session}>
      <div className="hidden md:flex items-center gap-3">
        {EMPLOYER_NAV_ITEMS.map(({ href, label, icon }) => {
          const isActive = path === href.split("?")[0];

          return (
            <Button
              key={href}
              asChild
              variant="ghost"
              className={`${isActive ? "text-brand hover:text-brand" : ""}`}
            >
              <CustomLink href={href} prefetch={false} isActive={isActive}>
                {label}
              </CustomLink>
            </Button>
          );
        })}
        <ThemeSwitch />
        <ProfileDropdownMenu
          image={session.user.image}
          role={session.user.role as UserRole}
        />
      </div>
    </NavbarWrapper>
  );
}

function SideMenu({ session }: { session: Session }) {
  const [isOpen, setIsOpen] = useState(false);
  const path = usePathname();

  useAutoCloseOnGreaterThanOrEqualToBreakpoint(isOpen, setIsOpen);

  const handleSignOut = async () => {
    setIsOpen(false);
    try {
      await authClient.signOut();
      toast.success("Signed out successfully");
    } catch {
      toast.error("Failed to sign out.");
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Menu className="md:hidden" />
      </SheetTrigger>

      <SheetContent side="left" className="w-60! gap-0 p-0!">
        <SheetHeader className="p-0!">
          <SheetTitle className="text-brand text-xl font-extrabold border-b h-16 p-4 flex items-center gap-1">
            Careerly
          </SheetTitle>
        </SheetHeader>

        <div className="h-full flex flex-col justify-between">
          <div className="flex flex-col px-4">
            {!session?.user.id && (
              <nav className="flex flex-col gap-1 mt-4">
                <Button
                  asChild
                  variant="brand"
                  className="justify-start w-fit"
                  onClick={() => setIsOpen(false)}
                >
                  <CustomLink href="/sign-in" isActive={path === "/sign-in"}>
                    Sign In
                  </CustomLink>
                </Button>
              </nav>
            )}

            {session?.user.role === UserRole.JOB_SEEKER && (
              <nav className="flex flex-col gap-1 mt-4">
                {JOB_SEEKER_NAV_ITEMS.map(({ href, label, icon }) => {
                  const isActive = path === href.split("?")[0];

                  return (
                    <CustomLink
                      href={href}
                      prefetch={false}
                      isActive={isActive}
                      onClick={() => setIsOpen(false)}
                      className={`${isActive ? "text-brand" : "hover:bg-muted"} flex items-center gap-2 rounded-lg p-2`}
                    >
                      {icon} {label}
                    </CustomLink>
                  );
                })}
              </nav>
            )}

            {session?.user.role === UserRole.EMPLOYER && (
              <nav className="flex flex-col gap-1 mt-4">
                {EMPLOYER_NAV_ITEMS.map(({ href, label, icon }) => {
                  const isActive = path === href.split("?")[0];

                  return (
                    <CustomLink
                      href={href}
                      prefetch={false}
                      isActive={isActive}
                      onClick={() => setIsOpen(false)}
                      className={`${isActive ? "text-brand" : "hover:bg-muted"} flex items-center gap-2 rounded-lg p-2`}
                    >
                      {icon} {label}
                    </CustomLink>
                  );
                })}
              </nav>
            )}

            {session?.user.role === UserRole.JOB_SEEKER && (
              <CustomLink
                href="/job-seeker/profile"
                prefetch={false}
                isActive={path === "/job-seeker/profile"}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 hover:bg-muted rounded-lg p-2"
              >
                <User size={16} aria-hidden="true" />
                Profile
              </CustomLink>
            )}

            {session?.user.role === UserRole.EMPLOYER && (
              <CustomLink
                href="/employer/profile"
                prefetch={false}
                isActive={path === "/employer/profile"}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 hover:bg-muted rounded-lg p-2"
              >
                <User size={16} aria-hidden="true" />
                Profile
              </CustomLink>
            )}

            {session?.user.id && (
              <button
                aria-label="sign-out"
                onClick={handleSignOut}
                className="flex items-center gap-2 hover:bg-muted rounded-lg p-2"
              >
                <LogOut className="h-4 w-4" aria-hidden="true" />
                Sign out
              </button>
            )}
          </div>
          <div className="p-2">
            <ThemeSwitchMobile />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export function Navbar() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) return <NavbarLoading session={session} />;

  if (session?.user?.role === UserRole.JOB_SEEKER)
    return <JobSeekerNavbar session={session} />;

  if (session?.user?.role === UserRole.EMPLOYER)
    return <EmployerNavbar session={session} />;

  if (session?.user?.id) return <NavbarWithAuth session={session} />;

  return <NavbarWithoutAuth session={session} />;
}

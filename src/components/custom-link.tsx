"use client";

import { MouseEvent, ReactNode } from "react";

import Link, { LinkProps } from "next/link";

import NProgress from "nprogress";

interface CustomLinkProps extends LinkProps {
  children: ReactNode;
  isActive?: boolean;
  className?: string;
}

let progressStarted = false;

export function CustomLink({
  children,
  isActive = false,
  onClick,
  ...props
}: CustomLinkProps) {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (isActive) return;

    const isRegularNavigation =
      !e.metaKey && !e.ctrlKey && !e.shiftKey && e.button === 0;

    const href = props.href.toString();

    const isExternal =
      href.startsWith("http") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:");

    if (isRegularNavigation && !isExternal) {
      NProgress.start();
      progressStarted = true;
    }

    onClick?.(e);
  };

  return (
    <Link {...props} onClick={handleClick}>
      {children}
    </Link>
  );
}

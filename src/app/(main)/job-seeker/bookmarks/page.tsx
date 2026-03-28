import { Metadata } from "next";

import { Bookmarks } from "./bookmarks";

export const metadata: Metadata = {
  title: "Bookmarks - Careerly",
  description: "View and manage all your bookmarks.",
};

export default function BookmarksPage() {
  return (
    <div className="min-h-screen max-w-custom w-full mx-auto mt-32 mb-16 px-4">
      <Bookmarks />
    </div>
  );
}

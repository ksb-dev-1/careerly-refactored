import { Metadata } from "next";

import { Applications } from "./applications";

export const metadata: Metadata = {
  title: "Applications - Careerly",
  description: "View all your applications.",
};

export default function ApplicationsPage() {
  return (
    <div className="min-h-screen max-w-custom w-full mx-auto mt-32 mb-16 px-4">
      <Applications />
    </div>
  );
}

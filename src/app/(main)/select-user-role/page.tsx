import { Metadata } from "next";

import { SelectUserRole } from "./select-user-role";

export const metadata: Metadata = {
  title: "Select Your Role",
  description:
    "Choose whether you want to continue as a Job Seeker or an Employer to get started.",
};

export default async function SelectRolePage() {
  return <SelectUserRole />;
}

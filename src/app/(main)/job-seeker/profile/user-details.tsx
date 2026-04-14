import Image from "next/image";

import { Mail, User } from "lucide-react";

import { EditLink } from "@/components/edit-link";
import { Card, CardTitle } from "@/components/ui/card";

interface UserDetailsProps {
  name: string | null | undefined;
  email: string;
  profileImage: string | null | undefined;
}

export function UserDetails({ name, email, profileImage }: UserDetailsProps) {
  return (
    <Card className="relative w-full p-6 flex flex-col items-center md:items-start shadow-sm">
      {profileImage ? (
        <div className="relative w-20 h-20 rounded-full border shadow-sm overflow-hidden">
          <Image
            src={profileImage}
            alt={name || "Profile"}
            fill
            className="object-cover"
            sizes="(max-width: 80px) 100vw, 80px"
            priority
          />
        </div>
      ) : (
        <div className="relative w-20 h-20 rounded-full border flex items-center justify-center shadow-sm">
          <User size={48} className="text-brand" />
        </div>
      )}

      <div>
        <CardTitle className="text-center md:text-start capitalize font-bold">
          {name || "Anonymous User"}
        </CardTitle>
        <p className="flex items-center gap-2 mt-2 text-muted-foreground text-center md:text-start">
          <Mail className="w-4 h-4" />
          <span className="text-sm">{email}</span>
        </p>
      </div>

      <EditLink
        href={`/job-seeker/profile/edit`}
        className="absolute top-4 right-4"
      />
    </Card>
  );
}

"use server";

import { UserRole } from "@/generated/prisma/client";
import { getServerSession } from "@/lib/get-server-session";
import { prisma } from "@/lib/prisma";

export type AssignUserRoleActionResponse = {
  success: boolean;
  status: number;
  user?: { id: string; role: UserRole };
  message?: string;
};

export async function assignUserRole(
  role: UserRole,
): Promise<AssignUserRoleActionResponse> {
  const session = await getServerSession();
  const userId = session?.user.id;

  try {
    if (!userId) {
      return {
        success: false,
        message: " You must sign in to access this page.",
        status: 401,
      };
    }

    if (
      ![UserRole.JOB_SEEKER, UserRole.EMPLOYER, UserRole.NOT_ASSIGNED].includes(
        role,
      )
    ) {
      return {
        success: false,
        status: 400,
        message: "Invalid role",
      };
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { role },
    });

    if (!updatedUser?.role) {
      return {
        success: false,
        status: 500,
        message: "Role update failed",
      };
    }

    return {
      success: true,
      status: 200,
      message: "Role assigned successfully",
      user: { id: updatedUser.id, role: updatedUser.role },
    };
  } catch (error) {
    console.error("❌ Error assigning role:", error);

    return {
      success: false,
      status: 500,
      message: "Something went wrong while assigning role",
    };
  }
}

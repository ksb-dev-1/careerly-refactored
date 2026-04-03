"use server";

import z from "zod";

import { prisma } from "@/lib/prisma";

export type ToggleBookmarkActionSuccess = {
  success: true;
  status: 200;
  message: string;
};

export type ToggleBookmarkActionError = {
  success: false;
  status: 400 | 401 | 500;
  message: string;
};

export type ToggleBookmarkActionResponse =
  | ToggleBookmarkActionSuccess
  | ToggleBookmarkActionError;

export async function ToggleBookmark(
  jobSeekerId: string,
  jobId: string,
): Promise<ToggleBookmarkActionResponse> {
  if (!jobSeekerId) {
    return {
      success: false,
      status: 401,
      message: "You must be signed in to access this page.",
    };
  }

  const idCheck = z.uuid().safeParse(jobId);

  if (!idCheck.success) {
    return {
      success: false,
      status: 400,
      message: "Invalid job ID format.",
    };
  }

  try {
    const existingBookmark = await prisma.bookmark.findUnique({
      where: {
        userId_jobId: { userId: jobSeekerId, jobId }, // uses your @@unique([userId, jobId])
      },
    });

    if (existingBookmark) {
      await prisma.bookmark.delete({
        where: {
          userId_jobId: { userId: jobSeekerId, jobId },
        },
      });

      return {
        success: true,
        status: 200,
        message: "Bookmark removed.",
      };
    }

    await prisma.bookmark.create({
      data: {
        userId: jobSeekerId,
        jobId,
      },
    });

    return {
      success: true,
      status: 200,
      message: "Bookmark added.",
    };
  } catch (error) {
    console.error("Failed to toggle bookmark", error);

    return {
      success: false,
      status: 500,
      message:
        (error as Error).message ||
        "Something went wrong while toggling the bookmark.",
    };
  }
}

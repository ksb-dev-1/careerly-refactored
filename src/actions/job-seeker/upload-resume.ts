"use server";

import { updateTag } from "next/cache";

import cloudinary from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";

export type UploadResumeSuccessResponse = {
  success: true;
  status: 200;
  message: string;
  data: {
    url: string;
    publicId: string;
    fileName: string;
    fileSize: number;
  };
};

export type UploadResumeErrorResponse = {
  success: false;
  status: 400 | 401 | 500 | 503;
  message: string;
  data: null;
};

export type UploadResumeResponse =
  | UploadResumeSuccessResponse
  | UploadResumeErrorResponse;

const ALLOWED_EXTENSIONS = ["pdf", "doc", "docx"];
const ALLOWED_MIME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

function sanitizeFileName(fileName: string) {
  return fileName
    .replace(/[<>:"/\\|?*]/g, "_")
    .replace(/\s+/g, "_")
    .slice(0, 255);
}

function validateFile(file: File) {
  const extension = file.name.split(".").pop()?.toLowerCase();

  if (!extension || !ALLOWED_EXTENSIONS.includes(extension)) {
    return "Invalid file extension";
  }

  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    return "Invalid file type";
  }

  if (file.size > MAX_FILE_SIZE) {
    return "File too large (max 5MB)";
  }

  return null;
}

export async function uploadResume(
  userId: string,
  file: File,
): Promise<UploadResumeResponse> {
  try {
    if (!userId) {
      return {
        success: false,
        status: 401,
        message: "Unauthorized",
        data: null,
      };
    }

    if (!file) {
      return {
        success: false,
        status: 400,
        message: "File is required",
        data: null,
      };
    }

    const validationError = validateFile(file);
    if (validationError) {
      return {
        success: false,
        status: 400,
        message: validationError,
        data: null,
      };
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const cleanFileName = sanitizeFileName(file.name);

    const uploadResult = await new Promise<{
      secure_url: string;
      public_id: string;
    }>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "raw",
            folder: "careerly/job-seeker/resumes",
            filename_override: cleanFileName,
            use_filename: true,
            unique_filename: true,
          },
          (error, result) => {
            if (error) {
              reject(new Error("Cloudinary upload failed"));
            } else if (!result) {
              reject(new Error("Upload failed"));
            } else {
              resolve({
                secure_url: result.secure_url,
                public_id: result.public_id,
              });
            }
          },
        )
        .end(buffer);
    });

    const existingResume = await prisma.resume.findUnique({
      where: { userId },
      select: { publicId: true },
    });

    await prisma.resume.upsert({
      where: { userId },
      update: {
        url: uploadResult.secure_url,
        publicId: uploadResult.public_id,
        fileName: cleanFileName,
        fileSize: buffer.length,
      },
      create: {
        userId,
        url: uploadResult.secure_url,
        publicId: uploadResult.public_id,
        fileName: cleanFileName,
        fileSize: buffer.length,
      },
    });

    if (existingResume?.publicId) {
      cloudinary.uploader
        .destroy(existingResume.publicId, { resource_type: "raw" })
        .catch(() => {});
    }

    const applications = await prisma.jobApplication.findMany({
      where: { userId },
      select: {
        jobId: true,
        job: { select: { employerId: true } },
      },
    });

    applications.forEach((app) => {
      updateTag(`posted-job-details-${app.jobId}-${app.job.employerId}`);
    });

    updateTag(`job-details-${userId}`);
    updateTag(`job-seeker-profile-${userId}`);

    return {
      success: true,
      status: 200,
      message: "Resume uploaded successfully",
      data: {
        url: uploadResult.secure_url,
        publicId: uploadResult.public_id,
        fileName: cleanFileName,
        fileSize: buffer.length,
      },
    };
  } catch (error: unknown) {
    console.error("Upload error:", error);

    return {
      success: false,
      status: 500,
      message: "Something went wrong while uploading",
      data: null,
    };
  }
}

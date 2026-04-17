"use client";

import { useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  AlertCircle,
  Download,
  FileText,
  Loader2,
  Trash2,
  TriangleAlert,
} from "lucide-react";
import { toast } from "sonner";

import { uploadResume } from "@/actions/job-seeker/upload-resume";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Resume } from "@/generated/prisma/browser";
import { queryKeys } from "@/lib/query-keys";

import { Dropzone } from "./dropzone";

interface UploadResumeProps {
  userId: string;
  resume: Resume | null;
}

const formatFileSize = (bytes: number) =>
  bytes < 1024 * 1024
    ? `${(bytes / 1024).toFixed(2)} KB`
    : `${(bytes / (1024 * 1024)).toFixed(2)} MB`;

export function UploadResume({ userId, resume }: UploadResumeProps) {
  const [file, setFile] = useState<File | null>(null);
  const queryClient = useQueryClient();

  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: async (file: File) => {
      return uploadResume(userId, file);
    },

    onSuccess: (response) => {
      if (!response.success) {
        throw new Error(response.message);
      }

      toast.success("Resume uploaded successfully");
      setFile(null);

      queryClient.invalidateQueries({
        queryKey: queryKeys.profile(userId),
      });

      if (callbackUrl) {
        router.push(callbackUrl);
      }
    },

    onError: (err: Error) => {
      toast.error(err.message || "Upload failed. Please try again.");
    },
  });

  const handleFileSelect = (selectedFile: File | null) => {
    if (!selectedFile) return;
    setFile(selectedFile);
  };

  const handleUpload = () => {
    if (!file) return;
    mutate(file);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-bold">Upload Resume</CardTitle>
        <CardDescription>
          Upload your resume to apply for jobs (PDF, DOC, DOCX – Max 5MB)
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {resume && (
          <Alert>
            <AlertDescription>
              <div className="w-full flex justify-between items-center">
                <div>
                  <p className="font-medium text-brand">{resume.fileName}</p>
                  {resume.fileSize && (
                    <p className="text-xs">{formatFileSize(resume.fileSize)}</p>
                  )}
                </div>
                <Button
                  size="icon"
                  onClick={() => window.open(resume.url, "_blank")}
                  className="bg-brand/10 hover:bg-brand/20 border border-brand/20 text-brand"
                  aria-label="download resume"
                >
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {isError && (
          <Alert className="border-none bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-500">
            <AlertCircle />
            <AlertDescription>{(error as Error)?.message}</AlertDescription>
          </Alert>
        )}

        {resume && file && (
          <Alert className="border-none bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-500">
            <TriangleAlert />
            <AlertDescription>
              Your resume will be replaced with a new one
            </AlertDescription>
          </Alert>
        )}

        {!file && (
          <Dropzone
            onFileSelect={handleFileSelect}
            isPending={isPending}
            accept=".pdf,.doc,.docx"
            helperText="PDF, DOC, DOCX up to 5MB"
          />
        )}

        {file && !isPending && (
          <div className="border rounded-lg p-4 flex items-center gap-3">
            <FileText className="h-5 w-5 text-brand" />
            <div className="flex-1">
              <p className="text-sm font-medium">{file.name}</p>
              <p className="text-xs text-muted-foreground">
                {formatFileSize(file.size)}
              </p>
            </div>
            <Button
              size="icon"
              onClick={() => setFile(null)}
              className="border bg-red-100 text-red-600 hover:bg-red-200 border-red-300 dark:bg-red-950/40 dark:text-red-500 dark:hover:bg-red-950 dark:border-red-800"
              aria-label="remove selected file"
            >
              <Trash2 />
            </Button>
          </div>
        )}

        <Button
          onClick={handleUpload}
          disabled={!file || isPending}
          className="w-full bg-brand hover:bg-brand-hover"
        >
          {isPending ? (
            <>
              Uploading
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            </>
          ) : (
            "Upload Resume"
          )}
        </Button>
      </CardContent>
    </Card>
  );
}

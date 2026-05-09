import { Upload } from "lucide-react";

interface DropzoneProps {
  onFileSelect?: (file: File | null) => void;
  isPending?: boolean;
  fileName?: string;
  accept?: string;
  maxSize?: number; // MB
  label?: string;
  helperText?: string;
}

export function Dropzone({
  onFileSelect,
  isPending,
  fileName,
  accept = "*",
  maxSize = 5,
  label = "Drag and drop or click to select a file",
  helperText = "Max file size: 5MB",
}: DropzoneProps) {
  const handleFile = (file: File | null) => {
    if (!file) return;

    if (file.size > maxSize * 1024 * 1024) {
      alert("File too large");
      return;
    }

    onFileSelect?.(file);
  };

  return (
    <div
      className="relative border-2 border-dashed rounded-xl h-40 flex items-center justify-center hover:bg-muted-foreground/10 dark:hover:bg-background/20"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        handleFile(e.dataTransfer.files?.[0] || null);
      }}
    >
      <input
        type="file"
        accept={accept}
        disabled={isPending}
        onChange={(e) => handleFile(e.target.files?.[0] || null)}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />

      <div className="flex flex-col items-center p-4 text-center">
        <Upload className="text-3xl text-primary" />
        <p className="text-sm font-medium mt-2">{fileName || label}</p>
        <p className="text-sm text-gray-500 mt-1">{helperText}</p>
      </div>
    </div>
  );
}

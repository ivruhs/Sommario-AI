"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { forwardRef } from "react";
import { z } from "zod";
import { cn } from "../../lib/utils";
import { Loader2 } from "lucide-react";

export const schema = z.object({
  file: z
    .instanceof(File, { message: "Invalid File" })
    .refine(
      (file) => file.size <= 20 * 1024 * 1024,
      "File size must be less than 20MB"
    )
    .refine(
      (file) => file.type.startsWith("application/pdf"),
      "Only PDF files are allowed"
    ),
});

export const UploadFormInput = forwardRef<
  HTMLFormElement,
  {
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    isLoading: boolean;
  }
>(({ onSubmit, isLoading }, ref) => {
  return (
    <form ref={ref} className="flex flex-col gap-6" onSubmit={onSubmit}>
      <div className="flex justify-end items-center gap-1.5">
        <Input
          type="file"
          accept="application/pdf"
          id="file"
          name="file"
          required
          className={cn(isLoading && "cursor-not-allowed opacity-50")}
          disabled={isLoading}
        />
        <Button disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
            </>
          ) : (
            "Upload your PDF"
          )}
        </Button>
      </div>
    </form>
  );
});

UploadFormInput.displayName = "UploadFormInput";

export default UploadFormInput;

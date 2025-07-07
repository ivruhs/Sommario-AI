"use client";
import React from "react";

import UploadFormInput, { schema } from "@/components/upload/upload-form-input";
import { Schema, set } from "zod";
import { useUploadThing } from "@/utils/uploadthing";
import { Toaster, toast } from "@/components/ui/sonner";
import {
  generatePdfSummary,
  storePdfSummaryAction,
} from "@/actions/upload-actions";
import { useRouter } from "next/navigation";
import { fi } from "zod/v4/locales";
import LoadingSkeleton from "@/components/upload/loading-skeleton";

export default function UploadForm() {
  const formRef = React.useRef<HTMLFormElement>(null);

  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  const { startUpload, routeConfig } = useUploadThing("pdfUploader", {
    onClientUploadComplete: () => {
      console.log("uploaded successfully!");
    },
    onUploadError: (err) => {
      console.error("Error occured while uploading file", err);
      toast.error("Error uploading file", {
        description: <span className="text-gray-500">{err.message}</span>,
      });
    },
    onUploadBegin: (data) => {
      console.log("Upload started for file:", data);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here

    try {
      setIsLoading(true);
      const formData = new FormData(e.currentTarget);
      const file = formData.get("file") as File;

      //validating the fields

      const validatedFields = schema.safeParse({ file });

      if (!validatedFields.success) {
        toast.error("Something went wrong", {
          description: (
            <span className="text-gray-500">
              {validatedFields.error.flatten().fieldErrors.file?.[0] ??
                "Invalid file"}
            </span>
          ),
        });
        setIsLoading(false);

        return;
      }

      toast.info("📂 Uploading PDF...", {
        description: (
          <span className="text-gray-500">
            Please wait while we process your PDF.
          </span>
        ),
      });

      // console.log("Form submitted");
      //upload the file to uploadthing

      const uploadResponse = await startUpload([file]);
      if (!uploadResponse) {
        toast.error("Something went wrong", {
          description: (
            <span className="text-gray-500">
              Failed to upload the file. Please try again.
            </span>
          ),
        });
        setIsLoading(false);
        return;
      }
      toast.success("📄 Processing PDF", {
        description: (
          <span className="text-gray-500">
            Hang tight! Our AI is reading through your PDF! ✨
          </span>
        ),
      });

      //parse the pdf using lang chain

      const uploadFileUrl = uploadResponse[0].serverData.fileUrl;

      const result = await generatePdfSummary({
        fileUrl: uploadFileUrl,
        fileName: file.name,
      });

      const { data = null, message = null } = result || {};

      if (data) {
        let storeResult: any;
        setIsLoading(false);
        toast.success("📄 Saving PDF...", {
          description: (
            <span className="text-gray-500">
              Hang tight! Your PDF summary is being saved! ✨
            </span>
          ),
        });
        if (data.summary) {
          //save the summary to the database
          storeResult = await storePdfSummaryAction({
            summary: data.summary,
            fileUrl: uploadFileUrl,
            title: data.title,
            fileName: file.name,
          });
          toast.success("✅ PDF Summary saved successfully!", {
            description: (
              <span className="text-gray-500">
                Your PDF summary has been saved successfully. You can now view
                it in your dashboard.
              </span>
            ),
          });
          formRef.current?.reset();
          router.push(`/summaries/${storeResult.data.id}`);
          //todo: redirect to the [id] summary page
        }
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error occurred", error);
      formRef.current?.reset();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl">
      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-200 dark:border-gray-800" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-background px-3 text-muted-foreground text-sm">
            Upload PDF
          </span>
        </div>
      </div>

      <UploadFormInput
        isLoading={isLoading}
        ref={formRef}
        onSubmit={handleSubmit}
      />
      {isLoading && (
        <>
          <div className="relative">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className="w-full border-t border-gray-200 dark:border-gray-800" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-background px-3 text-muted-foreground text-sm">
                Processing
              </span>
            </div>
          </div>
          <LoadingSkeleton />
        </>
      )}
    </div>
  );
}

//4:21:58

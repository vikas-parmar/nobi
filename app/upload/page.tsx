"use client";

import Dropzone from "@/components/Dropzone";
import TiptapEditor from "@/components/TiptapEditor";
import { useAppStore } from "@/store/use-app-store";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import { useState } from "react";

export default function UploadPage() {
  const [content, setContent] = useState("");
  console.log(content)
  const {
    chunks,
    isUploading,
    uploadProgress,
    isSummarizing,
    setIsSummarizing,
    filename,
    fileType,
  } = useAppStore();

  const handleSummarize = async () => {
    if (chunks.length === 0) return;

    setIsSummarizing(true);
    try {
      const response = await fetch("/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chunks, filename, fileType }),
      });

      if (!response.ok) throw new Error("Summarization failed");

      const data = await response.json();
      setContent(data.content || "");
    } catch (error) {
      console.error(error);
    } finally {
      setIsSummarizing(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 container mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Upload & Summarize
        </h1>

        {!content && (
          <div className="space-y-8">
            <Dropzone />

            {isUploading && (
              <div className="max-w-xl mx-auto space-y-2">
                <Progress value={uploadProgress} />
                <p className="text-sm text-center text-gray-500">
                  Uploading and extracting text...
                </p>
              </div>
            )}

            {chunks.length > 0 && !isUploading && (
              <div className="text-center">
                <p className="mb-4 text-green-600 font-medium">
                  Successfully extracted {chunks.length} chunks from {filename}
                </p>
                <Button
                  onClick={handleSummarize}
                  disabled={isSummarizing}
                  size="lg"
                >
                  {isSummarizing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Summarizing...
                    </>
                  ) : (
                    "Generate Summary"
                  )}
                </Button>
              </div>
            )}
          </div>
        )}

        {content && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Summary for {filename}</h2>
              <Button
                variant="outline"
                onClick={() => window.location.reload()}
              >
                Upload New File
              </Button>
            </div>

            <TiptapEditor content={content} />
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

"use client";

import TiptapEditor from "@/components/TiptapEditor";
import { useAppStore } from "@/store/use-app-store";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import { useParams } from "next/navigation";
import useFetchSummary from "@/hooks/api/use-fetch-summary";
import { useEffect } from "react";
import Loading from "@/components/loading";

export default function SummaryDetails() {
  const { id } = useParams();
  const { data, isLoading } = useFetchSummary(id as string);

  if (isLoading) return <Loading />;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 container mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Summary for {data?.filename}
        </h1>

        <TiptapEditor content={data.content} />
      </div>
      <Footer />
    </div>
  );
}

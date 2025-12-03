import { useQuery } from "@tanstack/react-query";

export default function useFetchSummaries() {
  return useQuery({
    queryKey: ["summaries"],
    queryFn: async () => {
      const response = await fetch("/api/summaries");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });
}

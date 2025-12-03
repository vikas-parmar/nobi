import { useQuery } from "@tanstack/react-query";

export default function useFetchSummary(id: string) {
  return useQuery({
    queryKey: ["summaries", id],
    queryFn: async () => {
      const response = await fetch(`/api/summaries/${id}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });
}

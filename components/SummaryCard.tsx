import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Lightbulb, Quote } from "lucide-react";

interface SummaryCardProps {
  takeaways: string[];
  risks: string[];
  quotes: { text: string; page?: number }[];
}

export default function SummaryCard({ takeaways, risks, quotes }: SummaryCardProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-yellow-500" />
            Key Takeaways
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {takeaways.map((item, i) => (
              <li key={i} className="text-sm text-gray-700 list-disc list-inside">
                {item}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            Potential Risks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {risks.map((item, i) => (
              <li key={i} className="text-sm text-gray-700 list-disc list-inside">
                {item}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Quote className="w-5 h-5 text-blue-500" />
            Key Quotes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {quotes.map((item, i) => (
              <li key={i} className="text-sm text-gray-700 italic border-l-2 border-blue-200 pl-2">
                "{item.text}"
                {item.page && <span className="block text-xs text-gray-500 not-italic mt-1">Page {item.page}</span>}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

import { FileText, Shield, Zap } from "lucide-react";

export const cards = [
  {
    title: "Smart Extraction",
    description:
      "Accurately extracts text from PDF and DOCX files, preserving context and structure.",
    icon: <FileText className="w-6 h-6 text-blue-600" />,
    iconBg: "bg-blue-100",
  },
  {
    title: "Instant Summaries",
    description:
      "Powered by Gemini AI to generate concise summaries, facts, and actionable takeaways.",
    icon: <Zap className="w-6 h-6 text-yellow-600" />,
    iconBg: "bg-yellow-100",
  },
  {
    title: "Secure & Private",
    description:
      "Your documents are processed securely and stored with enterprise-grade encryption.",
    icon: <Shield className="w-6 h-6 text-green-600" />,
    iconBg: "bg-green-100",
  },
];

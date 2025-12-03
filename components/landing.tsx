import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText } from "lucide-react";
import { cards } from "@/lib/constants";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* <Navbar /> */}
      <nav className="border-b bg-white">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-xl text-primary"
          >
            <FileText className="w-6 h-6" />
            <span>Nobi</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/sign-up">
              <Button variant="outline">Register</Button>
            </Link>
            <Link href="/sign-in">
              <Button>Sign In</Button>
            </Link>
          </div>
        </div>
      </nav>
      <main className="flex-1">
        <section className="py-16 text-center space-y-6 px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900">
            Summarize Documents <br className="hidden md:block" />
            <span className="text-primary">in Seconds with AI</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Upload PDF or DOCX files and get instant, accurate summaries, key
            takeaways, and risk analysis using advanced Gemini AI.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/sign-up">
              <Button size="lg" className="gap-2">
                Get Started <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
          <div className="container max-w-7xl mx-auto px-4 pt-4 grid md:grid-cols-3 gap-8">
            {cards.map(({ title, description, icon, iconBg }, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-xl shadow-sm border flex items-center gap-4"
              >
                <div
                  className={`shrink-0 w-14 h-14 ${iconBg} rounded-lg flex items-center justify-center`}
                >
                  {icon}
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-bold mb-1">{title}</h3>
                  <p className="text-sm text-gray-600">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <footer className="py-6 border-t text-center text-gray-500 text-sm">
        © 2025 Nobi.ai. All rights reserved.
      </footer>
    </div>
  );
}

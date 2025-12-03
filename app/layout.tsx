import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "@/components/providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nobi - AI Document Summarizer",
  description: "Summarize your documents with the power of AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased min-h-screen bg-background font-sans`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

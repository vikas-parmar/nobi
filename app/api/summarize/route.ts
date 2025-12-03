import { NextRequest, NextResponse } from "next/server";
import { summarizeDocument } from "@/lib/gemini-adapter";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { documents, summaries } from "@/db/schema";

export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers, // correct for route handlers
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { chunks, filename, fileType } = await req.json();

    if (!chunks || !Array.isArray(chunks)) {
      return NextResponse.json({ error: "Invalid chunks" }, { status: 400 });
    }

    // Combine chunks into a single full text
    const fullText = chunks.join("\n\n");

    // Generate full <summary> .. </summary> body
    const content = await summarizeDocument(fullText);

    // Store document metadata
    const [doc] = await db
      .insert(documents)
      .values({
        userId: session.user.id,
        filename: filename || "Untitled",
        fileType: fileType || "unknown",
      })
      .returning();

    // Store summary in DB
    await db.insert(summaries).values({
      documentId: doc.id,
      content,
    });

    return NextResponse.json({ content });
  } catch (error) {
    console.error("Summarization error:", error);
    return NextResponse.json({ error: "Failed to summarize" }, { status: 500 });
  }
}

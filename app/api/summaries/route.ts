import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { documents, summaries } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(req: Request) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const rows = await db
      .select({
        summaryId: summaries.id,
        documentId: documents.id,
        filename: documents.filename,
        fileType: documents.fileType,
        uploadedAt: documents.uploadedAt,
        createdAt: summaries.createdAt,
      })
      .from(summaries)
      .innerJoin(documents, eq(documents.id, summaries.documentId))
      .where(eq(documents.userId, session.user.id))
      .orderBy(summaries.createdAt);

    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error fetching summaries:", error);
    return NextResponse.json(
      { error: "Failed to fetch summaries" },
      { status: 500 }
    );
  }
}

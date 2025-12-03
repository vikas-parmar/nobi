import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { documents, summaries } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id: summaryId } = await context.params; // 👈 FIX: await params

    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const row = await db
      .select({
        summaryId: summaries.id,
        content: summaries.content,
        documentId: documents.id,
        filename: documents.filename,
        fileType: documents.fileType,
        uploadedAt: documents.uploadedAt,
        createdAt: summaries.createdAt,
      })
      .from(summaries)
      .innerJoin(documents, eq(documents.id, summaries.documentId))
      .where(
        and(
          eq(summaries.id, summaryId),
          eq(documents.userId, session.user.id)
        )
      )
      .limit(1);

    if (!row || row.length === 0) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(row[0]);
  } catch (error) {
    console.error("Error fetching summary:", error);
    return NextResponse.json(
      { error: "Failed to fetch summary" },
      { status: 500 }
    );
  }
}

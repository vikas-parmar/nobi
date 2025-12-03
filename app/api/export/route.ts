import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

import htmlToDocx from "html-to-docx";
import TurndownService from "turndown";

export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { content, format, filename } = await req.json();

    if (!content || !format || !filename) {
      return NextResponse.json(
        { error: "Missing content, format or filename" },
        { status: 400 }
      );
    }

    // ------------------------------------------------------
    // DOCX EXPORT — convert HTML → DOCX
    // ------------------------------------------------------
    if (format === "docx") {
      const docxBuffer = await htmlToDocx(content, null, {
        table: { row: { cantSplit: true } },
      });

      return new NextResponse(docxBuffer as any, {
        headers: {
          "Content-Type":
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "Content-Disposition": `attachment; filename="${filename}.docx"`,
        },
      });
    }

    // ------------------------------------------------------
    // MARKDOWN EXPORT — convert HTML → MD using Turndown
    // ------------------------------------------------------
    if (format === "md") {
      const turndown = new TurndownService();
      const markdown = turndown.turndown(content);

      return new NextResponse(markdown, {
        headers: {
          "Content-Type": "text/markdown; charset=utf-8",
          "Content-Disposition": `attachment; filename="${filename}.md"`,
        },
      });
    }

    // ------------------------------------------------------
    // TXT EXPORT — strip HTML tags
    // ------------------------------------------------------
    if (format === "txt") {
      const text = content.replace(/<\/?[^>]+(>|$)/g, ""); // remove HTML tags

      return new NextResponse(text, {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Content-Disposition": `attachment; filename="${filename}.txt"`,
        },
      });
    }

    return NextResponse.json({ error: "Unknown format" }, { status: 400 });
  } catch (error) {
    console.error("Export error:", error);
    return NextResponse.json({ error: "Failed to export" }, { status: 500 });
  }
}

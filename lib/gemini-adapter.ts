import { generateText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";

export const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const MODEL = google("gemini-2.5-pro");

const SUMMARY_PROMPT = `
You are an expert summarizer.

Your output MUST be a single XML/HTML <summary> block.

Rules:
- The entire response must be inside <summary> ... </summary>.
- Use readable HTML tags: <h2>, <p>, <ul>, <li>, <blockquote>.
- Include these sections in order:
    <h2>Executive Summary</h2>
    <h2>Key Takeaways</h2>
    <h2>Risks</h2>
    <h2>Quotes</h2>
- For quotes, use <blockquote page="X">Quote here</blockquote>.
- No JSON.
- No backticks.
- No markdown.
- Do NOT escape HTML.
`;

/**
 * Returns a clean <summary>...</summary> body
 */
export async function summarizeDocument(fullText: string): Promise<string> {
  const prompt = `
${SUMMARY_PROMPT}

Document:
"""
${fullText}
"""
`;

  const { text } = await generateText({
    model: MODEL,
    prompt,
    temperature: 0.2,
  });

  return text.trim(); // already HTML/XML
}

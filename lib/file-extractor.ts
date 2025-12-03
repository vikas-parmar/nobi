import mammoth from "mammoth";
import PDFParser from "pdf2json";
import { promises as fs } from "fs";
import { v4 as uuidv4 } from "uuid";
import os from "os";
import path from "path";

export async function extractText(
  file: Buffer,
  fileType: "pdf" | "docx"
): Promise<string> {
  if (fileType === "pdf") {
    return await extractFromPDF(file);
  } else if (fileType === "docx") {
    const result = await mammoth.extractRawText({ buffer: file });
    return result.value ?? "";
  }
  throw new Error("Unsupported file type");
}

async function extractFromPDF(buffer: Buffer): Promise<string> {
  const fileName = uuidv4();

  // cross-platform tmp directory
  const tempPath = path.join(os.tmpdir(), `${fileName}.pdf`);

  // write file to OS temp directory
  await fs.writeFile(tempPath, buffer);

  return new Promise((resolve, reject) => {
    const pdfParser = new (PDFParser as any)(null, 1);

    pdfParser.on("pdfParser_dataError", (err: any) => {
      console.error("PDF parse error:", err.parserError);
      reject(err.parserError);
    });

    pdfParser.on("pdfParser_dataReady", () => {
      try {
        const text = (pdfParser as any).getRawTextContent() || "";
        resolve(text);
      } catch (e) {
        reject(e);
      }
    });

    pdfParser.loadPDF(tempPath);
  });
}

export function chunkText(text: string, chunkSize = 3000): string[] {
  const chunks: string[] = [];
  for (let i = 0; i < text.length; i += chunkSize) {
    chunks.push(text.slice(i, i + chunkSize));
  }
  return chunks;
}

import type { PDFDocumentProxy } from "pdfjs-dist";

export interface LoadedPdf {
  document: PDFDocumentProxy;
  pageCount: number;
}

export class PdfLoadError extends Error {
  constructor(message: string, public readonly cause?: unknown) {
    super(message);
    this.name = "PdfLoadError";
  }
}

async function getPdfjs() {
    return import("@/lib/worker/pdf-worker").then((module) => module.default);
  }

export async function loadPdfDocument(file: File): Promise<LoadedPdf> {
  if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
    throw new PdfLoadError("Selected file is not a PDF.");
  }

  let arrayBuffer: ArrayBuffer;
  try {
    arrayBuffer = await file.arrayBuffer();
  } catch (err) {
    throw new PdfLoadError("Unable to read file contents.", err);
  }

  if (arrayBuffer.byteLength === 0) {
    throw new PdfLoadError("File is empty.");
  }

  const pdfjs = await getPdfjs();

  try {
    const loadingTask = pdfjs.getDocument({ data: arrayBuffer });
    const document = await loadingTask.promise;
    return { document, pageCount: document.numPages };
  } catch (err) {
    console.error("REAL PDF ERROR:", err);
    throw new PdfLoadError("Failed to parse PDF. The file may be corrupted or encrypted.", err);
  }
}

export async function getPageCount(file: File): Promise<number> {
  const { document, pageCount } = await loadPdfDocument(file);
  await document.destroy();
  return pageCount;
}

export async function destroyPdfDocument(document: PDFDocumentProxy): Promise<void> {
  await document.destroy();
}
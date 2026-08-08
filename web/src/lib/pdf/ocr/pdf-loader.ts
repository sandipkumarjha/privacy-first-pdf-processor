import { GlobalWorkerOptions, getDocument, type PDFDocumentProxy } from "pdfjs-dist";

let workerConfigured = false;

/**
 * Configures the pdf.js worker using the modern module-worker approach
 * (no deprecated CDN string or legacy .entry import). Runs once per
 * session.
 */
function ensureWorkerConfigured(): void {
  if (workerConfigured) return;

  GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
  ).toString();

  workerConfigured = true;
}

export interface LoadedPdf {
  document: PDFDocumentProxy;
  arrayBuffer: ArrayBuffer;
}

/**
 * Reads an uploaded PDF File and loads it with pdfjs-dist, returning
 * both the parsed document proxy and the original bytes.
 */
export async function loadPdfDocument(file: File): Promise<LoadedPdf> {
  ensureWorkerConfigured();

  let arrayBuffer: ArrayBuffer;
  try {
    arrayBuffer = await file.arrayBuffer();
  } catch {
    throw new Error("Failed to load PDF.");
  }

  try {
    const data = new Uint8Array(arrayBuffer);
    const loadingTask = getDocument({ data });
    const document = await loadingTask.promise;

    return { document, arrayBuffer };
  } catch {
    throw new Error("Invalid or corrupted PDF.");
  }
}

export default loadPdfDocument;
import { PDFDocument } from "pdf-lib";

export class SplitEngineError extends Error {
  constructor(message: string, public readonly cause?: unknown) {
    super(message);
    this.name = "SplitEngineError";
  }
}

function sanitizeSelectedPages(selectedPages: number[]): number[] {
  const seen = new Set<number>();
  const result: number[] = [];

  for (const page of selectedPages) {
    if (!seen.has(page)) {
      seen.add(page);
      result.push(page);
    }
  }

  return result;
}

function validatePageNumbers(pageNumbers: number[], totalPages: number): void {
  const invalidPages = pageNumbers.filter(
    (page) => !Number.isInteger(page) || page < 1 || page > totalPages
  );

  if (invalidPages.length > 0) {
    throw new SplitEngineError(
      `Invalid page number(s): ${invalidPages.join(", ")}. Document has ${totalPages} page(s).`
    );
  }
}

export async function splitPdf(
  file: File,
  selectedPages: number[]
): Promise<Uint8Array> {
  const sanitizedPages = sanitizeSelectedPages(selectedPages);

  if (sanitizedPages.length === 0) {
    throw new SplitEngineError("No pages selected for splitting.");
  }

  let arrayBuffer: ArrayBuffer;
  try {
    arrayBuffer = await file.arrayBuffer();
  } catch (err) {
    throw new SplitEngineError("Unable to read file contents.", err);
  }

  let sourceDocument: PDFDocument;
  try {
    sourceDocument = await PDFDocument.load(arrayBuffer);
  } catch (err) {
    throw new SplitEngineError(
      "The PDF file appears to be corrupted or invalid.",
      err
    );
  }

  const totalPages = sourceDocument.getPageCount();
  validatePageNumbers(sanitizedPages, totalPages);

  const pageIndices = sanitizedPages.map((page) => page - 1);

  let outputDocument: PDFDocument;
  try {
    outputDocument = await PDFDocument.create();
    const copiedPages = await outputDocument.copyPages(sourceDocument, pageIndices);
    copiedPages.forEach((page) => outputDocument.addPage(page));
  } catch (err) {
    throw new SplitEngineError("Failed to build the split PDF document.", err);
  }

  try {
    return await outputDocument.save();
  } catch (err) {
    throw new SplitEngineError("Failed to save the generated PDF.", err);
  }
}
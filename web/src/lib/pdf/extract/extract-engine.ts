import { PDFDocument } from "pdf-lib";

/**
 * Options controlling which pages are extracted. `pageNumbers` is 1-based
 * and may be given in any order; the extracted pages are always appended
 * to the output in their original document order.
 */
export interface ExtractOptions {
  pageNumbers: number[];
}

export type ExtractEngineErrorCode =
  | "READ_FAILED"
  | "LOAD_FAILED"
  | "SAVE_FAILED"
  | "INVALID_PAGE_SELECTION";

export class ExtractEngineError extends Error {
  code: ExtractEngineErrorCode;

  constructor(code: ExtractEngineErrorCode, message: string) {
    super(message);
    this.name = "ExtractEngineError";
    this.code = code;
  }
}

/**
 * Extracts the selected pages of a PDF into a brand new PDF document.
 *
 * The original document is never modified. Only the requested pages are
 * copied into the new document — no rotation, compression, reordering
 * beyond restoring original page order, or metadata changes are applied.
 */
export async function extractPages(
  file: File,
  options: ExtractOptions
): Promise<Uint8Array> {
  let arrayBuffer: ArrayBuffer;
  try {
    arrayBuffer = await file.arrayBuffer();
  } catch {
    throw new ExtractEngineError(
      "READ_FAILED",
      `Failed to read "${file.name}".`
    );
  }

  let sourceDocument: PDFDocument;
  try {
    sourceDocument = await PDFDocument.load(arrayBuffer);
  } catch {
    throw new ExtractEngineError(
      "LOAD_FAILED",
      `Failed to load "${file.name}". The file may be corrupted or password-protected.`
    );
  }

  if (!options.pageNumbers || options.pageNumbers.length === 0) {
    throw new ExtractEngineError(
      "INVALID_PAGE_SELECTION",
      "At least one page must be selected for extraction."
    );
  }

  // Deduplicate and sort ascending so the extracted pages preserve their
  // original order in the source document, regardless of the order the
  // caller supplied them in. pageNumbers are 1-based; convert to the
  // zero-based indices copyPages() expects.
  const pageIndices = Array.from(new Set(options.pageNumbers))
    .sort((a, b) => a - b)
    .map((pageNumber) => pageNumber - 1);

  const extractedDocument = await PDFDocument.create();

  const copiedPages = await extractedDocument.copyPages(
    sourceDocument,
    pageIndices
  );

  copiedPages.forEach((page) => extractedDocument.addPage(page));

  try {
    return await extractedDocument.save();
  } catch {
    throw new ExtractEngineError(
      "SAVE_FAILED",
      `Failed to save the extracted PDF from "${file.name}".`
    );
  }
}

export default extractPages;
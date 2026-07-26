import { PDFDocument } from "pdf-lib";
import {
  calculateSavedBytes,
  calculateCompressionRatio,
} from "./compression-utils";


export type CompressionLevel = "low" | "medium" | "high";

export interface CompressionResult {
  bytes: Uint8Array;
  originalSize: number;
  compressedSize: number;
  savedBytes: number;
  compressionRatio: number;
}

export type CompressionEngineErrorCode =
  | "READ_FAILED"
  | "LOAD_FAILED"
  | "COPY_FAILED"
  | "SAVE_FAILED";

export class CompressionEngineError extends Error {
  code: CompressionEngineErrorCode;

  constructor(code: CompressionEngineErrorCode, message: string) {
    super(message);
    this.name = "CompressionEngineError";
    this.code = code;
  }
}


function stripMetadata(document: PDFDocument, level: CompressionLevel): void {
  const now = new Date();

  // Producer and Creator are always cleared: they only ever describe the
  // tool that generated the file and never carry meaningful user content.
  document.setProducer("");
  document.setCreator("");

  if (level === "low") {
    // Keep author-provided descriptive metadata intact.
    document.setModificationDate(now);
    return;
  }

  if (level === "medium") {
    document.setTitle("");
    document.setSubject("");
    document.setKeywords([]);
    document.setModificationDate(now);
    return;
  }

  // level === "high": clear everything, including authorship and dates.
  document.setTitle("");
  document.setAuthor("");
  document.setSubject("");
  document.setKeywords([]);
  document.setCreationDate(now);
  document.setModificationDate(now);
}

/**
 * Rebuilds a PDF into a fresh PDFDocument, copying every page from the
 * source document. This drops unreferenced objects left behind in the
 * original file.
 */
async function rebuildDocument(sourceDocument: PDFDocument): Promise<PDFDocument> {
  const rebuiltDocument = await PDFDocument.create();

  const pageIndices = sourceDocument.getPageIndices();
  const copiedPages = await rebuiltDocument.copyPages(
    sourceDocument,
    pageIndices
  );

  copiedPages.forEach((page) => rebuiltDocument.addPage(page));

  return rebuiltDocument;
}

/**
 * Compresses a PDF file using the real optimization capabilities available
 * in pdf-lib: rebuilding the document to drop unreferenced objects, clearing
 * metadata, and saving with object streams enabled.
 */
export async function compressPdf(
  file: File,
  level: CompressionLevel
): Promise<CompressionResult> {
  const originalSize = file.size;

  let arrayBuffer: ArrayBuffer;
  try {
    arrayBuffer = await file.arrayBuffer();
  } catch {
    throw new CompressionEngineError(
      "READ_FAILED",
      `Failed to read "${file.name}".`
    );
  }

  let sourceDocument: PDFDocument;
  try {
    sourceDocument = await PDFDocument.load(arrayBuffer);
  } catch {
    throw new CompressionEngineError(
      "LOAD_FAILED",
      `Failed to load "${file.name}". The file may be corrupted or password-protected.`
    );
  }

  let rebuiltDocument: PDFDocument;
  try {
    rebuiltDocument = await rebuildDocument(sourceDocument);
  } catch {
    throw new CompressionEngineError(
      "COPY_FAILED",
      `Failed to copy pages from "${file.name}".`
    );
  }

  stripMetadata(rebuiltDocument, level);

  let bytes: Uint8Array;
  try {
    bytes = await rebuiltDocument.save({ useObjectStreams: true });
  } catch {
    throw new CompressionEngineError(
      "SAVE_FAILED",
      `Failed to save the compressed version of "${file.name}".`
    );
  }

  const compressedSize = bytes.byteLength;
  const savedBytes = calculateSavedBytes(originalSize, compressedSize);
  const compressionRatio = calculateCompressionRatio(
    originalSize,
    compressedSize
  );

  return {
    bytes,
    originalSize,
    compressedSize,
    savedBytes,
    compressionRatio,
  };
}

export default compressPdf;
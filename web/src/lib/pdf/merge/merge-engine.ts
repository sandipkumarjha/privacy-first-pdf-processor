import { PDFDocument } from "pdf-lib";

export type MergeEngineErrorCode =
  | "NO_FILES"
  | "LOAD_FAILED"
  | "COPY_FAILED"
  | "SAVE_FAILED";

export class MergeEngineError extends Error {
  code: MergeEngineErrorCode;
  fileName?: string;

  constructor(
    code: MergeEngineErrorCode,
    message: string,
    fileName?: string
  ) {
    super(message);
    this.name = "MergeEngineError";
    this.code = code;
    this.fileName = fileName;
  }
}

export async function mergePdfFiles(files: File[]): Promise<Uint8Array> {
  if (!files || files.length === 0) {
    throw new MergeEngineError("NO_FILES", "No PDF files were provided to merge.");
  }

  const mergedPdf = await PDFDocument.create();

  for (const file of files) {
    let sourcePdf: PDFDocument;

    try {
      const arrayBuffer = await file.arrayBuffer();
      sourcePdf = await PDFDocument.load(arrayBuffer);
    } catch (error) {
      throw new MergeEngineError(
        "LOAD_FAILED",
        `Failed to load "${file.name}". The file may be corrupted or password-protected.`,
        file.name
      );
    }

    try {
      const pageIndices = sourcePdf.getPageIndices();
      const copiedPages = await mergedPdf.copyPages(sourcePdf, pageIndices);
      copiedPages.forEach((page) => mergedPdf.addPage(page));
    } catch (error) {
      throw new MergeEngineError(
        "COPY_FAILED",
        `Failed to copy pages from "${file.name}".`,
        file.name
      );
    }
  }

  try {
    return await mergedPdf.save();
  } catch (error) {
    throw new MergeEngineError("SAVE_FAILED", "Failed to save the merged PDF.");
  }
}

export default mergePdfFiles;
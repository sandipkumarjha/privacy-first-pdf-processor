import { PDFDocument, degrees } from "pdf-lib";

/**
 * A single page rotation instruction.
 * Rotation is absolute (0°, 90°, 180°, or 270°).
 */
export interface RotateInstruction {
  pageNumber: number;
  rotation: 0 | 90 | 180 | 270;
}

export type RotateEngineErrorCode =
  | "READ_FAILED"
  | "LOAD_FAILED"
  | "SAVE_FAILED";

export class RotateEngineError extends Error {
  code: RotateEngineErrorCode;

  constructor(code: RotateEngineErrorCode, message: string) {
    super(message);
    this.name = "RotateEngineError";
    this.code = code;
  }
}

/**
 * Rotates PDF pages and returns the modified PDF bytes.
 */
export async function rotatePdf(
  file: File,
  instructions: RotateInstruction[]
): Promise<Uint8Array> {
  let arrayBuffer: ArrayBuffer;

  try {
    arrayBuffer = await file.arrayBuffer();
  } catch {
    throw new RotateEngineError(
      "READ_FAILED",
      `Failed to read "${file.name}".`
    );
  }

  let pdfDocument: PDFDocument;

  try {
    pdfDocument = await PDFDocument.load(arrayBuffer);
  } catch {
    throw new RotateEngineError(
      "LOAD_FAILED",
      `Failed to load "${file.name}". The file may be corrupted or password-protected.`
    );
  }

  const pages = pdfDocument.getPages();

  for (const instruction of instructions) {
    if (instruction.rotation === 0) continue;

    const index = instruction.pageNumber - 1;

    // Prevent invalid page indexes
    if (index < 0 || index >= pages.length) {
      continue;
    }

    pages[index].setRotation(degrees(instruction.rotation));
  }

  try {
    return await pdfDocument.save({
      useObjectStreams: true,
    });
  } catch {
    throw new RotateEngineError(
      "SAVE_FAILED",
      `Failed to save the rotated PDF.`
    );
  }
}

export default rotatePdf;
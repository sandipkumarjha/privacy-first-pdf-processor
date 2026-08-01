import { PDFDocument, StandardFonts, rgb, degrees } from "pdf-lib";

/**
 * Options controlling the text watermark applied to every page. Only
 * plain text watermarks are supported — no images, no tiling, no custom
 * fonts.
 */
export interface WatermarkOptions {
  text: string;
  fontSize: number;
  opacity: number;
  rotation: number;
  color: string;
  position:
    | "center"
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right";
}

export type WatermarkEngineErrorCode = "READ_FAILED" | "LOAD_FAILED" | "SAVE_FAILED";

export class WatermarkEngineError extends Error {
  code: WatermarkEngineErrorCode;

  constructor(code: WatermarkEngineErrorCode, message: string) {
    super(message);
    this.name = "WatermarkEngineError";
    this.code = code;
  }
}

/**
 * Converts a "#RRGGBB" hex color string into pdf-lib's normalized
 * (0-1 per channel) RGB color.
 */
function hexToRgb(hex: string) {
  const normalized = hex.replace("#", "");

  const r = parseInt(normalized.slice(0, 2), 16) / 255;
  const g = parseInt(normalized.slice(2, 4), 16) / 255;
  const b = parseInt(normalized.slice(4, 6), 16) / 255;

  return rgb(r, g, b);
}

/**
 * Applies a text watermark to every page of a PDF and returns the
 * resulting bytes. The original document is loaded once and modified
 * in place before saving — no page reordering, deletion, or metadata
 * changes are applied.
 */
export async function watermarkPdf(
  file: File,
  options: WatermarkOptions
): Promise<Uint8Array> {
  let arrayBuffer: ArrayBuffer;
  try {
    arrayBuffer = await file.arrayBuffer();
  } catch {
    throw new WatermarkEngineError(
      "READ_FAILED",
      `Failed to read "${file.name}".`
    );
  }

  let pdfDocument: PDFDocument;
  try {
    pdfDocument = await PDFDocument.load(arrayBuffer);
  } catch {
    throw new WatermarkEngineError(
      "LOAD_FAILED",
      `Failed to load "${file.name}". The file may be corrupted or password-protected.`
    );
  }

  const font = await pdfDocument.embedFont(StandardFonts.HelveticaBold);
  const watermarkColor = hexToRgb(options.color);

  for (const page of pdfDocument.getPages()) {
    const { width, height } = page.getSize();
    const textWidth = font.widthOfTextAtSize(options.text, options.fontSize);
    const textHeight = options.fontSize;

    let x: number;
    let y: number;

    switch (options.position) {
      case "top-left":
        x = 40;
        y = height - 60;
        break;
      case "top-right":
        x = width - textWidth - 40;
        y = height - 60;
        break;
      case "bottom-left":
        x = 40;
        y = 40;
        break;
      case "bottom-right":
        x = width - textWidth - 40;
        y = 40;
        break;
      case "center":
      default:
        x = (width - textWidth) / 2;
        y = (height - textHeight) / 2;
        break;
    }

    page.drawText(options.text, {
      x,
      y,
      font,
      size: options.fontSize,
      color: watermarkColor,
      opacity: options.opacity,
      rotate: degrees(options.rotation),
    });
  }

  try {
    return await pdfDocument.save();
  } catch {
    throw new WatermarkEngineError(
      "SAVE_FAILED",
      `Failed to save the watermarked version of "${file.name}".`
    );
  }
}

export default watermarkPdf;
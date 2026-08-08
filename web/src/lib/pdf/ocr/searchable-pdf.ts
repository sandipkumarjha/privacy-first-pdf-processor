import { PDFDocument, StandardFonts } from "pdf-lib";
import type { RenderedPageImage } from "./image-renderer";
import type { OcrPageResult, OcrWord } from "./ocr-engine";

async function canvasToPngBytes(
  canvas: HTMLCanvasElement
): Promise<Uint8Array> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(async (blob) => {
      if (!blob) {
        reject(new Error("Failed to convert canvas to PNG."));
        return;
      }

      try {
        const buffer = await blob.arrayBuffer();
        resolve(new Uint8Array(buffer));
      } catch (error) {
        reject(error);
      }
    }, "image/png");
  });
}

/**
 * Tesseract coordinates:
 *
 *   (0,0)
 *      ───────────────► X
 *      │
 *      │
 *      ▼
 *      Y
 *
 * PDF coordinates:
 *
 *      Y
 *      ▲
 *      │
 *      │
 *   (0,0) ───────────► X
 *
 * Therefore the Y coordinate must be flipped.
 */
function convertY(
  pageHeight: number,
  y0: number,
  height: number
): number {
  return pageHeight - y0 - height;
}

/**
 * Creates a font size that roughly matches the
 * height of the OCR bounding box.
 */
function getFontSize(word: OcrWord): number {
  const height = word.y1 - word.y0;

  return Math.max(
    4,
    Math.min(height * 0.85, 48)
  );
}

/**
 * Builds a searchable PDF.
 *
 * The original rendered page remains visible.
 *
 * OCR text is placed over the original image
 * as nearly invisible selectable text.
 */
export async function buildSearchablePdf(
  pages: RenderedPageImage[],
  ocrResults: OcrPageResult[]
): Promise<Uint8Array> {
  try {
    console.log("🔥 BUILDING SEARCHABLE PDF");

    const pdfDoc = await PDFDocument.create();

    const font = await pdfDoc.embedFont(
      StandardFonts.Helvetica
    );

    for (const renderedPage of pages) {
      console.log(
        `🔥 BUILDING PDF PAGE ${renderedPage.pageNumber}`
      );

      const page = pdfDoc.addPage([
        renderedPage.width,
        renderedPage.height,
      ]);

      /*
       * --------------------------------------------------
       * 1. Add original page image
       * --------------------------------------------------
       */

      const pngBytes = await canvasToPngBytes(
        renderedPage.image
      );

      const embeddedImage =
        await pdfDoc.embedPng(pngBytes);

      page.drawImage(embeddedImage, {
        x: 0,
        y: 0,
        width: renderedPage.width,
        height: renderedPage.height,
      });

      /*
       * --------------------------------------------------
       * 2. Find OCR result
       * --------------------------------------------------
       */

      const ocrResult = ocrResults.find(
        (result) =>
          result.pageNumber ===
          renderedPage.pageNumber
      );

      if (!ocrResult) {
        console.warn(
          `⚠ No OCR result for page ${renderedPage.pageNumber}`
        );

        continue;
      }

      const words = ocrResult.words ?? [];

      console.log(
        `🔥 PAGE ${renderedPage.pageNumber} OCR WORDS:`,
        words.length
      );

      if (words.length === 0) {
        console.warn(
          `⚠ No OCR words for page ${renderedPage.pageNumber}`
        );

        continue;
      }

      /*
       * --------------------------------------------------
       * 3. Add invisible searchable text
       * --------------------------------------------------
       */

      for (const word of words) {
        const text = word.text.trim();

        if (!text) {
          continue;
        }

        const width = word.x1 - word.x0;
        const height = word.y1 - word.y0;

        if (width <= 0 || height <= 0) {
          continue;
        }

        const x = word.x0;

        const y = convertY(
          renderedPage.height,
          word.y0,
          height
        );

        const fontSize =
          getFontSize(word);

        /*
         * IMPORTANT:
         *
         * The text is almost invisible but still
         * exists as real PDF text.
         *
         * This is what makes Ctrl+F and
         * copy/paste possible.
         */
        page.drawText(text, {
          x,
          y,
          size: fontSize,
          font,

          /*
           * Keep the OCR layer visually hidden.
           */
          opacity: 0.01,

          /*
           * Do not use the OCR text color
           * to affect the visible document.
           */
        });
      }
    }

    /*
     * --------------------------------------------------
     * 4. Save PDF
     * --------------------------------------------------
     */

    const result = await pdfDoc.save();

    console.log(
      "🔥 SEARCHABLE PDF CREATED:",
      result.length,
      "bytes"
    );

    return result;
  } catch (error) {
    console.error(
      "❌ FAILED TO BUILD SEARCHABLE PDF:",
      error
    );

    throw new Error(
      "Failed to build OCR PDF."
    );
  }
}

export default buildSearchablePdf;
import type { PDFPageProxy } from "pdfjs-dist";

export interface RenderedPageImage {
  pageNumber: number;
  image: HTMLCanvasElement;
  width: number;
  height: number;
}

const RENDER_SCALE = 2.5;

/**
 * Renders a single PDF page as a high-resolution canvas image, suitable
 * for feeding into an OCR engine such as Tesseract.js. This module only
 * performs rendering — it does not run OCR itself.
 */
export async function renderPageAsImage(
  page: PDFPageProxy
): Promise<RenderedPageImage> {
  try {
    const viewport = page.getViewport({ scale: RENDER_SCALE });

    const canvas = document.createElement("canvas");
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    const context = canvas.getContext("2d");

    if (!context) {
      throw new Error("Failed to render PDF page.");
    }

    await page.render({
      canvasContext: context,
      viewport,
    }).promise;

    return {
      pageNumber: page.pageNumber,
      image: canvas,
      width: canvas.width,
      height: canvas.height,
    };
  } catch {
    throw new Error("Failed to render PDF page.");
  } finally {
    page.cleanup();
  }
}

export default renderPageAsImage;
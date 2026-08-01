import type { PDFDocumentProxy, PDFPageProxy } from "pdfjs-dist";

export interface WatermarkPage {
  pageNumber: number;
  thumbnail: string;
  selected: boolean;
}

const THUMBNAIL_SCALE = 0.35;

/**
 * Renders a single PDF page onto a canvas at THUMBNAIL_SCALE and returns
 * it as a PNG data URL.
 *
 * Uses the pdfjs-dist 5.4.149 render API, which requires both `canvas`
 * and `canvasContext` in RenderParameters (the older API accepted
 * `canvasContext` alone).
 */
async function renderPageThumbnail(page: PDFPageProxy): Promise<string> {
  const viewport = page.getViewport({ scale: THUMBNAIL_SCALE });

  const canvas = document.createElement("canvas");
  canvas.width = viewport.width;
  canvas.height = viewport.height;

  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Failed to acquire a 2D canvas rendering context.");
  }

 /* await page.render({
    canvas,
    canvasContext: context,
    viewport,
  }).promise;

  return canvas.toDataURL("image/png");
}
*/
await page.render({
    canvas,
    canvasContext: context,
    viewport,
  } as any).promise;

  return canvas.toDataURL("image/png");
}
/**
 * Generates a thumbnail preview for every page of a PDF document.
 *
 * Pages are rendered sequentially (not in parallel) to avoid memory spikes
 * from holding many rendered canvases at once. If a single page fails to
 * render, the error is logged and the remaining pages continue to be
 * processed rather than aborting the whole operation.
 */
export async function generatePageThumbnails(
  pdfDocument: PDFDocumentProxy
): Promise<WatermarkPage[]> {
  const pages: WatermarkPage[] = [];

  for (let pageNumber = 1; pageNumber <= pdfDocument.numPages; pageNumber += 1) {
    try {
      const page = await pdfDocument.getPage(pageNumber);

      try {
        const thumbnail = await renderPageThumbnail(page);
        pages.push({ pageNumber, thumbnail, selected: false });
      } finally {
        page.cleanup();
      }
    } catch (error) {
      console.error(
        `Failed to generate thumbnail for page ${pageNumber}:`,
        error
      );
    }
  }

  return pages;
}

export default generatePageThumbnails;
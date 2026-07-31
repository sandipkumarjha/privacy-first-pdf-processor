import type { PDFDocumentProxy, PDFPageProxy } from "pdfjs-dist";

export interface ExtractPage {
  pageNumber: number;
  thumbnail: string;
  selected: boolean;
}

const THUMBNAIL_SCALE = 0.35;

async function renderPageThumbnail(
  page: PDFPageProxy
): Promise<string> {
  const viewport = page.getViewport({
    scale: THUMBNAIL_SCALE,
  });

  const canvas = document.createElement("canvas");

  canvas.width = viewport.width;
  canvas.height = viewport.height;

  const context = canvas.getContext("2d");

  if (!(context instanceof CanvasRenderingContext2D)) {
    throw new Error("2D CanvasRenderingContext required.");
  }

  // pdfjs-dist 5.x typing workaround
  const renderTask = page.render({
    canvas,
    canvasContext: context,
    viewport,
  } as any);

  await renderTask.promise;

  return canvas.toDataURL("image/png");
}

export async function generatePageThumbnails(
  pdfDocument: PDFDocumentProxy
): Promise<ExtractPage[]> {
  const pages: ExtractPage[] = [];

  for (
    let pageNumber = 1;
    pageNumber <= pdfDocument.numPages;
    pageNumber++
  ) {
    try {
      const page = await pdfDocument.getPage(pageNumber);

      try {
        const thumbnail = await renderPageThumbnail(page);

        pages.push({
          pageNumber,
          thumbnail,
          selected: false,
        });
      } finally {
        page.cleanup();
      }
    } catch (error) {
      console.error(
        `Failed to generate thumbnail for page ${pageNumber}`,
        error
      );
    }
  }

  return pages;
}

export default generatePageThumbnails;
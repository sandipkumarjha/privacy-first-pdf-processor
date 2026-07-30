import type { PDFDocumentProxy, PDFPageProxy } from "pdfjs-dist";

export interface RotatePage {
  pageNumber: number;
  thumbnail: string;
  rotation: number;
}

const SCALE = 0.35;

type RenderCanvas = HTMLCanvasElement | OffscreenCanvas;

function createCanvas(width: number, height: number): RenderCanvas {
  if (typeof OffscreenCanvas !== "undefined") {
    return new OffscreenCanvas(width, height);
  }

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  return canvas;
}

async function canvasToDataURL(canvas: RenderCanvas): Promise<string> {
  if (canvas instanceof HTMLCanvasElement) {
    return canvas.toDataURL("image/png");
  }

  const blob = await canvas.convertToBlob({
    type: "image/png",
  });

  return await new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = () => resolve(reader.result as string);

    reader.readAsDataURL(blob);
  });
}

async function renderThumbnail(page: PDFPageProxy) {
  const viewport = page.getViewport({
    scale: SCALE,
  });

  const canvas = createCanvas(viewport.width, viewport.height);

  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Cannot create canvas context.");
  }

  await page.render({
    canvas,
    canvasContext: context,
    viewport,
  } as any).promise;

  return canvasToDataURL(canvas);
}

export async function generatePageThumbnails(
  pdf: PDFDocumentProxy
): Promise<RotatePage[]> {
  const pages: RotatePage[] = [];

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);

    const thumbnail = await renderThumbnail(page);

    pages.push({
      pageNumber: i,
      thumbnail,
      rotation: 0,
    });

    page.cleanup();
  }

  return pages;
}

export default generatePageThumbnails;
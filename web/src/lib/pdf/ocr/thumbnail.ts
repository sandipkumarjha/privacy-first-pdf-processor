import type { PDFDocumentProxy, PDFPageProxy } from "pdfjs-dist";

export interface OcrThumbnailPage {
  pageNumber: number;
  thumbnail: string;
  selected: boolean;
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

  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error("Failed to convert thumbnail to data URL."));
      }
    };

    reader.onerror = () => {
      reject(new Error("Failed to read thumbnail data."));
    };

    reader.readAsDataURL(blob);
  });
}

async function renderThumbnail(page: PDFPageProxy): Promise<string> {
  const viewport = page.getViewport({
    scale: SCALE,
  });

  const canvas = createCanvas(
    Math.ceil(viewport.width),
    Math.ceil(viewport.height)
  );

  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Cannot create canvas context.");
  }

  await page.render({
    canvas,
    canvasContext: context,
    viewport,
  } as Parameters<typeof page.render>[0]).promise;

  return canvasToDataURL(canvas);
}

export async function generatePageThumbnails(
  pdf: PDFDocumentProxy
): Promise<OcrThumbnailPage[]> {
  const pages: OcrThumbnailPage[] = [];

  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
    const page = await pdf.getPage(pageNumber);

    try {
      const thumbnail = await renderThumbnail(page);

      pages.push({
        pageNumber,
        thumbnail,
        selected: true,
      });
    } finally {
      page.cleanup();
    }
  }

  return pages;
}

export default generatePageThumbnails;
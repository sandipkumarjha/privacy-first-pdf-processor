import type { PDFDocumentProxy } from "pdfjs-dist";

export interface ThumbnailResult {
  objectUrl: string;
  width: number;
  height: number;
}

export interface ThumbnailOptions {
  scale?: number;
  mimeType?: "image/png" | "image/jpeg" | "image/webp";
  quality?: number;
}

const DEFAULT_SCALE = 0.5;
const DEFAULT_MIME_TYPE: NonNullable<ThumbnailOptions["mimeType"]> = "image/png";

export class ThumbnailGenerationError extends Error {
  constructor(message: string, public readonly cause?: unknown) {
    super(message);
    this.name = "ThumbnailGenerationError";
  }
}

export async function generatePageThumbnail(
  document: PDFDocumentProxy,
  pageNumber: number,
  options: ThumbnailOptions = {}
): Promise<ThumbnailResult> {
  const { scale = DEFAULT_SCALE, mimeType = DEFAULT_MIME_TYPE, quality } = options;

  if (pageNumber < 1 || pageNumber > document.numPages) {
    throw new ThumbnailGenerationError(
      `Page number ${pageNumber} is out of range (1-${document.numPages}).`
    );
  }

  let page;
  try {
    page = await document.getPage(pageNumber);
  } catch (err) {
    throw new ThumbnailGenerationError(`Failed to load page ${pageNumber}.`, err);
  }

  try {
    const viewport = page.getViewport({ scale });

    const canvas = document instanceof Object && "createElement" in globalThis
      ? window.document.createElement("canvas")
      : null;

    if (!canvas) {
      throw new ThumbnailGenerationError("Canvas is not available in this environment.");
    }

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    const context = canvas.getContext("2d");
    if (!context) {
      throw new ThumbnailGenerationError("Failed to acquire 2D canvas context.");
    }

    await page.render({ canvas, canvasContext: context, viewport }).promise;

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, mimeType, quality)
    );

    if (!blob) {
      throw new ThumbnailGenerationError(`Failed to generate blob for page ${pageNumber}.`);
    }

    return {
      objectUrl: URL.createObjectURL(blob),
      width: viewport.width,
      height: viewport.height,
    };
  } finally {
    page.cleanup();
  }
}

export async function generateThumbnailsForPages(
  document: PDFDocumentProxy,
  pageNumbers: number[],
  options: ThumbnailOptions = {}
): Promise<Map<number, ThumbnailResult>> {
  const results = new Map<number, ThumbnailResult>();

  await Promise.all(
    pageNumbers.map(async (pageNumber) => {
      const thumbnail = await generatePageThumbnail(document, pageNumber, options);
      results.set(pageNumber, thumbnail);
    })
  );

  return results;
}

export function revokeThumbnail(objectUrl: string | null | undefined): void {
  if (objectUrl) {
    URL.revokeObjectURL(objectUrl);
  }
}
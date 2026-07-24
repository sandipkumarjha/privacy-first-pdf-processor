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
const DEFAULT_MIME_TYPE: NonNullable<ThumbnailOptions["mimeType"]> =
  "image/png";

export class ThumbnailGenerationError extends Error {
  constructor(message: string, public readonly cause?: unknown) {
    super(message);
    this.name = "ThumbnailGenerationError";
  }
}

export async function generatePageThumbnail(
  pdf: PDFDocumentProxy,
  pageNumber: number,
  options: ThumbnailOptions = {}
): Promise<ThumbnailResult> {
  const {
    scale = DEFAULT_SCALE,
    mimeType = DEFAULT_MIME_TYPE,
    quality,
  } = options;

  if (pageNumber < 1 || pageNumber > pdf.numPages) {
    throw new ThumbnailGenerationError(
      `Invalid page number ${pageNumber}.`
    );
  }

  try {
    console.log(`📄 Loading page ${pageNumber}`);

    const page = await pdf.getPage(pageNumber);

    const viewport = page.getViewport({ scale });

    console.log("Viewport:", viewport.width, viewport.height);

    const canvas = window.document.createElement("canvas");

    canvas.width = Math.ceil(viewport.width);
    canvas.height = Math.ceil(viewport.height);

    const context = canvas.getContext("2d");

    if (!context) {
      throw new ThumbnailGenerationError(
        "Failed to create 2D canvas context."
      );
    }

    console.log(`🎨 Rendering page ${pageNumber}`);

    const renderTask = page.render({
      canvas,
      canvasContext: context,
      viewport,
    });
    
    await renderTask.promise;

    console.log(`✅ Render complete ${pageNumber}`);

    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (result) => {
          if (!result) {
            reject(
              new ThumbnailGenerationError(
                `Failed to create thumbnail for page ${pageNumber}.`
              )
            );
            return;
          }

          resolve(result);
        },
        mimeType,
        quality
      );
    });

    page.cleanup();

    return {
      objectUrl: URL.createObjectURL(blob),
      width: viewport.width,
      height: viewport.height,
    };
  } catch (err) {
    console.error(
      `❌ Thumbnail generation failed for page ${pageNumber}`,
      err
    );

    throw new ThumbnailGenerationError(
      `Failed to generate thumbnail for page ${pageNumber}.`,
      err
    );
  }
}

export async function generateThumbnailsForPages(
  pdf: PDFDocumentProxy,
  pageNumbers: number[],
  options: ThumbnailOptions = {}
): Promise<Map<number, ThumbnailResult>> {
  const result = new Map<number, ThumbnailResult>();

  for (const pageNumber of pageNumbers) {
    const thumbnail = await generatePageThumbnail(
      pdf,
      pageNumber,
      options
    );

    result.set(pageNumber, thumbnail);
  }

  return result;
}

export function revokeThumbnail(
  objectUrl?: string | null
): void {
  if (objectUrl) {
    URL.revokeObjectURL(objectUrl);
  }
}
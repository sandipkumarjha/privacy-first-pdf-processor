const PDF_MIME_TYPE = "application/pdf";

/**
 * Derives the output filename for an extracted PDF from the original file
 * name. "document.pdf" becomes "document-extracted.pdf". Missing,
 * extension-less, or otherwise unusual names are handled safely and never
 * throw — they fall back to a sensible default.
 */
function buildExtractedFileName(originalFileName: string): string {
  const fallbackName = "document";

  if (!originalFileName || typeof originalFileName !== "string") {
    return `${fallbackName}-extracted.pdf`;
  }

  const trimmedName = originalFileName.trim();

  if (trimmedName.length === 0) {
    return `${fallbackName}-extracted.pdf`;
  }

  const lastDotIndex = trimmedName.lastIndexOf(".");

  // No extension, or a dot-only/hidden-file name (e.g. ".pdf") with
  // nothing meaningful before it — treat as having no usable extension.
  if (lastDotIndex <= 0) {
    return `${trimmedName}-extracted.pdf`;
  }

  const baseName = trimmedName.slice(0, lastDotIndex);
  return `${baseName}-extracted.pdf`;
}

/**
 * Triggers a browser download of the extracted PDF bytes produced by
 * extract-engine.ts. Pure DOM utility — no React, no hooks.
 */
export function downloadExtractedPdf(
  bytes: Uint8Array,
  originalFileName: string
): void {
    const blob = new Blob([bytes as BlobPart], {
        type: PDF_MIME_TYPE,
      });
      const objectUrl = URL.createObjectURL(blob);
    

  const anchor = document.createElement("a");
  anchor.href = objectUrl;
  anchor.download = buildExtractedFileName(originalFileName);
  anchor.style.display = "none";

  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);

  URL.revokeObjectURL(objectUrl);
}

export default downloadExtractedPdf;
const PDF_MIME_TYPE = "application/pdf";

/**
 * Derives the output filename for a watermarked PDF from the original
 * file name. "document.pdf" becomes "document-watermarked.pdf"; a name
 * with no extension has "-watermarked.pdf" appended directly.
 */
function buildWatermarkedFileName(originalFileName: string): string {
  const lastDotIndex = originalFileName.lastIndexOf(".");

  if (lastDotIndex === -1) {
    return `${originalFileName}-watermarked.pdf`;
  }

  const baseName = originalFileName.slice(0, lastDotIndex);
  return `${baseName}-watermarked.pdf`;
}

/**
 * Triggers a browser download of the watermarked PDF bytes produced by
 * watermark-engine.ts. Pure DOM utility — no React, no hooks.
 */
export function downloadWatermarkedPdf(
  bytes: Uint8Array,
  originalFileName: string
): void {
  const blob = new Blob([bytes as BlobPart], { type: PDF_MIME_TYPE });
  const objectUrl = URL.createObjectURL(blob);

  const anchor = document.createElement("a");
  anchor.href = objectUrl;
  anchor.download = buildWatermarkedFileName(originalFileName);
  anchor.style.display = "none";

  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);

  URL.revokeObjectURL(objectUrl);
}

export default downloadWatermarkedPdf;
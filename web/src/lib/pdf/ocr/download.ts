const PDF_MIME_TYPE = "application/pdf";

/**
 * Derives the output filename for an OCR'd PDF.
 *
 * "document.pdf" -> "document-ocr.pdf"
 * "document"     -> "document-ocr.pdf"
 */
function buildOcrFileName(originalFileName: string): string {
  const safeFileName =
    typeof originalFileName === "string" && originalFileName.trim()
      ? originalFileName.trim()
      : "document.pdf";

  const lastDotIndex = safeFileName.lastIndexOf(".");

  if (lastDotIndex === -1) {
    return `${safeFileName}-ocr.pdf`;
  }

  const baseName = safeFileName.slice(0, lastDotIndex);

  return `${baseName}-ocr.pdf`;
}

/**
 * Triggers a browser download of the OCR-generated PDF.
 */
export function downloadOcrPdf(
  bytes: Uint8Array,
  originalFileName: string
): void {
  const blob = new Blob([bytes as BlobPart], {
    type: PDF_MIME_TYPE,
  });

  const objectUrl = URL.createObjectURL(blob);

  const anchor = document.createElement("a");

  anchor.href = objectUrl;
  anchor.download = buildOcrFileName(originalFileName);
  anchor.style.display = "none";

  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);

  URL.revokeObjectURL(objectUrl);
}

export default downloadOcrPdf;
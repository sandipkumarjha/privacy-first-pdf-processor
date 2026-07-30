const PDF_MIME_TYPE = "application/pdf";

/**
 * Derives the output filename for a rotated PDF from the original file
 * name. "document.pdf" becomes "document-rotated.pdf"; a name with no
 * extension has "-rotated.pdf" appended directly.
 */
function buildRotatedFileName(originalFileName: unknown): string {
    const fileName =
      typeof originalFileName === "string"
        ? originalFileName
        : originalFileName instanceof File
        ? originalFileName.name
        : "document.pdf";
  
    const lastDotIndex = fileName.lastIndexOf(".");
  
    if (lastDotIndex === -1) {
      return `${fileName}-rotated.pdf`;
    }
  
    return `${fileName.slice(0, lastDotIndex)}-rotated.pdf`;
  }

/**
 * Triggers a browser download of the rotated PDF bytes produced by
 * rotate-engine.ts. Pure DOM utility — no React, no hooks.
 */
export function downloadRotatedPdf(
  bytes: Uint8Array,
  originalFileName: string
): void {
  //const blob = new Blob([bytes], { type: PDF_MIME_TYPE });
  const blob = new Blob([bytes as BlobPart], {
    type: PDF_MIME_TYPE,
  });
  const objectUrl = URL.createObjectURL(blob);

  const anchor = document.createElement("a");
  anchor.href = objectUrl;
  anchor.download = buildRotatedFileName(originalFileName);
  anchor.style.display = "none";

  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);

  URL.revokeObjectURL(objectUrl);
}

export default downloadRotatedPdf;
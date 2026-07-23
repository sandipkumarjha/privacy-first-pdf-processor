export function downloadPdf(pdfBytes: Uint8Array, filename: string): void {
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const objectUrl = URL.createObjectURL(blob);
  
    const anchor = document.createElement("a");
    anchor.href = objectUrl;
    anchor.download = filename.toLowerCase().endsWith(".pdf")
      ? filename
      : `${filename}.pdf`;
  
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  
    URL.revokeObjectURL(objectUrl);
  }
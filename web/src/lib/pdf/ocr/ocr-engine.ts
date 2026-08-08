import type { RenderedPageImage } from "./image-renderer";

export interface OcrWord {
  text: string;
  confidence: number;
  x0: number;
  y0: number;
  x1: number;
  y1: number;
}

export interface OcrPageResult {
  pageNumber: number;
  text: string;
  confidence: number;
  words: OcrWord[];
}

export interface OcrProgress {
  currentPage: number;
  totalPages: number;
  percentage: number;
  currentStep: string;
}

interface TesseractWord {
  text: string;
  conf: string | number;
  left: string | number;
  top: string | number;
  width: string | number;
  height: string | number;
}

function parseTsv(tsv: string): OcrWord[] {
  const words: OcrWord[] = [];

  const lines = tsv.split(/\r?\n/);

  for (const line of lines) {
    if (!line.trim()) continue;

    const columns = line.split("\t");

    // Tesseract TSV has 12 columns.
    if (columns.length < 12) continue;

    const text = columns[11]?.trim();

    if (!text) continue;

    const word: TesseractWord = {
      text,
      conf: columns[10],
      left: columns[6],
      top: columns[7],
      width: columns[8],
      height: columns[9],
    };

    const x0 = Number(word.left);
    const y0 = Number(word.top);
    const width = Number(word.width);
    const height = Number(word.height);
    const confidence = Number(word.conf);

    if (
      !Number.isFinite(x0) ||
      !Number.isFinite(y0) ||
      !Number.isFinite(width) ||
      !Number.isFinite(height)
    ) {
      continue;
    }

    words.push({
      text: word.text,
      confidence: Number.isFinite(confidence)
        ? confidence
        : 0,
      x0,
      y0,
      x1: x0 + width,
      y1: y0 + height,
    });
  }

  return words;
}

export async function runOcr(
  pages: RenderedPageImage[],
  language: string,
  onProgress?: (progress: OcrProgress) => void
): Promise<OcrPageResult[]> {
  const results: OcrPageResult[] = [];
  const totalPages = pages.length;

  if (totalPages === 0) {
    return results;
  }

  console.log("🔥 OCR ENGINE ENTERED");
  console.log("🔥 PAGES:", totalPages);
  console.log("🔥 LANGUAGE:", language);

  const { createWorker } = await import("tesseract.js");

  console.log("🔥 LOADING TESSERACT");

  const worker = await createWorker(language);

  console.log("🔥 TESSERACT WORKER CREATED");

  try {
    for (let index = 0; index < totalPages; index += 1) {
      const page = pages[index];
      const currentPage = index + 1;

      onProgress?.({
        currentPage,
        totalPages,
        percentage: Math.round(
          ((currentPage - 1) / totalPages) * 100
        ),
        currentStep: `Recognizing page ${currentPage} of ${totalPages}`,
      });

      console.log(
        `🔥 RECOGNIZING PAGE ${page.pageNumber}`
      );

      try {
       const { data } = await worker.recognize(
  page.image,
  {},
  {
    blocks: true,
    hocr: true,
    tsv: true,
    box: true,
    unlv: true,
  }
);
        

        console.log("🔥 OCR OUTPUT:", {
  text: data.text,
  hocr: data.hocr,
  tsv: data.tsv,
  box: data.box,
  unlv: data.unlv,
});

        const tsv = data.tsv ?? "";

        const words = parseTsv(tsv);

        const pageResult: OcrPageResult = {
          pageNumber: page.pageNumber,
          text: data.text ?? "",
          confidence: Number(data.confidence) || 0,
          words,
        };

        console.log(
          `🔥 OCR PAGE ${page.pageNumber} WORD COUNT:`,
          words.length
        );

        console.log(
          `🔥 OCR PAGE ${page.pageNumber} TEXT:`,
          pageResult.text
        );

        if (words.length > 0) {
          console.log(
            "🔥 FIRST OCR WORD:",
            words[0]
          );
        }

        results.push(pageResult);
      } catch (error) {
        console.error(
          `❌ Failed OCR on page ${page.pageNumber}:`,
          error
        );

        results.push({
          pageNumber: page.pageNumber,
          text: "",
          confidence: 0,
          words: [],
        });
      }

      onProgress?.({
        currentPage,
        totalPages,
        percentage: Math.round(
          (currentPage / totalPages) * 100
        ),
        currentStep: `Recognized page ${currentPage} of ${totalPages}`,
      });
    }
  } finally {
    console.log("🔥 TERMINATING TESSERACT WORKER");

    await worker.terminate();

    console.log("🔥 TESSERACT WORKER TERMINATED");
  }

  console.log("🔥 OCR ENGINE FINISHED");
  console.log("🔥 TOTAL OCR RESULTS:", results.length);

  return results;
}

export default runOcr;
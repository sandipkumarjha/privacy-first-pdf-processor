export function togglePage(selectedPages: number[], pageNumber: number): number[] {
    return selectedPages.includes(pageNumber)
      ? selectedPages.filter((page) => page !== pageNumber)
      : [...selectedPages, pageNumber].sort((a, b) => a - b);
  }
  
  export function selectAllPages(totalPages: number): number[] {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }
  
  export function deselectAllPages(): number[] {
    return [];
  }
  
  export function selectRange(
    selectedPages: number[],
    from: number,
    to: number
  ): number[] {
    const start = Math.min(from, to);
    const end = Math.max(from, to);
  
    const rangePages = Array.from(
      { length: end - start + 1 },
      (_, index) => start + index
    );
  
    const merged = new Set([...selectedPages, ...rangePages]);
    return Array.from(merged).sort((a, b) => a - b);
  }
  
  export function invertSelection(
    selectedPages: number[],
    totalPages: number
  ): number[] {
    const selectedSet = new Set(selectedPages);
    return Array.from({ length: totalPages }, (_, index) => index + 1).filter(
      (page) => !selectedSet.has(page)
    );
  }
  
  export interface PageRangeParseResult {
    pages: number[];
    error: string | null;
  }
  
  export function parsePageRangeInput(
    input: string,
    totalPages: number
  ): PageRangeParseResult {
    const trimmed = input.trim();
  
    if (trimmed.length === 0) {
      return { pages: [], error: null };
    }
  
    const segments = trimmed.split(",").map((segment) => segment.trim()).filter(Boolean);
    const pages = new Set<number>();
  
    for (const segment of segments) {
      const rangeMatch = segment.match(/^(\d+)\s*-\s*(\d+)$/);
      const singleMatch = segment.match(/^(\d+)$/);
  
      if (rangeMatch) {
        const from = Number(rangeMatch[1]);
        const to = Number(rangeMatch[2]);
  
        if (from < 1 || to < 1 || from > totalPages || to > totalPages) {
          return {
            pages: [],
            error: `Range "${segment}" is out of bounds (1-${totalPages}).`,
          };
        }
        if (from > to) {
          return {
            pages: [],
            error: `Range "${segment}" is invalid: start page is greater than end page.`,
          };
        }
  
        for (let page = from; page <= to; page += 1) {
          pages.add(page);
        }
      } else if (singleMatch) {
        const page = Number(singleMatch[1]);
  
        if (page < 1 || page > totalPages) {
          return {
            pages: [],
            error: `Page "${page}" is out of bounds (1-${totalPages}).`,
          };
        }
  
        pages.add(page);
      } else {
        return {
          pages: [],
          error: `"${segment}" is not a valid page or range.`,
        };
      }
    }
  
    return { pages: Array.from(pages).sort((a, b) => a - b), error: null };
  }
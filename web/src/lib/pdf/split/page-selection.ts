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
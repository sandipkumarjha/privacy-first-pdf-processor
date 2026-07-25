export function swapFiles<T>(items: T[], indexA: number, indexB: number): T[] {
    if (
      indexA === indexB ||
      indexA < 0 ||
      indexB < 0 ||
      indexA >= items.length ||
      indexB >= items.length
    ) {
      return items;
    }
  
    const result = [...items];
    [result[indexA], result[indexB]] = [result[indexB], result[indexA]];
  
    return result;
  }
  
  export function moveFileUp<T extends { id: string }>(
    items: T[],
    id: string
  ): T[] {
    const index = items.findIndex((item) => item.id === id);
  
    if (index <= 0) {
      return items;
    }
  
    return swapFiles(items, index, index - 1);
  }
  
  export function moveFileDown<T extends { id: string }>(
    items: T[],
    id: string
  ): T[] {
    const index = items.findIndex((item) => item.id === id);
  
    if (index === -1 || index >= items.length - 1) {
      return items;
    }
  
    return swapFiles(items, index, index + 1);
  }
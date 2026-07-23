import type {
    SplitEngineInput,
    SplitEngineResult,
    SplitOptions,
  } from "@/types/split";
  
  export async function splitPdf(
    input: SplitEngineInput
  ): Promise<SplitEngineResult> {
    void input;
    throw new Error("Not implemented");
  }
  
  export async function splitByRanges(
    file: File,
    ranges: SplitOptions["ranges"]
  ): Promise<SplitEngineResult> {
    void file;
    void ranges;
    throw new Error("Not implemented");
  }
  
  export async function splitBySelectedPages(
    file: File,
    selectedPages: number[]
  ): Promise<SplitEngineResult> {
    void file;
    void selectedPages;
    throw new Error("Not implemented");
  }
  
  export async function splitAllPages(file: File): Promise<SplitEngineResult> {
    void file;
    throw new Error("Not implemented");
  }
  
  export async function splitBySize(
    file: File,
    maxSizeBytes: number
  ): Promise<SplitEngineResult> {
    void file;
    void maxSizeBytes;
    throw new Error("Not implemented");
  }
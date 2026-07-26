export type CompressionLevel = "low" | "medium" | "high";

export interface CompressionSummary {
  savedBytes: number;
  compressionRatio: number;
  formattedOriginalSize: string;
  formattedCompressedSize: string;
  formattedSavedBytes: string;
}

const BYTE_UNITS = ["Bytes", "KB", "MB", "GB"] as const;

const COMPRESSION_SCALES: Record<CompressionLevel, number> = {
  low: 0.95,
  medium: 0.75,
  high: 0.55,
};

/**
 * Converts a byte count into a human-readable string (Bytes, KB, MB, GB),
 * rounded to 2 decimal places.
 */
export function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) {
    return "0 Bytes";
  }

  const exponent = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    BYTE_UNITS.length - 1
  );

  const value = bytes / Math.pow(1024, exponent);
  const rounded = Math.round(value * 100) / 100;

  return `${rounded} ${BYTE_UNITS[exponent]}`;
}

/**
 * Returns the number of bytes saved between an original and compressed size.
 * Never returns a negative value.
 */
export function calculateSavedBytes(
  originalSize: number,
  compressedSize: number
): number {
  return Math.max(originalSize - compressedSize, 0);
}

/**
 * Returns the compression ratio as a percentage, rounded to the nearest
 * integer. Example: 100 MB -> 70 MB = 30.
 */
export function calculateCompressionRatio(
  originalSize: number,
  compressedSize: number
): number {
  if (!Number.isFinite(originalSize) || originalSize <= 0) {
    return 0;
  }

  const ratio = ((originalSize - compressedSize) / originalSize) * 100;
  return Math.round(ratio);
}

/**
 * Returns the size-scaling factor associated with a given compression level.
 * These values are consumed by compress-engine when estimating or applying
 * compression.
 */
export function getCompressionScale(level: CompressionLevel): number {
  return COMPRESSION_SCALES[level];
}

/**
 * Estimates the compressed size of a file for a given compression level,
 * based on the scale returned by getCompressionScale().
 */
export function estimateCompressedSize(
  originalSize: number,
  level: CompressionLevel
): number {
  const scale = getCompressionScale(level);
  return Math.max(Math.round(originalSize * scale), 0);
}

/**
 * Returns true only if the compressed size is smaller than the original
 * size, meaning compression produced a meaningful reduction.
 */
export function isCompressionUseful(
  originalSize: number,
  compressedSize: number
): boolean {
  return compressedSize < originalSize;
}

/**
 * Builds a full compression summary, reusing the other utilities in this
 * module for byte savings, ratio, and human-readable formatting.
 */
export function getCompressionSummary(
  originalSize: number,
  compressedSize: number
): CompressionSummary {
  const savedBytes = calculateSavedBytes(originalSize, compressedSize);
  const compressionRatio = calculateCompressionRatio(
    originalSize,
    compressedSize
  );

  return {
    savedBytes,
    compressionRatio,
    formattedOriginalSize: formatBytes(originalSize),
    formattedCompressedSize: formatBytes(compressedSize),
    formattedSavedBytes: formatBytes(savedBytes),
  };
}
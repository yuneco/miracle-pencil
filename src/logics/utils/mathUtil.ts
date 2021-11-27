export const constraint = (v: number, min: number, max: number): number => {
  return Math.max(min, Math.min(max, v))
}

/**
 * vをstep刻みに丸めます
 * @param v 
 * @param step 
 * @param start 
 */
export const stepValue = (v: number, step: number, start = 0): number => {
  return start + Math.round((v - start) / step) * step
}
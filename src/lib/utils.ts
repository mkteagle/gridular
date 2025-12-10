import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { CSSObject } from 'tss-react';

/**
 * Merges Tailwind classes using clsx and tailwind-merge
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Merges TSS-React style objects with Tailwind classes
 * Accepts both stringified TSS objects and regular Tailwind class strings
 */
export function mergeStyles(
  tssStyles?: CSSObject | string,
  tailwindClasses?: string
): string {
  // If tssStyles is a string (already processed), treat it as a class name
  if (typeof tssStyles === 'string') {
    return cn(tssStyles, tailwindClasses);
  }

  // If it's an object, we can't directly convert CSS-in-JS to classes
  // In this case, return the Tailwind classes
  // The TSS object would need to be processed by makeStyles/withStyles
  return cn(tailwindClasses);
}

/**
 * Convert TSS-React CSSObject to inline styles
 * Useful when you need to apply TSS styles directly
 */
export function tssToInlineStyles(cssObject?: CSSObject): React.CSSProperties {
  if (!cssObject) return {};

  // Simple conversion - camelCase keys are already compatible with React
  return cssObject as React.CSSProperties;
}

/**
 * Spacing helper (Material-UI style)
 * spacing(1) => 4px, spacing(2) => 8px, etc.
 */
export function spacing(...values: number[]): string {
  return values.map(v => `${v * 4}px`).join(' ');
}

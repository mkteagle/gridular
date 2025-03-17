import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { CSSObject } from "tss-react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Merges TSS-React styles with Tailwind classes
 *
 * @param tssStyles - TSS-React style object
 * @param tailwindClasses - Tailwind class string or array of strings
 * @returns A style object for React components
 */
export function mergeStyles<T extends object = {}>(
  tssStyles: CSSObject | undefined,
  tailwindClasses: string | string[]
) {
  // Convert tailwind classes to string
  const tailwindClassString = Array.isArray(tailwindClasses)
    ? tailwindClasses.join(" ")
    : tailwindClasses;

  // If no TSS styles, just return className with Tailwind
  if (!tssStyles) {
    return { className: tailwindClassString };
  }

  // Extract className from TSS styles if it exists
  const { className: tssClassName, ...otherStyles } = tssStyles;

  // Combine classNames using the cn utility
  const mergedClassName = tssClassName
    ? cn(tssClassName, tailwindClassString)
    : tailwindClassString;

  // Return merged styles
  return {
    ...otherStyles,
    className: mergedClassName,
  };
}
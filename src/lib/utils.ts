import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function cleanTaskDetail(detail?: string): string {
  if (!detail) return "";
  return detail
    .replace(/\s*•\s*Repos\s*(strict)?\s*(:\s*)?\d+s?/gi, "")
    .replace(/\s*•\s*Repos\s*(strict)?\s*/gi, "")
    .replace(/Repos\s*strict\s*(:\s*)?\d+s?/gi, "")
    .replace(/Repos\s*(:\s*)?\d+s?/gi, "")
    .trim();
}

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind classes
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Delays execution for a set amount of time.
 * Useful for simulating loading states or pacing animations.
 */
export function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
import { useState, useEffect } from "react";

/**
 * Custom hook to detect if the current viewport matches a media query.
 * @param query The media query string (e.g. "(max-width: 768px)")
 * @returns boolean indicating match status
 */
export function useMediaQuery(query: string): boolean {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        // SSR Check: window is undefined on the server
        if (typeof window === "undefined") return;

        const media = window.matchMedia(query);

        // Set initial value
        setMatches(media.matches);

        // Define listener
        const listener = (e: MediaQueryListEvent) => setMatches(e.matches);

        // Modern browsers use addEventListener, older ones use addListener
        if (media.addEventListener) {
            media.addEventListener("change", listener);
        } else {
            // Fallback for older Safari/IE
            media.addListener(listener);
        }

        return () => {
            if (media.removeEventListener) {
                media.removeEventListener("change", listener);
            } else {
                media.removeListener(listener);
            }
        };
    }, [query]);

    return matches;
}
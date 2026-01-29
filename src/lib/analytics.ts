// Google Analytics button click tracking utility

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Tracks a button click event in Google Analytics
 * @param label - Unique identifier for the button (e.g., "hero_book_discovery_call")
 * @param buttonText - The visible text on the button
 * @param destination - Where the click leads (URL or path)
 */
export const trackButtonClick = (
  label: string,
  buttonText: string,
  destination: string
): void => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "cta_click", {
      button_label: label,
      button_text: buttonText,
      destination: destination,
      page_location: window.location.pathname,
    });
  }
};

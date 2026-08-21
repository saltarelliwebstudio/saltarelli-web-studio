import { useSyncExternalStore } from "react";

/**
 * Whether the chat panel is open, shared between `Chatbot` and `StickyBookButton`.
 *
 * Both live in the bottom-right corner. The open chat panel covers the sticky
 * "Book a Free Demo" button, so the button hides while the panel is up. They are
 * mounted as siblings in App.tsx with no common ancestor to hold this in, and a
 * whole context provider for one boolean is more plumbing than it's worth.
 */
let isChatOpen = false;
const listeners = new Set<() => void>();

export function setChatOpen(open: boolean) {
  if (isChatOpen === open) return;
  isChatOpen = open;
  listeners.forEach((l) => l());
}

export function useChatOpen(): boolean {
  return useSyncExternalStore(
    (onChange) => {
      listeners.add(onChange);
      return () => listeners.delete(onChange);
    },
    () => isChatOpen,
    () => false // server/prerender snapshot — the panel is never open on first paint
  );
}

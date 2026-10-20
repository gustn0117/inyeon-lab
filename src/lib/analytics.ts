"use client";

declare global { interface Window { fbq?: (...args: unknown[]) => void; } }

// Send only event categories and program identifiers; never send form text, contact details or photos.
export function trackCoachingEvent(event: "Lead" | "InitiateCheckout" | "CompleteRegistration", data: Record<string, string | number> = {}) {
  try { window.fbq?.("track", event, data); } catch { /* Analytics must never interrupt an application. */ }
}

"use client";

import { useState, useEffect, useRef, useCallback } from "react";

/**
 * useScrollspy — tracks which section is currently dominant in the viewport.
 *
 * Returns an empty string ("") when no tracked section is in view (e.g. the
 * hero or CTA/footer area), so callers can hide the active indicator entirely.
 * Also updates window.location.hash via history.replaceState as sections change.
 *
 * @param sectionIds  Ordered list of element IDs to observe (nav sections only).
 * @param offset      Pixels from the top of the viewport used as the trigger line.
 */
export function useScrollspy(sectionIds: string[], offset = 80): string {
  const [activeId, setActiveId] = useState<string>("");
  const activeIdRef = useRef(activeId);
  activeIdRef.current = activeId;

  const updateActive = useCallback((id: string) => {
    if (id === activeIdRef.current) return;
    setActiveId(id);

    // Sync URL hash without a full navigation / scroll-jump.
    if (typeof window !== "undefined") {
      if (id) {
        history.replaceState(null, "", `#${id}`);
      } else {
        // Back in hero / footer — clear the hash cleanly.
        history.replaceState(null, "", window.location.pathname);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || sectionIds.length === 0) return;

    const handleScroll = () => {
      // At the very top → no section is active.
      if (window.scrollY < 80) {
        updateActive("");
        return;
      }

      // At the very bottom → last nav section is active.
      const scrollBottom = window.scrollY + window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      if (scrollBottom >= docHeight - 10) {
        updateActive(sectionIds[sectionIds.length - 1]);
        return;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // IntersectionObserver: triggers when a section's top half enters the
    // trigger band just below the navbar.
    const rootMargin = `-${offset}px 0px -50% 0px`;

    const observer = new IntersectionObserver(
      (entries) => {
        // Work through entries: the one that is intersecting wins.
        // If multiple are intersecting simultaneously (fast scroll), prefer
        // the one whose bounding rect top is closest to the offset line.
        const intersecting = entries.filter((e) => e.isIntersecting);
        if (intersecting.length === 0) return;

        const best = intersecting.reduce((a, b) =>
          Math.abs(a.boundingClientRect.top - offset) <
          Math.abs(b.boundingClientRect.top - offset)
            ? a
            : b
        );
        updateActive(best.target.id);
      },
      { rootMargin, threshold: 0 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    // Set initial state on mount.
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, [sectionIds, offset, updateActive]);

  return activeId;
}

"use client";

import { useEffect, useState } from "react";

import Navbar, { MobileFloatingDock } from "./Navbar";

/**
 * Renders the fixed desktop navbar (hidden on mobile screens) and hides it
 * while the element matching `watchId` (the Timeline section) is within the viewport.
 * On mobile screens, renders the FloatingDock.
 */
const StickyNavbar = ({ watchId = "timeline-section" }: { watchId?: string }) => {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const target = document.getElementById(watchId);
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => setHidden(entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(target);

    return () => observer.disconnect();
  }, [watchId]);

  return (
    <>
      {/* Top Header - Desktop only */}
      <div
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 hidden md:block ${
          hidden
            ? "pointer-events-none -translate-y-full opacity-0"
            : "translate-y-0 opacity-100"
        }`}
      >
        <Navbar />
      </div>

      {/* Floating Dock - Mobile screens only */}
      <MobileFloatingDock />
    </>
  );
};

export default StickyNavbar;

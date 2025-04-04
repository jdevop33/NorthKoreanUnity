"use client";

import { useState, useEffect } from 'react';

export function useScrollThreshold(threshold: number = 100): boolean {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Check initial scroll position in case the page loads scrolled down
    const checkScroll = () => {
        setIsScrolled(window.scrollY > threshold);
    };

    checkScroll(); // Initial check

    window.addEventListener('scroll', checkScroll, { passive: true });
    return () => window.removeEventListener('scroll', checkScroll);
  }, [threshold]); // Re-run effect if threshold changes

  return isScrolled;
}

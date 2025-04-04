"use client";

import { useState, useEffect, useRef, RefObject } from 'react';

interface IntersectionObserverOptions extends IntersectionObserverInit {}

export function useIntersectionObserver(
  options?: IntersectionObserverOptions
): [RefObject<any>, boolean] { // Returns ref and isIntersecting state
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<any>(null); // Use `any` for flexibility with element types

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      // Update state when intersection changes
      setIsIntersecting(entry.isIntersecting);
    }, options);

    observer.observe(element);

    // Cleanup observer on component unmount
    return () => {
      observer.disconnect();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref.current, options?.root, options?.rootMargin, options?.threshold]); // Re-run if element or options change

  return [ref, isIntersecting];
}

"use client";

import { useState, useEffect, useRef, RefObject } from 'react';

// Use IntersectionObserverInit directly
// Default generic T to HTMLElement, as it's the most common target for section refs
export function useIntersectionObserver<T extends HTMLElement = HTMLElement>(
  options?: IntersectionObserverInit
): [RefObject<T>, boolean] { // Returns typed ref and isIntersecting state
  const [isIntersecting, setIsIntersecting] = useState(false);
  // useRef<T>(null) correctly returns RefObject<T>, where T is the HTMLElement (or specific subtype)
  const ref = useRef<T>(null); 

  useEffect(() => {
    const currentElement = ref.current; // Get the current element inside the effect
    if (!currentElement) return;

    const observer = new IntersectionObserver(([entry]) => {
      // Update state when intersection changes
      setIsIntersecting(entry.isIntersecting);
    }, options);

    observer.observe(currentElement);

    // Cleanup observer on component unmount
    return () => {
      observer.disconnect();
    };
  // Depend only on stable options object references, not ref.current (element)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options?.root, options?.rootMargin, options?.threshold]); // Simplified deps

  // Explicitly cast the ref in the return to satisfy the type checker
  return [ref as RefObject<T>, isIntersecting];
}

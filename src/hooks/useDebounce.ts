// @author dilip.yadav@shorelineiot.com

import { useState, useEffect } from 'react';

/**
 * Custom React hook that debounces a value by a specified delay.
 * Returns a debounced version of the input value that only updates
 * after the specified delay has elapsed without changes.
 *
 * @template T - The type of the value to debounce.
 * @param {T} value - The value to debounce.
 * @param {number} delay - The debounce delay in milliseconds.
 * @returns {T} - The debounced value.
 *
 * @example
 * const debouncedSearch = useDebounce(searchTerm, 300);
 *
 * @author dilip.yadav@shorelineiot.com
 */
export function useDebounce<T>(value: T, delay: number): T {
  // State to hold the debounced value
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect((): (() => void) => {
    // Set up a timer to update the debounced value after the delay
    const handler = setTimeout(() => {
      setDebouncedValue(value); // Update debounced value after delay
    }, delay);

    // Cleanup function to clear the timer if value or delay changes
    return (): void => {
      clearTimeout(handler); // Prevent updating if effect is cleaned up
    };
  }, [value, delay]); // Only re-run effect if value or delay changes

  // Return the latest debounced value
  return debouncedValue;
}
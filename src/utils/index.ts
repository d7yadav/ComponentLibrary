/**
 * @fileoverview Utility functions barrel exports
 * @author Dilip Yadav <dilip.sm.yadav@gmail.com>
 */

/**
 * Combines class names conditionally
 */
export const classNames = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};

/**
 * Formats a number with locale-specific formatting
 */
export const formatNumber = (value: number, locale = 'en-US'): string => {
  return new Intl.NumberFormat(locale).format(value);
};
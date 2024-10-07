// This code shared with backend

import { onMount, atom } from 'nanostores';

// returns an atom that updates every `ms` milliseconds
export const intervalStore = (ms: number) => {
  const $time = atom<number>(Date.now());

  onMount($time, () => {
    $time.set(Date.now());

    const updating = setInterval(() => {
      $time.set(Date.now());
    }, ms);

    return () => {
      clearInterval(updating);
    };
  });

  return $time;
};


/**
 * Adds two decimal values with precision handling.
 * @param {number} value1 - The first value.
 * @param {number} value2 - The second value.
 * @param {number} precision - The number of decimal places to handle.
 * @returns {number} - The sum of the two values.
 */
export const addDecimals = (value1: number, value2: number, precision: number = 2): number => {
  const factor = Math.pow(10, precision);
  const result = (Math.round(value1 * factor) + Math.round(value2 * factor)) / factor;
  return result;
};

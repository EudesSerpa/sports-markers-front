/**
 * It creates an array of numbers from a given start and end value.
 * @returns An array of numbers from start to end.
 */
export const range = ({ start, end }) => {
  const length = end - start + 1;

  return Array.from({ length }, (_, idx) => idx + start);
};

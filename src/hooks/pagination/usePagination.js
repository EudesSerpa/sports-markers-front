import { useMemo } from "react";
import { range } from "../../helpers/array/range";

export const DOTS = "DOTS";
const FIRST_PAGE_INDEX = 1;

export const usePagination = ({
  dataForPage,
  totalData,
  totalPageCount,
  currentPage,
  siblingCount = 1,
}) => {
  const paginationRange = useMemo(() => {
    // Pages count is determined as siblingCount + (firstPage + lastPage + currentPage + 2*DOTS) => 5
    const totalPageNumbers = siblingCount + 5;

    /* Case 1:
      If the number of pages is less than the page numbers we want to show in our
      component, we return the range [1..totalPageCount]
    */
    if (totalPageNumbers >= totalPageCount) {
      return range({ start: FIRST_PAGE_INDEX, end: totalPageCount });
    }

    /*
    	Calculate left and right sibling index and make sure they are within range 1 and totalPageCount
    */
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount
    );

    // Show dots only when there's a page number between the extremes of sibling and the page limits
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    // Rights dots to be shown
    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = range({ start: FIRST_PAGE_INDEX, end: leftItemCount });

      return [...leftRange, DOTS, totalPageCount];
    }

    // Lefts dots to be shown
    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = range({
        start: totalPageCount - rightItemCount + 1,
        end: totalPageCount,
      });

      return [FIRST_PAGE_INDEX, DOTS, ...rightRange];
    }

    // Both left and right dots to be shown
    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range({
        start: leftSiblingIndex,
        end: rightSiblingIndex,
      });

      return [FIRST_PAGE_INDEX, DOTS, ...middleRange, DOTS, totalPageCount];
    }
  }, [totalData, dataForPage, currentPage, siblingCount]);

  return paginationRange || [];
};

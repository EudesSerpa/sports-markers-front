import { MdArrowLeft, MdArrowRight } from "react-icons/md";
import { DOTS, usePagination } from "../../hooks/pagination/usePagination";
import { PageNumberItem } from "./Item/PageNumberItem";
import { DotItem } from "./Item/DotItem";
import "./index.css";

/**
 * Source code: https://www.freecodecamp.org/news/build-a-custom-pagination-component-in-react/
 */

export const Pagination = ({
  siblingCount = 1,
  dataForPage,
  totalData,
  totalPageCount,
  currentPage,

  prevPage,
  nextPage,
  hasPrevPage,
  hasNextPage,
  loadingPage,

  onPageChange,
}) => {
  const paginationRange = usePagination({
    siblingCount,
    dataForPage,
    totalData,
    totalPageCount,
    currentPage,
  });

  // If there's only one page, we don't render the component
  if (totalPageCount < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(nextPage);
  };

  const onPrevious = () => {
    onPageChange(prevPage);
  };

  const handlePageChange = (page) => {
    onPageChange(page);
  };

  const pageNumbersItems = paginationRange.map((pageNumber, idx) => {
    if (pageNumber === DOTS) {
      return <DotItem key={`${pageNumber}-${idx}`} />;
    }

    return (
      <PageNumberItem
        key={`${pageNumber}-${idx}`}
        pageNumber={pageNumber}
        isCurrentPage={pageNumber === currentPage}
        handlePageChange={handlePageChange}
      />
    );
  });

  return (
    <ul className="pagination">
      <li>
        <button
          className={`pagination__button pagination__button--arrow ${
            !hasPrevPage ? "pagination__button--disabled" : ""
          }`}
          onClick={onPrevious}
          disabled={loadingPage || !hasPrevPage || currentPage === 1}
        >
          <MdArrowLeft />
        </button>
      </li>

      {pageNumbersItems}

      <li>
        <button
          className={`pagination__button pagination__button--arrow ${
            !hasNextPage ? "pagination__button--disabled" : ""
          }`}
          onClick={onNext}
          disabled={
            loadingPage || !hasNextPage || currentPage === totalPageCount
          }
        >
          <MdArrowRight />
        </button>
      </li>
    </ul>
  );
};

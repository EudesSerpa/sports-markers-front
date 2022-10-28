export const PageNumberItem = ({
  pageNumber,
  isCurrentPage,
  handlePageChange,
}) => {
  return (
    <li>
      <button
        className={`pagination__button ${
          isCurrentPage ? "pagination__button--active" : ""
        }`}
        onClick={() => handlePageChange(pageNumber)}
      >
        {pageNumber}
      </button>
    </li>
  );
};

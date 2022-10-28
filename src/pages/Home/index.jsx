import { useData } from "../../hooks/data/useData";
import { ListOfEvents } from "../../components/ListOfEvents";
import { Pagination } from "../../components/Pagination";
import { Loader } from "../../components/Loader";

export const Home = () => {
  const {
    DATA_FOR_PAGE,
    totalData,
    data,
    currentPage,
    totalPages,
    prevPage,
    nextPage,
    hasNextPage,
    hasPrevPage,
    loadingPage,
    setCurrentPage,
  } = useData();

  return (
    <section className="section-page">
      <h1 className="section-page__title">Main Events</h1>

      <div className="section-page__body">
        {loadingPage ? (
          <Loader color="var(--primary-color)" />
        ) : (
          <ListOfEvents events={data} />
        )}
      </div>

      <Pagination
        dataForPage={DATA_FOR_PAGE}
        totalData={totalData}
        totalPageCount={totalPages}
        currentPage={currentPage}
        prevPage={prevPage}
        nextPage={nextPage}
        hasPrevPage={hasPrevPage}
        hasNextPage={hasNextPage}
        loadingPage={loadingPage}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </section>
  );
};

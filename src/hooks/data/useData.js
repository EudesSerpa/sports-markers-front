import { useState, useEffect, useRef } from "react";
import { getEvents } from "../../services/events/getEvents";

const INITIAL_PAGE = 1;
const DATA_FOR_PAGE = 10;

export const useData = () => {
  const paginationData = useRef({});
  const [currentPage, setCurrentPage] = useState(INITIAL_PAGE);
  const [loadingPage, setLoadingPage] = useState(false);
  const [data, setData] = useState(() => {
    const eventsDataCached = window.localStorage.getItem(
      `events-${INITIAL_PAGE}`
    );
    return JSON.parse(eventsDataCached)?.docs || [];
  });

  useEffect(() => {
    const getCurrentData = () => {
      const eventsDataCached = window.localStorage.getItem(
        `events-${currentPage}`
      );
      const eventsData = JSON.parse(eventsDataCached);

      if (eventsData) {
        paginationData.current = eventsData;
        setData(eventsData.docs);
        return;
      }

      setLoadingPage(true);

      getEvents({ limit: DATA_FOR_PAGE, page: currentPage - 1 })
        .then((data) => {
          paginationData.current = data;

          // window.localStorage.setItem(
          //   `events-${currentPage || INITIAL_PAGE}`,
          //   JSON.stringify(data)
          // );

          setData(data.docs);
        })
        .catch((error) => {
          console.log(
            "🚀 ~ file: useData.js ~ line 47 ~ useEffect ~ error",
            error
          );
        })
        .finally(() => {
          setLoadingPage(false);
        });
    };

    getCurrentData();
  }, [currentPage]);

  return {
    DATA_FOR_PAGE,
    data,
    totalData: paginationData.current.totalDocs,
    totalPages: paginationData.current.totalPages,
    currentPage: paginationData.current.page,
    prevPage: paginationData.current.prevPage,
    nextPage: paginationData.current.nextPage,
    hasPrevPage: paginationData.current.hasPrevPage,
    hasNextPage: paginationData.current.hasNextPage,
    loadingPage,
    setCurrentPage,
  };
};

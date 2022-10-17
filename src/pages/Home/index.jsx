import { useState, useEffect } from "react";
import { getEvents } from "../../services/events/getEvents";
import { ListOfEvents } from "../../components/ListOfEvents";

const EVENTS_TO_DISPLAY = 12;

export const Home = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    let didCancel = false;

    if (!didCancel) {
      getEvents({ limit: EVENTS_TO_DISPLAY }).then(setEvents);
    }

    return () => {
      didCancel = true;
    };
  }, []);

  return (
    <section className="section-page">
      <h1 className="section-title">Main Events</h1>

      <ListOfEvents events={events} />
    </section>
  );
};

import Event from "../Event";
import "./index.css";

export const ListOfEvents = ({ events, editableEvents = false }) => {
  const eventsToDisplay = events.map(
    ({ _id, name, teams, sport, results, initDate }) => (
      <Event
        key={_id}
        _id={_id}
        showOptions={editableEvents}
        name={name}
        results={results}
        sport={sport}
        teams={teams}
        initDate={initDate}
      />
    )
  );

  return <div className="events-container">{eventsToDisplay}</div>;
};

import { Fragment, memo } from "react";
import { Team } from "../Team";
import "./index.css";

const RIGHT_SIDE_TEAM = 1;

export const Event = ({ _id = "", name, teams, sport, results, initDate }) => {
  const teamsSection = teams.map(({ name, imageURI }, idx) => {
    const isRightSide = idx === RIGHT_SIDE_TEAM;
    const reverseOrderClassName = isRightSide ? "event__team--left-result" : "";

    return (
      <Fragment key={`${name}-${_id}`}>
        <div className={`event__team ${reverseOrderClassName}`}>
          <Team name={name} imageURI={imageURI} />
          <p className="event__result">{results[idx]}</p>
        </div>

        {!isRightSide && <p className="event__vs-text">Vs</p>}
      </Fragment>
    );
  });

  return (
    <article className="event">
      <header className="event__header">
        <h4 className="event__title">{name}</h4>
      </header>

      <section className="event__body">{teamsSection}</section>

      <footer className="event__footer">
        <p className="event__sport">{sport.name}</p>
        <p className="event__date">{initDate.toLocaleString()}</p>
      </footer>
    </article>
  );
};

export default memo(Event, (prevPros, nextProps) => {
  return prevPros._id === nextProps._id;
});

import { Fragment, memo, useRef, useState, useEffect } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { useUser } from "../../hooks/auth/useUser";
import { Team } from "../Team";
import Modal from "../Modal";
import "./index.css";

const RIGHT_SIDE_TEAM = 1;

export const Event = ({
  showOptions,
  _id,
  name,
  teams,
  sport,
  results,
  initDate,
}) => {
  const { removeEvent } = useUser();
  const refToSaveFocus = useRef(null);
  const refToFocusModal = useRef(null);
  const [showModal, setShowModal] = useState(false);

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

  useEffect(() => {
    if (showModal) {
      refToFocusModal.current.focus();
    }
  }, [showModal]);

  const handleDelete = () => {
    removeEvent({ id: _id });
    handleCloseModal();
  };

  const handleOpenModal = ({ target }) => {
    refToSaveFocus.current ??= target;
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    refToSaveFocus.current?.focus();
  };

  return (
    <>
      <article className={`event ${showOptions ? "event--with-options" : ""}`}>
        {showOptions && (
          <>
            <button
              onClick={handleOpenModal}
              className="event__options event__options--delete"
              aria-label={`Delete ${name} event`}
            >
              <MdDelete />
            </button>

            <Link
              to={`./edit/${_id}`}
              state={{
                name,
                teams,
                sport,
                results,
                initDate,
              }}
              className="event__options event__options--edit"
              aria-label={`Edit ${name} event`}
            >
              <MdEdit />
            </Link>
          </>
        )}

        <header className="event__header">
          <h4 className="event__title">{name}</h4>
        </header>

        <section className="event__body">{teamsSection}</section>

        <footer className="event__footer">
          <p className="event__sport">{sport.name}</p>
          <p className="event__date">{new Date(initDate).toLocaleString()}</p>
        </footer>
      </article>

      {showModal && (
        <Modal onClose={handleCloseModal}>
          <article
            role="alert"
            className="event-modal"
            tabIndex={-1}
            ref={refToFocusModal}
          >
            <h4 className="event-modal__title">
              Are you sure you want to delete this event?
            </h4>

            <p className="event-modal__text">
              Event to delete:
              <span className="event-modal__text--name"> {name}</span>
            </p>

            <footer className="event-modal__buttons">
              <button
                className="event-modal__button event-modal__button--cancel"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button
                className="event-modal__button event-modal__button--delete"
                onClick={handleDelete}
              >
                Delete
              </button>
            </footer>
          </article>
        </Modal>
      )}
    </>
  );
};

export default memo(Event, (prevPros, nextProps) => {
  return prevPros._id === nextProps._id;
});

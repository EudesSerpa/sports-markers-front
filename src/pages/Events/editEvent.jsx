import { useCallback, useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { getSingleEvent } from "../../services/events/getSingleEvent";
import { getSports } from "../../services/sports/getSports";
import { getTeams } from "../../services/teams/getTeams";
import { fieldState } from "../../helpers/form/fieldState";
import { validations } from "../../helpers/form/validations";
import { Loader } from "../../components/Loader";
import { Input } from "../../components/Input";
import Modal from "../../components/Modal";
import "./index.css";
import { useUser } from "../../hooks/auth/useUser";

const setDefaultValues = (originData) => ({
  nameEvent: originData.name,
  sport: originData.sport.name,
  "team-1": originData.teams[0].name,
  "team-1-image": originData.teams[0].imageURI,
  "team-1-result": originData.results[0],
  "team-2": originData.teams[1].name,
  "team-2-image": originData.teams[1].imageURI,
  "team-2-result": originData.results[1],
  initDate: originData.initDate.replace(/z/i, ""),
});

const EditEvent = () => {
  const { editEvent } = useUser();
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [sports, setSports] = useState([]);
  const [teams, setTeams] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const {
    formState: { errors, isSubmitting, isSubmitted, isSubmitSuccessful },
    register,
    getFieldState,
    handleSubmit,
    reset,
    setError,
    clearErrors,
  } = useForm({
    mode: "onBlur",
  });

  const nameState = getFieldState("name");
  const initDateState = getFieldState("initDate");

  useEffect(() => {
    let didCancel = false;

    async function startFetching() {
      const teams = await getTeams({});
      const sports = await getSports();
      if (!didCancel) {
        setTeams(teams);
        setSports(sports);
      }
    }

    startFetching();

    return () => {
      didCancel = true;
    };
  }, []);

  useEffect(() => {
    if (location.state) {
      reset(setDefaultValues(location.state));
      return;
    }

    let didCancel = false;

    async function startFetching() {
      try {
        const event = await getSingleEvent({ id });
        if (!didCancel) {
          reset(setDefaultValues(event));
        }
      } catch (error) {
        setError("connection", {
          type: error.type,
          message: error.message,
        });
      }
    }

    startFetching();

    return () => {
      didCancel = true;
    };
  }, [sports]);

  const sportsToSelect = useCallback(() => {
    return sports.map(({ name }) => (
      <option value={name} key={name}>
        {name}
      </option>
    ));
  }, [sports]);

  const teamsToSelect = useCallback(() => {
    return teams.map(({ name }) => (
      <option value={name} key={name}>
        {name}
      </option>
    ));
  }, [teams]);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const onSubmit = async (data) => {
    try {
      const eventData = {
        name: data.nameEvent,
        sport: { name: data.sport },
        teams: [
          { name: data["team-1"], imageURI: data["team-1-image"] },
          { name: data["team-2"], imageURI: data["team-2-image"] },
        ],
        results: [Number(data["team-1-result"]), Number(data["team-2-result"])],
        initDate: data.initDate,
      };

      await editEvent({ id, eventData });
      reset();
      navigate("/dashboard", { replace: true });
    } catch (error) {
      setError("connection", {
        type: error.type,
        message: error.message,
      });
    } finally {
      setShowModal(true);

      setTimeout(() => {
        setShowModal(false);
        clearErrors();
      }, 3000);
    }
  };

  return (
    <section className="section-page">
      <h1 className="section-page__title ta-center">Edit event</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <Input
          label="Name"
          name="nameEvent"
          register={register}
          errors={errors}
          state={fieldState(nameState, isSubmitted)}
          isRequired={true}
          validations={validations.createEvent.name}
        />

        <div className="form__item">
          <label htmlFor="sport">Sport</label>
          <select
            id="sport"
            className="form__input"
            {...register("sport", validations.createEvent.sport)}
            required
          >
            {sportsToSelect()}
          </select>
        </div>

        <fieldset className="team-fieldset">
          <legend>Team 1</legend>

          <div className="form__item">
            <label htmlFor="team-1">Name</label>
            <select
              id="team-1"
              className="form__input"
              {...register("team-1", validations.createEvent.teamName)}
              required
            >
              {teamsToSelect()}
            </select>
          </div>

          <Input
            type="url"
            label="Image URL (optional)"
            name="team-1-image"
            register={register}
            errors={errors}
            validations={validations.createEvent.teamImage}
          />

          <Input
            type="number"
            label="Result"
            name="team-1-result"
            register={register}
            errors={errors}
            validations={validations.createEvent.teamResult}
          />
        </fieldset>

        <fieldset className="team-fieldset">
          <legend>Team 2</legend>

          <div className="form__item">
            <label htmlFor="team-2">Name</label>
            <select
              id="team-2"
              className="form__input"
              {...register("team-2", validations.createEvent.teamName)}
              required
            >
              {teamsToSelect()}
            </select>
          </div>

          <Input
            type="url"
            label="Image URL (optional)"
            name="team-2-image"
            register={register}
            errors={errors}
            validations={validations.createEvent.teamImage}
          />

          <Input
            type="number"
            label="Result"
            name="team-2-result"
            register={register}
            errors={errors}
            isRequired={true}
            validations={validations.createEvent.teamResult}
          />
        </fieldset>

        <Input
          type="datetime-local"
          label="Date"
          name="initDate"
          register={register}
          errors={errors}
          state={fieldState(initDateState, isSubmitted)}
          isRequired={true}
          validations={validations.createEvent.initDate}
        />

        <div className="form__buttons">
          <Link
            to={-1}
            className="form__button form__button--cancel"
            disabled={isSubmitting}
          >
            <span>Cancel</span>
          </Link>
          <button className="form__button" disabled={isSubmitting}>
            {isSubmitting ? (
              <Loader size="22px" color="var(--on-primary)" />
            ) : (
              <span>Edit</span>
            )}
          </button>
        </div>
      </form>

      {showModal && (
        <Modal
          onClose={handleCloseModal}
          status={isSubmitSuccessful ? "success" : "error"}
        >
          <p role="alert">
            {isSubmitSuccessful
              ? "Event edited successfully"
              : "Error: " + errors.connection.message}
          </p>
        </Modal>
      )}
    </section>
  );
};

export default EditEvent;

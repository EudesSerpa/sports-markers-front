import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/auth/useAuth";
import { useUser } from "../../hooks/auth/useUser";
import { fieldState } from "../../helpers/form/fieldState";
import { validations } from "../../helpers/form/validations";
import { getSports } from "../../services/sports/getSports";
import { postSport } from "../../services/sports/postSport";
import { getTeams } from "../../services/teams/getTeams";
import { postTeam } from "../../services/teams/postTeam";
import { Loader } from "../../components/Loader";
import { Input } from "../../components/Input";
import Modal from "../../components/Modal";
import { Event } from "../../components/Event";
import "./index.css";

const defaultValues = {
  nameEvent: "",
  initDate: "",
  sport: "",
};

// TODO: Separate concerns (teams, sports, modals, form fields)
const CreateEvent = () => {
  const { jwt } = useAuth();
  const { addEvent } = useUser();
  const navigate = useNavigate();
  const [sports, setSports] = useState([]);
  const [teams, setTeams] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const {
    formState: { errors, isSubmitting, isSubmitted, isSubmitSuccessful },
    register,
    getFieldState,
    setValue,
    handleSubmit,
    watch,
    reset,
    setError,
    clearErrors,
  } = useForm({
    mode: "onBlur",
    defaultValues,
  });

  const watchAllFields = watch();

  const nameState = getFieldState("name");
  const initDateState = getFieldState("initDate");
  const sportState = getFieldState("sport");

  const team1Data = teams.find(
    (team) => team.name === watchAllFields["team-1"]
  );

  const team2Data = teams.find(
    (team) => team.name === watchAllFields["team-2"]
  );

  const name = watchAllFields.nameEvent || "Event Name";
  const sport = { name: watchAllFields.sport || "Sport" };
  const eventTeams = [
    {
      name: watchAllFields["team-1"] || "Team 1",
      imageURI: team1Data?.imageURI || watchAllFields["team-1-image"],
    },
    {
      name: watchAllFields["team-2"] || "Team 2",
      imageURI: team2Data?.imageURI || watchAllFields["team-2-image"],
    },
  ];
  const results = [
    Number(watchAllFields["team-1-result"]) || 0,
    Number(watchAllFields["team-2-result"]) || 0,
  ];
  const initDate = watchAllFields.initDate || "Date";

  useEffect(() => {
    let didCancel = false;

    if (!didCancel) {
      getSports().then(setSports);
    }

    return () => {
      didCancel = true;
    };
  }, []);

  useEffect(() => {
    let didCancel = false;

    if (!didCancel) {
      getTeams({}).then(setTeams);
    }

    return () => {
      didCancel = true;
    };
  }, []);

  useEffect(() => {
    if (team1Data?.imageURI) {
      setValue("team-1-image", team1Data?.imageURI);
    }
  }, [watchAllFields["team-1"]]);

  useEffect(() => {
    if (team2Data?.imageURI) {
      setValue("team-2-image", team2Data?.imageURI);
    }
  }, [watchAllFields["team-2"]]);

  const createTeams = (missingTeams) => {
    const promises = missingTeams.map(async (teamData) => {
      return await postTeam({ jwt, teamData });
    });

    Promise.all(promises).catch((error) => {
      console.log(
        "🚀 ~ file: createEvent.jsx ~ line 120 ~ Promise.all ~ creating team ~ error",
        error
      );
    });
  };

  const createSport = (sportData) => {
    postSport({ jwt, sportData }).catch((error) => {
      console.log(
        "🚀 ~ file: createEvent.jsx ~ line 129 ~ createSport ~ error",
        error
      );
    });
  };

  const onSubmit = async (data) => {
    try {
      const eventData = {
        name,
        sport,
        teams: eventTeams,
        results,
        initDate,
      };

      // Teams creation
      const missingTeams = [];
      eventTeams.forEach((eventTeam) => {
        const alreadyExist = teams.some((team) => team.name === eventTeam.name);

        if (!alreadyExist) {
          missingTeams.push({ ...eventTeam, sport: sport?.name });
        }
      });

      if (missingTeams.length) {
        createTeams(missingTeams);
      }

      // Sport creation
      const alreadyExist = sports.some(
        (eventSport) => eventSport.name === sport.name
      );

      if (!alreadyExist) {
        createSport(sport);
      }

      await addEvent({ eventData });
      reset(defaultValues);
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

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <section className="section-page">
      <h1 className="section-page__title ta-center">Create event</h1>

      <div className="preview-container">
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

          <Input
            label="Sport"
            name="sport"
            list="sports-list"
            register={register}
            errors={errors}
            state={fieldState(sportState, isSubmitted)}
            isRequired={true}
            validations={validations.createEvent.sport}
          />

          <fieldset className="team-fieldset">
            <legend>Team 1</legend>

            <Input
              label="Name"
              name="team-1"
              list="teams-list"
              register={register}
              errors={errors}
              isRequired={true}
              validations={validations.createEvent.teamName}
            />

            <Input
              type="url"
              label="Image URL (optional)"
              name="team-1-image"
              register={register}
              errors={errors}
              isRequired={true}
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

            <Input
              label="Name"
              name="team-2"
              list="teams-list"
              register={register}
              errors={errors}
              isRequired={true}
              validations={validations.createEvent.teamName}
            />

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

          <button className="form__button" disabled={isSubmitting}>
            {isSubmitting ? (
              <Loader size="22px" color="var(--on-primary)" />
            ) : (
              <span>Create</span>
            )}
          </button>

          <datalist id="sports-list">
            {sports.map(({ name }) => (
              <option value={name} key={name}>
                {name}
              </option>
            ))}
          </datalist>

          <datalist id="teams-list">
            {teams.map(({ name }) => (
              <option value={name} key={name}>
                {name}
              </option>
            ))}
          </datalist>
        </form>

        <Event
          name={name}
          sport={sport}
          teams={eventTeams}
          results={results}
          initDate={initDate}
        />
      </div>

      {showModal && (
        <Modal
          onClose={handleCloseModal}
          status={isSubmitSuccessful ? "success" : "error"}
        >
          <p role="alert">
            {isSubmitSuccessful
              ? "Event created successfully"
              : "Error: " + errors.connection.message}
          </p>
        </Modal>
      )}
    </section>
  );
};

export default CreateEvent;

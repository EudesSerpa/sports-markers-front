import { useCallback, useContext } from "react";
import jwtDecode from "jwt-decode";
import { UserContext } from "../../context/auth/UserContext";
import { postEvent } from "../../services/events/postEvent";
import { patchEvent } from "../../services/events/patchEvent";
import { deleteEvent } from "../../services/events/deleteEvent";

export const useUser = () => {
  const { events, jwt, setEvents } = useContext(UserContext);

  const getUser = useCallback(() => {
    const decodedJWT = jwtDecode(jwt);
    return { username: decodedJWT.username };
  }, [jwt]);

  const addEvent = useCallback(
    async ({ eventData }) => {
      try {
        const events = await postEvent({ jwt, eventData });
        setEvents(events);
      } catch (error) {
        console.log("🚀 ~ file: useUser.js ~ line 20 ~ error", error);
        throw new Error(error.message);
      }
    },
    [jwt]
  );

  const editEvent = useCallback(
    async ({ id, eventData }) => {
      try {
        const events = await patchEvent({ jwt, id, eventData });
        setEvents(events);
      } catch (error) {
        console.log("🚀 ~ file: useUser.js ~ line 35 ~ error", error);
        throw new Error(error.message);
      }
    },
    [jwt]
  );

  const removeEvent = useCallback(
    async ({ id }) => {
      try {
        const events = await deleteEvent({ jwt, id });
        setEvents(events);
      } catch (error) {
        console.log("🚀 ~ file: useUser.js ~ line 35 ~ error", error);
        throw new Error(error.message);
      }
    },
    [jwt]
  );

  return {
    getUser,
    events,
    setEvents,
    addEvent,
    editEvent,
    removeEvent,
  };
};

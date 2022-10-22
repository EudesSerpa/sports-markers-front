import { createContext, useState, useEffect } from "react";
import { getUserEvents } from "../../services/events/getUserEvents";

export const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [jwt, setJWT] = useState(() => window.sessionStorage.getItem("jwt"));
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Get user events on Login
    if (!jwt) return setEvents([]);
    let didCancel = false;

    if (!didCancel) {
      getUserEvents({ jwt })
        .then(setEvents)
        .catch((error) => {
          console.log(
            "🚀 ~ file: UserContext.jsx ~ line 17 ~ useEffect ~ error",
            error
          );
        });
    }

    return () => {
      didCancel = true;
    };
  }, [jwt]);

  const auth = {
    events,
    jwt,
    setJWT,
    setEvents,
  };

  return <UserContext.Provider value={auth}>{children}</UserContext.Provider>;
};

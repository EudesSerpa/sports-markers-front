import { createContext, useState } from "react";

export const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [jwt, setJWT] = useState(() => window.sessionStorage.getItem("jwt"));

  const auth = {
    jwt,
    setJWT,
  };

  return <UserContext.Provider value={auth}>{children}</UserContext.Provider>;
};

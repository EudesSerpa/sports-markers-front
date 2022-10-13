import { createContext, useState } from "react";

export const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [jwt, setJWT] = useState(() => window.sessionStorage.getItem("jwt"));

  const auth = {
    user,
    jwt,
    setUser,
    setJWT,
  };

  return <UserContext.Provider value={auth}>{children}</UserContext.Provider>;
};

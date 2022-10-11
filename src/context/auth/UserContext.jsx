import { createContext, useState } from "react";

export const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const auth = {
    user,
    setUser,
  };

  return <UserContext.Provider value={auth}>{children}</UserContext.Provider>;
};

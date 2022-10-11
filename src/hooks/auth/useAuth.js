import { useContext } from "react";
import { UserContext } from "../../context/auth/UserContext";

export const useAuth = () => {
  const { user, setUser } = useContext(UserContext);

  const login = ({ username, password }) => {
    setUser({ username });
  };

  const logout = () => {
    setUser(null);
  };

  return {
    user,
    login,
    logout,
    isLogged: Boolean(user),
  };
};

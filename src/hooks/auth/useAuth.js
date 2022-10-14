import { useCallback, useContext } from "react";
import { UserContext } from "../../context/auth/UserContext";
import { loginService } from "../../services/login";

export const useAuth = () => {
  const { user, jwt, setUser, setJWT } = useContext(UserContext);

  const login = useCallback(
    async ({ username, password }) => {
      try {
        const jwt = await loginService({ username, password });
        window.sessionStorage.setItem("jwt", jwt);
        setJWT(jwt);
        setUser({ username });
      } catch (error) {
        window.sessionStorage.removeItem("jwt");

        throw new Error(error.message);
      }
    },
    [setJWT]
  );

  const logout = useCallback(() => {
    window.sessionStorage.removeItem("jwt");
    setJWT(null);
  }, [setJWT]);

  return {
    isLogged: Boolean(jwt),
    user,
    login,
    logout,
  };
};

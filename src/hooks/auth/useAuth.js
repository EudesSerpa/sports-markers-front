import { useCallback, useContext, useState } from "react";
import { UserContext } from "../../context/auth/UserContext";
import { loginService } from "../../services/login";

export const useAuth = () => {
  const { user, jwt, setUser, setJWT } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const login = useCallback(
    ({ username, password }) => {
      setLoading(true);

      loginService({ username, password })
        .then((jwt) => {
          window.sessionStorage.setItem("jwt", jwt);
          setJWT(jwt);
          setUser({ username });
          setError(false);
        })
        .catch((error) => {
          console.error(
            "🚀 ~ file: useAuth.js ~ line 20 ~ login ~ error",
            error
          );

          window.sessionStorage.removeItem("jwt");
          setError(true);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [setJWT]
  );

  const logout = useCallback(() => {
    window.sessionStorage.removeItem("jwt");
    setJWT(null);
  }, [setJWT]);

  return {
    isLogged: Boolean(jwt),
    isLoginLoading: loading,
    hasLoginError: error,
    user,
    login,
    logout,
  };
};

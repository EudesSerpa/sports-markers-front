import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/auth/useAuth";

const Login = () => {
  const { login, isLogged } = useAuth();
  const navigate = useNavigate();
  const username = useRef("");
  const password = useRef("");

  useEffect(() => {
    if (isLogged) {
      navigate("/");
    }
  }, [isLogged]);

  const handleSubmit = (e) => {
    e.preventDefault();

    login({
      username: username.current.value,
      password: password.current.value,
    });
  };

  return (
    <>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            autoComplete="username"
            ref={username}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            autoComplete="current-password"
            ref={password}
          />
        </div>

        <button>Login</button>
      </form>
    </>
  );
};

export default Login;

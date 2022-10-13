import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { fieldState } from "../../helpers/form/fieldState";
import { validations } from "../../helpers/form/validations";
import { useAuth } from "../../hooks/auth/useAuth";
import { Input } from "../../components/Input";
import { Loader } from "../../components/Loader";

const defaultValues = {
  username: "",
  password: "",
};

const Login = () => {
  const navigate = useNavigate();
  const { login, isLogged } = useAuth();
  const {
    formState: { errors, isSubmitting, isSubmitted },
    register,
    getFieldState,
    handleSubmit,
  } = useForm({
    mode: "onBlur",
    defaultValues,
  });

  useEffect(() => {
    if (isLogged) {
      navigate("/");
    }
  }, [isLogged]);

  const onSubmit = (data) => {
    login(data);
  };

  const usernameState = getFieldState("username");
  const passwordState = getFieldState("password");

  return (
    <>
      <h1>Login</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <Input
          label="username"
          autoComplete="username"
          register={register}
          errors={errors}
          state={fieldState(usernameState, isSubmitted)}
          isRequired={true}
          validations={validations.username}
        />

        <Input
          type="password"
          label="password"
          hint="It must be between three (3) and twelve (12) characters"
          autoComplete="current-password"
          register={register}
          errors={errors}
          state={fieldState(passwordState, isSubmitted)}
          isRequired={true}
          validations={validations.password}
        />

        <button className="form__button" disabled={isSubmitting}>
          {isSubmitting ? (
            <Loader size="22px" color="var(--on-primary)" />
          ) : (
            <span>Login</span>
          )}
        </button>
      </form>
    </>
  );
};

export default Login;

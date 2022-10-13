import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { fieldState } from "../../helpers/form/fieldState";
import { validations } from "../../helpers/form/validations";
import { registerService } from "../../services/register";
import { useAuth } from "../../hooks/auth/useAuth";
import { Input } from "../../components/Input";
import { Loader } from "../../components/Loader";

const defaultValues = {
  username: "",
  password: "",
  "accept-terms-and-conditions": false,
};

const Register = () => {
  const navigate = useNavigate();
  const { login, isLogged, hasLoginError } = useAuth();
  const {
    formState: { errors, isSubmitting, isSubmitted },
    register,
    getFieldState,
    handleSubmit,
    reset,
  } = useForm({
    mode: "onBlur",
    defaultValues,
  });

  const onSubmit = async ({ username, password }) => {
    try {
      const userData = await registerService({ username, password });
      reset(defaultValues);
      // Do login automatically
      /*login(data);
  
      if (hasLoginError) {
        navigate("/login");
      } else {
        navigate("/");
      }*/
    } catch (error) {
      console.error(error);
    }
  };

  const usernameState = getFieldState("username");
  const passwordState = getFieldState("password");

  return (
    <>
      <h1>Register</h1>

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

        <Input
          type="checkbox"
          label="accept terms and conditions"
          register={register}
          errors={errors}
          isRequired={true}
          validations={validations.termsAndConditions}
        />

        <button className="form__button" disabled={isSubmitting}>
          {isSubmitting ? (
            <Loader size="22px" color="var(--on-primary)" />
          ) : (
            <span>Register</span>
          )}
        </button>
      </form>
    </>
  );
};

export default Register;

import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { fieldState } from "../../helpers/form/fieldState";
import { validations } from "../../helpers/form/validations";
import { useAuth } from "../../hooks/auth/useAuth";
import { Input } from "../../components/Input";
import { Loader } from "../../components/Loader";
import Modal from "../../components/Modal";

const defaultValues = {
  username: "",
  password: "",
};

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);
  const { login, isLogged } = useAuth();
  const {
    formState: { errors, isSubmitting, isSubmitted, isSubmitSuccessful },
    register,
    getFieldState,
    handleSubmit,
    reset,
    setError,
    clearErrors,
  } = useForm({
    mode: "onBlur",
    defaultValues,
  });
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    // Send them back to the page they tried to visit when they were
    // redirected to the login page.
    if (isLogged) {
      navigate(from, { replace: true });
    }
  }, [isLogged]);

  const onSubmit = async (data) => {
    try {
      await login(data);
      reset(defaultValues);
    } catch (error) {
      setError("connection", {
        type: error.type,
        message: error.message,
      });
    } finally {
      setShowModal(true);

      setTimeout(() => {
        setShowModal(false);
        clearErrors();
      }, 3000);
    }
  };

  const usernameState = getFieldState("username");
  const passwordState = getFieldState("password");

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <section className="section__page">
      <h1 className="section__title">Login</h1>

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

      {showModal && (
        <Modal
          onClose={handleCloseModal}
          status={isSubmitSuccessful ? "success" : "error"}
        >
          <p role="alert">
            {isSubmitSuccessful
              ? "Login successfully"
              : "Error: " + errors.connection.message}
          </p>
        </Modal>
      )}
    </section>
  );
};

export default Login;

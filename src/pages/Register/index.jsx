import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { fieldState } from "../../helpers/form/fieldState";
import { validations } from "../../helpers/form/validations";
import { registerService } from "../../services/register";
import { useAuth } from "../../hooks/auth/useAuth";
import { Input } from "../../components/Input";
import { Loader } from "../../components/Loader";
import Modal from "../../components/Modal";

const defaultValues = {
  username: "",
  password: "",
  "accept-terms-and-conditions": false,
};

const Register = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const { login, hasLoginError } = useAuth();
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

  const onSubmit = async ({ username, password }) => {
    try {
      const userData = await registerService({ username, password });
      reset(defaultValues);

      // Do login automatically
      login({ username, password });

      if (hasLoginError) {
        navigate("/login");
      } else {
        navigate("/");
      }
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
      <h1 className="section__title">Register</h1>
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

      {showModal && (
        <Modal
          onClose={handleCloseModal}
          status={isSubmitSuccessful ? "success" : "error"}
        >
          <p role="alert">
            {isSubmitSuccessful
              ? "Register successfully"
              : "Error: " + errors.connection.message}
          </p>
        </Modal>
      )}
    </section>
  );
};

export default Register;

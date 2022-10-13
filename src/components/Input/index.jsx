import { capitalizedWord } from "../../helpers/string/capitalizeWord";

export const Input = ({
  type = "text",
  label,
  hint,
  autoComplete,
  isRequired = "false",
  state,
  register,
  errors,
  validations,
}) => {
  const formattedLabel = label.includes(" ")
    ? label.replaceAll(" ", "-").toLowerCase()
    : label;

  const isCheckboxInputClassName =
    type === "checkbox" ? "form__item--checkbox" : "";
  const fieldStateClassName = state ? `form__input--${state}` : "";

  return (
    <div className={`form__item ${isCheckboxInputClassName}`}>
      <label htmlFor={formattedLabel} className="form__label">
        {capitalizedWord(label)}
      </label>

      {hint && (
        <p id={`${formattedLabel}-hint`} className="form__hint">
          <span>Hint: {hint}</span>
        </p>
      )}

      {errors && (
        <p
          id={`${formattedLabel}-error`}
          className="form__inline-error"
          aria-live="off"
        >
          {errors[formattedLabel]?.message}
        </p>
      )}

      <input
        id={formattedLabel}
        type={type}
        {...register(formattedLabel, validations)}
        className={`form__input ${fieldStateClassName}`}
        autoComplete={autoComplete}
        aria-required={isRequired}
        aria-describedby={`${formattedLabel}-error ${formattedLabel}-hint`}
      />
    </div>
  );
};

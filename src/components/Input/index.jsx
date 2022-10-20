export const Input = ({
  type = "text",
  name,
  label,
  list,
  hint,
  autoComplete,
  isRequired = "false",
  state,
  register,
  errors,
  validations,
}) => {
  const fieldStateClassName = state ? `form__input--${state}` : "";
  const isCheckboxInputClassName =
    type === "checkbox" ? "form__item--checkbox" : "";

  return (
    <div className={`form__item ${isCheckboxInputClassName}`}>
      <label htmlFor={name} className="form__label">
        {label}
      </label>

      {hint && (
        <p id={`${name}-hint`} className="form__hint">
          <span>Hint: {hint}</span>
        </p>
      )}

      {errors && (
        <p id={`${name}-error`} className="form__inline-error" aria-live="off">
          {errors[name]?.message}
        </p>
      )}

      <input
        {...register(name, validations)}
        id={name}
        type={type}
        list={list}
        className={`form__input ${fieldStateClassName}`}
        autoComplete={autoComplete}
        aria-required={isRequired}
        aria-describedby={`${name}-error ${name}-hint`}
      />
    </div>
  );
};

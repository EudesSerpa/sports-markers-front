/**
 * It checks if the field has been touched or the form has been submitted.
 *
 * @param field - The field object from the form state.
 * @param submittedForm - a boolean that indicates whether the form has been submitted
 *
 * @return {String} - The field's error state, otherwise return an empty string
 */
export const fieldState = (field, submittedForm) =>
  field.isTouched || submittedForm ? (field.error ? "invalid" : "") : "";

export const validations = {
  username: {
    required: "Username can't be empty",
    minLength: {
      value: 3,
      message: "Username must have at least 3 characters long",
    },
    maxLength: {
      value: 15,
      message: "Username must have a maximum of 15 characters",
    },
  },
  password: {
    required: "Password can't be empty",
    minLength: {
      value: 3,
      message: "Password must have at least 3 characters long",
    },
    maxLength: {
      value: 12,
      message: "Password must have a maximum of 12 characters",
    },
  },
  termsAndConditions: {
    required: "You must accept the terms and conditions",
  },
};

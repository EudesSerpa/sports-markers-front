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
  "terms-and-conditions": {
    required: "You must accept the terms and conditions",
  },
  createEvent: {
    name: {
      required: "Event must have a name",
    },
    sport: {
      required: "Sport can't be empty",
    },
    teamName: {
      required: "Team must have a name",
    },
    teamImage: {
      pattern: {
        value:
          /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
        message: "The image must be a valid url",
      },
    },
    teamResult: {
      required: "Team must have a result",
      min: {
        value: 0,
        message: "Result must have at least 0",
      },
    },
    initDate: {
      required: "Event must have a date",
    },
  },
};

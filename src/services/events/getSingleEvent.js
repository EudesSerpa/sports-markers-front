import { BASE_URL } from "../settings";

export const getSingleEvent = async ({ id }) => {
  try {
    const response = await fetch(`${BASE_URL}/events/${id}`);
    const body = await response.json();

    if (!response.ok) {
      throw new Error(body.message);
    }

    const { data } = body;

    return data;
  } catch (error) {
    console.log(
      "🚀 ~ file: getSingleEvent.js ~ line 16 ~ getSingleEvent ~ error",
      error
    );

    throw new Error(error.message);
  }
};

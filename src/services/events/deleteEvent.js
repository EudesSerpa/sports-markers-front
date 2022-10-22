import { BASE_URL } from "../settings";

export const deleteEvent = async ({ jwt, id }) => {
  try {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    };

    const response = await fetch(`${BASE_URL}/auth/events/${id}`, options);
    const body = await response.json();

    if (!response.ok) {
      throw new Error(body.message);
    }

    const { data } = body;

    return data;
  } catch (error) {
    console.log(
      "🚀 ~ file: deleteEvent.js ~ line 25 ~ deleteEvent ~ error",
      error
    );

    throw new Error(error.message);
  }
};

import { BASE_URL } from "../settings";

export const patchEvent = async ({ jwt, id, eventData }) => {
  try {
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(eventData),
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
      "🚀 ~ file: patchEvent.js ~ line 25 ~ patchEvent ~ error",
      error
    );

    throw new Error(error.message);
  }
};

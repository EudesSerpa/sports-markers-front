import { BASE_URL } from "../settings";

export const postEvent = async ({ jwt, eventData }) => {
  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(eventData),
    };

    const response = await fetch(`${BASE_URL}/auth/events`, options);
    const body = await response.json();

    if (!response.ok) {
      throw new Error(body.message);
    }

    const { data } = body;

    return data;
  } catch (error) {
    console.log("🚀 ~ file: postEvent.js ~ line 25 ~ postEvent ~ error", error);

    throw new Error(error.message);
  }
};

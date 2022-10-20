import { BASE_URL } from "../settings";

export const getUserEvents = async ({ jwt }) => {
  try {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    };

    const response = await fetch(`${BASE_URL}/auth/events`, options);
    const body = await response.json();

    if (!response.ok) {
      throw new Error(body.message);
    }

    const { data } = body;

    return data;
  } catch (error) {
    console.log(
      "🚀 ~ file: getUserEvents.js ~ line 24 ~ getUserEvents ~ error",
      error
    );

    throw new Error(error.message);
  }
};

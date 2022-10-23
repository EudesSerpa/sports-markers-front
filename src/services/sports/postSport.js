import { BASE_URL } from "../settings";

export const postSport = async ({ jwt, sportData }) => {
  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(sportData),
    };

    const response = await fetch(`${BASE_URL}/auth/sports`, options);
    const body = await response.json();

    if (!response.ok) {
      throw new Error(body.message);
    }

    const { data } = body;

    return data;
  } catch (error) {
    console.log("🚀 ~ file: postSport.js ~ line 25 ~ postSport ~ error", error);

    throw new Error(error.message);
  }
};

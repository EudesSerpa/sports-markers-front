import { BASE_URL } from "../settings";

export const postTeam = async ({ jwt, teamData }) => {
  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(teamData),
    };

    const response = await fetch(`${BASE_URL}/auth/teams`, options);
    const body = await response.json();

    if (!response.ok) {
      throw new Error(body.message);
    }

    const { data } = body;

    return data;
  } catch (error) {
    console.log("🚀 ~ file: postTeam.js ~ line 25 ~ postEvent ~ error", error);

    throw new Error(error.message);
  }
};

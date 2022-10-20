import { BASE_URL } from "../settings";

export const getTeams = async ({ sport = "" }) => {
  try {
    const teamsBySport = sport ? `?sport=${sport}` : "";

    const response = await fetch(`${BASE_URL}/teams${teamsBySport}`);
    const body = await response.json();

    if (!response.ok) {
      throw new Error(body.message);
    }

    const { data } = body;

    return data;
  } catch (error) {
    console.log("🚀 ~ file: getTeams.js ~ line 16 ~ getTeams ~ error", error);

    throw new Error(error.message);
  }
};

import { BASE_URL } from "../settings";

export const getSports = async () => {
  try {
    const response = await fetch(`${BASE_URL}/sports`);
    const body = await response.json();

    if (!response.ok) {
      throw new Error(body.message);
    }

    const { data } = body;

    return data;
  } catch (error) {
    console.log("🚀 ~ file: getSports.js ~ line 16 ~ getSports ~ error", error);

    throw new Error(error.message);
  }
};

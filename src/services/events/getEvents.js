import { BASE_URL } from "../settings";

export const getEvents = async ({ limit, page = 0 }) => {
  try {
    const withPagination = limit
      ? `?limit=${limit}&offset=${page * limit}`
      : "";

    const response = await fetch(`${BASE_URL}/events${withPagination}`);
    const body = await response.json();

    if (!response.ok) {
      throw new Error(body.message);
    }

    const { data } = body;

    return data;
  } catch (error) {
    console.error(
      "🚀 ~ file: getEvents.js ~ line 18 ~ getEvents ~ error",
      error
    );

    throw new Error(error.message);
  }
};

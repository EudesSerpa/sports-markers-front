import { BASE_URL } from "./settings";

export const registerService = async (credentials) => {
  const response = await fetch(`${BASE_URL}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...credentials }),
  });

  const body = await response.json();

  if (!response.ok) {
    throw new Error(body.message);
  }

  const { data } = body;

  return data;
};

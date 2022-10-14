import { BASE_URL } from "./settings";

export const loginService = async (credentials) => {
  try {
    const response = await fetch(`${BASE_URL}/users/login`, {
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

    const {
      data: { jwt },
    } = body;

    return jwt;
  } catch (error) {
    console.log("🚀 ~ file: login.js ~ line 25 ~ loginService ~ error", error);

    throw new Error(error.message);
  }
};

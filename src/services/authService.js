import api from "./api";

export const loginUser = async (email, password) => {

  const response = await api.post("/auth/login", {
    email,
    password
  });

  const token = response.data.access_token;

  localStorage.setItem("token", token);

  return response.data;
};
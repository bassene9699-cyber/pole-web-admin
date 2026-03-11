import axios from "axios";

const api = axios.create({
  baseURL: "https://pole-project.onrender.com",
});

// Ajouter automatiquement le token dans chaque requête
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
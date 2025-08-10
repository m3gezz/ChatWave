import axios from "axios";

export const Client = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

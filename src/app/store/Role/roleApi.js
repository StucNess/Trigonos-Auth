import axios from "axios";

export const roleApi = axios.create({
  baseURL: "http://localhost:5205/api/Rol",
});

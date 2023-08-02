import React from "react";
import axios from "axios";
export const CallApiUsers = async () => {
  let url = "http://localhost:5205/api/Usuarios/pagination";
  let response = await axios.get(url);
  let prueba = await response.data.data;

  return prueba;
};

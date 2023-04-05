import React from "react";
import axios from "axios";
export const CallApiUsers = async (
  PageIndex = 1,
  PageSize = 10,
  numero = 1
) => {
  let url = "http://164.77.112.10:99/api/Usuarios/pagination";
  let response;
  let prueba;

  response = await axios.get(url);
  prueba = await response.data;

  return prueba;
};

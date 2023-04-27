import React from "react";
import axios from "axios";
export const CallApiRoles = async () => {
  let url = "http://localhost:5205/api/Rol";
  let response = await axios.get(url);
  let prueba = await response.data.data;

  return prueba;
};

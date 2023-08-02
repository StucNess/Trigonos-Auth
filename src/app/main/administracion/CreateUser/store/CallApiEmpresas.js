import React from "react";
import axios from "axios";
export const CallApiEmpresas = async () => {
  let url = "http://localhost:5205/api/Empresas";
  let response = await axios.get(url);

  let data = await response.data;

  return data;
};

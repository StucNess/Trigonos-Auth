import React from "react";
import axios from "axios";
export const CallApi = async (PageIndex = 1, PageSize = 10, numero = 1) => {
  let url = "";
  let response;
  let prueba;
  if (numero === 1) {
    url = `http://localhost:5205/api/Participantes?All=s&PageIndex=${PageIndex}&PageSize=${PageSize}`;
  } else if (numero === 0) {
    url = `http://localhost:5205/api/Participantes`;
  } else if (numero === 2) {
    url = "http://localhost:5205/api/Banks";
  }

  response = await axios.get(url);
  prueba = await response.data;

  return prueba;
};

import React from "react";
import axios from "axios";
export const CallApiParticipants = async (
  PageIndex = 1,
  PageSize = 10,
  numero = 1
) => {
  let url = "http://localhost:5205/api/Participantes";
  let response;
  let prueba;

  response = await axios.get(url);
  prueba = await response.data.data;

  return prueba;
};

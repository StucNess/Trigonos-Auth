import React from "react";
import axios from "axios";
export const CallApiParticipants = async (
  PageIndex = 1,
  PageSize = 10,
  numero = 1
) => {
  let url = "http://164.77.112.10:99/api/Participantes";
  let response;
  let prueba;

  response = await axios.get(url);
  prueba = await response.data;

  return prueba;
};

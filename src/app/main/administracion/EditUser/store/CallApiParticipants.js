import react from "react";
import axios from "axios";

export const CallApiParticipants = async (idUser) => {
  let url = "";
  url = `http://localhost:5205/api/Participantes?id=${idUser}`;
  const response = await axios.get(url);
  const dataResponse = await response.data;
  return dataResponse;
};

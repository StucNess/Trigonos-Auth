import axios from "axios";

export const callParticipants = async () => {
  let url = `http://164.77.112.10:99/api/Participantes`;
  let response = await axios.get(url);
  let prueba = await response.data.data;

  return prueba;
};

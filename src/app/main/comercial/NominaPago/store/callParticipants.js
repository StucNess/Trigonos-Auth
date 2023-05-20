import axios from "axios";

export const callParticipants = async () => {
  let url = ` http://localhost:5205/api/Participantes`;
  let response = await axios.get(url);
  let prueba = await response.data.data;

  return prueba;
};

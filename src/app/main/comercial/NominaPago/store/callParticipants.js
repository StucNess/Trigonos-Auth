import axios from "axios";

export const callParticipants = async () => {
  let url = ` https://trigonosapi.azurewebsites.net/api/Participantes`;
  let response = await axios.get(url);
  let prueba = await response.data.data;

  return prueba;
};

import axios from "axios";

export const callParticipants = async () => {
  const idUser = localStorage.getItem("idUser");
  let url = `http://localhost:5205/api/Participantes?id=${idUser}`;
  let response = await axios.get(url);
  let prueba = await response.data.data;

  return prueba;
};

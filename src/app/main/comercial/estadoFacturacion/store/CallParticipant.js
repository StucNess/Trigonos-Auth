import react from "react";
import axios from "axios";

export const CallParticipant = async (numero, sBusinessNamee) => {
  if (numero === 0) {
    let url = "";
    url = ` http://localhost:5205/api/Participantes?All=1&business_Name=${sBusinessNamee}`;
    const response = await axios.get(url);
    const apiResponse = await response.data;
    return apiResponse;
  } else {
    let url = "";
    url = ` http://localhost:5205/api/Participantes?All=1&rut=${sBusinessNamee}`;
    const response = await axios.get(url);
    const apiResponse = await response.data;
    return apiResponse;
  }
};

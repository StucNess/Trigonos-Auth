import react from "react";
import axios from "axios";

let dataResponse;
export const CallBussinesName = async () => {
  let url = "";
  url = " http://localhost:5205/BusinessName";
  const response = await axios
    .get(url)
    .then((res) => {
      dataResponse = res.data;
    })
    .catch((err) => console.log("NO CARGO LA API "));
  return dataResponse;
};
//Backstick alt+96

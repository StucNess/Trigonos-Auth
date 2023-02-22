import react from "react";
import axios from "axios";

export const CallConceptos = async () => {
  let url = "";
  url = "http://164.77.112.10:99/glosa";
  const response = await axios.get(url);
  const dataResponse = await response.data;
  const dataResponseNew = [...dataResponse, { label: "" }];
  return dataResponseNew;
};

import React from "react";
import axios from "axios";

export const CallBanks = async (id = 1, opcion = 1) => {
  let url;
  if (opcion == 1) {
    url = `http://localhost:5205/api/Banks/${id}`;
  } else {
    url = `http://localhost:5205/api/Banks/`;
  }

  let response;
  let data;

  response = await axios.get(url);
  data = response;

  return data.data;
};

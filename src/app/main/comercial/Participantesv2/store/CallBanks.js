import React from "react";
import axios from "axios";

export const CallBanks = async (id = 1) => {
  let url = `http://164.77.112.10:99/api/Banks/${id}`;
  let response;
  let data;

  response = await axios.get(url);
  data = response;

  return data.data;
};

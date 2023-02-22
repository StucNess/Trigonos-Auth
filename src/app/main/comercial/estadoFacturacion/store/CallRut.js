import react from "react";
import axios from "axios"

export const CallRut =  async()=>{
    let url="";
    url="http://164.77.112.10:99/rut";
    const response =  await axios.get(url);
    const dataResponse =  await response.data;
    return dataResponse;
};
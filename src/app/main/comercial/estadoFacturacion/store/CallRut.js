import react from "react";
import axios from "axios"

export const CallRut =  async()=>{
    let url="";
    url="http://localhost:5205/rut";
    const response =  await axios.get(url);
    const dataResponse =  await response.data;
    return dataResponse;
};
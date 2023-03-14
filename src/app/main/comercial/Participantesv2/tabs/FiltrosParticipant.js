import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { CallApi } from "../store/CallApi";
const top100Films = [
  { business_Name: "The Shawshank Redemption", year: 1994 },
  { business_Name: "The Godfather", year: 1972 },
  { business_Name: "The Godfather: Part II", year: 1974 },
  { business_Name: "The Dark Knight", year: 2008 },
];
const top100Films1 = [
  { rut: "The Shawshank Redemption", year: 1994 },
  { rut: "The Godfather", year: 1972 },
  { rut: "The Godfather: Part II", year: 1974 },
  { rut: "The Dark Knight", year: 2008 },
];
const top100Films2 = [
  { business_Name: "The Shawshank Redemption", year: 1994 },
  { business_Name: "The Godfather", year: 1972 },
  { business_Name: "The Godfather: Part II", year: 1974 },
  { business_Name: "The Dark Knight", year: 2008 },
];
let participants;
export default function FiltrosParticipant() {
  const [render, setRender] = useState(false);
  const [dataParticipant, setDataParticipant] = useState({
    name: "",
    rut: "",
  });
  const dataParticipants = async () => {
    const participantss = await CallApi(1, 10, 0);
    participants = participantss;
    if (render === false) {
      setRender(true);
    } else {
      setRender(false);
    }
  };
  useEffect(() => {
    (async () => {
      dataParticipants();
    })();
  }, []);
  // participants != undefined ?? console.log(participants.data);
  return (
    <Box>
      <Box className="flex flex-col w-full mb-[20px]">
        <Typography variant="h6" className="mb-4" color="primary">
          Búsqueda de Participante
        </Typography>
        <span>Introducir términos de búsqueda</span>
      </Box>
      <Box className="flex  w-full justify-between  mdmax:flex-wrap mdmax:justify-center">
        {/* <TextField
          className="zerorange:w-[300px]  lg:w-[400px] w-[200px]  mdmax:m-[20px]"
          label="Ingrese nombre comercial"
          type="text"
          variant="filled"
        /> */}
        <Autocomplete
          disablePortal
          onChange={(event, newValue) => {
            console.log(newValue);
          }}
          getOptionLabel={(option) => option.business_Name}
          id="combo-box-demo"
          options={participants == undefined ? top100Films : participants.data}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Nombre Comercial" />
          )}
        />
        {/* <TextField
          className=" zerorange:w-[300px]  lg:w-[400px] w-[200px]  mdmax:m-[20px]"
          label="Ingrese RUT del cliente"
          type="text"
          variant="filled"
        /> */}
        <Autocomplete
          disablePortal
          onChange={(event, newValue) => {
            console.log(newValue);
          }}
          getOptionLabel={(option) => option.rut}
          id="combo-box-demo"
          options={participants == undefined ? top100Films1 : participants.data}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Rut" />}
        />
        {/* <TextField
          className="zerorange:w-[300px]  lg:w-[400px] w-[200px]  mdmax:m-[20px]"
          label="Seleccionar cliente"
          type="text"
          variant="filled"
        /> */}
      </Box>
      <Box className="flex  w-full items-center  mt-[30px]  ">
        <Button
          className="w-[150px]"
          variant="contained"
          color="secondary"
          startIcon={<SearchIcon />}
          style={{
            m: 1,
            width: 200,
            margin: "0 auto",
            display: "flex",

            color: "white",
          }}
        >
          Buscar
        </Button>
      </Box>
    </Box>
  );
}

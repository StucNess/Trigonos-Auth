import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { CallApi } from "../store/CallApi";
// const top100Films = [
//   { business_Name: "The Shawshank Redemption", year: 1994 },
//   { business_Name: "The Godfather", year: 1972 },
//   { business_Name: "The Godfather: Part II", year: 1974 },
//   { business_Name: "The Dark Knight", year: 2008 },
// ];
// const top100Films1 = [
//   { rut: "The Shawshank Redemption", year: 1994 },
//   { rut: "The Godfather", year: 1972 },
//   { rut: "The Godfather: Part II", year: 1974 },
//   { rut: "The Dark Knight", year: 2008 },
// ];
// const top100Films2 = [
//   { business_Name: "The Shawshank Redemption", year: 1994 },
//   { business_Name: "The Godfather", year: 1972 },
//   { business_Name: "The Godfather: Part II", year: 1974 },
//   { business_Name: "The Dark Knight", year: 2008 },
// ];
let participants;
export default function FiltrosParticipant(props) {
  const [render, setRender] = useState(false);
  const [nameParticipants, setNameParticipants] = useState([]);
  const [dataParticipant, setDataParticipant] = useState([
    {
      name: "El Pelícano Solar Company SpA",
      rut: "76337599",
    },
  ]);
  useEffect(() => {
    props.sendParticipants(dataParticipant);
  }, [dataParticipant]);
  useEffect(() => {
    // props.sendParticipants();
    // console.log(nameParticipants[0]);
  }, []);
  useEffect(() => {
    (async () => {
      participants = await CallApi(1, 1000, 1);
      setNameParticipants(participants);
      props.sendParticipants(participants[0]);
    })();
  }, []);
  // console.log(dataParticipant.name);
  return (
    <Box>
      <Box className="flex flex-col w-full mb-[20px] ">
        <Typography variant="h6" className="mb-4" color="primary">
          Búsqueda de Participante
        </Typography>
        <span>Introducir términos de búsqueda</span>
      </Box>
      <Box className="flex  w-full   mdmax:flex-wrap justify-evenly   lg:justify-start">
        {/* <TextField
          className="zerorange:w-[300px]  lg:w-[400px] w-[200px]  mdmax:m-[20px]"
          label="Ingrese nombre comercial"
          type="text"
          variant="filled"
        /> */}
        <Autocomplete
          className="m-[10px] w-[300px] md:w-[500px]"
          disablePortal
          options={nameParticipants}
          value={dataParticipant}
          onChange={(event, newValue) => setDataParticipant(newValue)}
          getOptionLabel={(option) =>
            option.business_Name || dataParticipant[0].name
          }
          // isOptionEqualToValue={(option, value) =>
          //   dataParticipant.name == value || ""
          // }
          id="combo-box-demo"
          renderInput={(params) => (
            <TextField {...params} label="Nombre Comercial" />
          )}
        />
        <Autocomplete
          className="m-[10px] w-[300px] md:w-[500px]"
          disablePortal
          onChange={(event, newValue) => setDataParticipant(newValue)}
          // isOptionEqualToValue={(option, value) =>
          //   dataParticipant.name == value || ""
          // }
          getOptionLabel={(option) => option.rut || dataParticipant[0].rut}
          id="combo-box-demo"
          options={nameParticipants}
          value={dataParticipant}
          renderInput={(params) => <TextField {...params} label="Rut" />}
        />
      </Box>
      {/* <Box className="flex  w-full items-center  mt-[30px]  ">
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
      </Box> */}
    </Box>
  );
}

import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { CallApi } from "../store/CallApi";
import AdviceModule from "../../AdviceModule";

let participants;
export default function FiltrosParticipant(props) {
  const [render, setRender] = useState(false);
  const [nameParticipants, setNameParticipants] = useState([]);
  const [dataParticipant, setDataParticipant] = useState([
    {
      name: "EcoMetales Limited, Agencia en Chile",
      rut: "59087530",
      id: 1,
    },
  ]);

  useEffect(() => {
    props.sendParticipants(dataParticipant);
  }, [dataParticipant]);
  useEffect(() => {
    if (props.change) {
      console.log(props.change);
      `ID DEL REFRESH: ${props.idParticipant}`;
      callAsyncApi(props.idParticipant);
    }
  }, [props.change]);
  let callAsyncApi = (refreshValue) => {
    (async () => {
      participants = await CallApi(1, 1000, 1);
      setNameParticipants(participants);
      setDataParticipant(participants[parseInt(refreshValue - 1)]);
      props.sendParticipants(participants[parseInt(refreshValue - 1)]);
      // props.sendParticipants(participants[parseInt(refreshValue-1)]);
    })();
  };
  useEffect(() => {
    (async () => {
      participants = await CallApi(1, 1000, 1);
      setNameParticipants(participants);
      props.sendParticipants(participants[0]);
    })();
  }, []);
  // (dataParticipant.name);
  return (
    <Box>
      <Box className="flex flex-col w-full mb-[20px] ">
        <AdviceModule
          direction={"ltr"}
          textwidth={500}
          msg={
            'Mediante los siguientes listas "Razón Social", "Rut" usted podrá buscar al participante deseado, ya sea desplazandose por la lista o escribiendo directamente en el campo.'
          }
          className={"relative h-32 w-32 "}
          classnamesegund={"absolute h-14 w-14 -right-[230px] -bottom-[5px]"}
          classPopover={"ml-[20px] mr-[100px]"}
        />
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
          onChange={(event, newValue) =>
            newValue != undefined && setDataParticipant(newValue)
          }
          getOptionLabel={(option) =>
            option.business_Name || dataParticipant[0].name
          }
          // isOptionEqualToValue={(option, value) =>
          //   dataParticipant.name == value || ""
          // }
          id="combo-box-demo"
          renderInput={(params) => (
            <TextField {...params} label="Razón Social" />
          )}
        />
        <Autocomplete
          className="m-[10px] w-[300px] md:w-[500px]"
          disablePortal
          onChange={(event, newValue) =>
            newValue != undefined && setDataParticipant(newValue)
          }
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
    </Box>
  );
}

import * as React from "react";
import Box from "@mui/material/Box";

import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";

import { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import AdviceModule from "../../AdviceModule";
import { useGetProyectoAllMutation, useGetProyectoByIdMutation } from "app/store/participantesApi/participantesApi";

let participants;
export default function FiltrosParticipant(props) {
  const [getParticipant, data] = useGetProyectoAllMutation();
  const [getProyect, dataProyect] = useGetProyectoByIdMutation();
  const [carga, setCarga] = useState(true);
  const [nameParticipants, setNameParticipants] = useState([{
    name: "Vacio",
    rutCompleto: "Vacio",
    id: 1,
  },]);
  const [dataParticipant, setDataParticipant] = useState([
    {
      name: "Vacio",
      rutCompleto: "Vacio",
      id: 1,
    },
  ]);
  
  // useEffect(() => {
  //   props.isLoading(data.isLoading);
  // }, [data.isLoading]);
  //corregir error de datos indefinidos
  useEffect(() => {
    if(!data.isLoading){
      setCarga(false);
    }
    console.log(data.isLoading);
  }, [data.isLoading]);
  useEffect(() => {
    props.sendParticipants(dataParticipant);
    
  }, [dataParticipant]);
  useEffect(() => {
    if (props.change) {
    
      `ID DEL REFRESH: ${props.idParticipant}`;
      callAsyncApi(props.idParticipant);
    }
  }, [props.change]);
  let callAsyncApi = (refreshValue) => {
    getParticipant({PageIndex:1,PageSize:1000}).then((response)=>{
      let participants = response.data.data;
      setNameParticipants(participants);
      setDataParticipant(participants[parseInt(refreshValue - 1)]);
      props.sendParticipants(participants[parseInt(refreshValue - 1)]);
    }).catch((error)=>{
      
    });
 
  };
  useEffect(() => {
    getParticipant({PageIndex:1,PageSize:1000}).then((response)=>{
      props.sendParticipants(response.data.data[0]);
      setNameParticipants(response.data.data);
      setDataParticipant(response.data.data[0])
      
      
    }).catch((error)=>{
      
    });
    
  }, []);
  
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
      {carga?
              <div className="flex items-center">
                <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
                  {/* <p>Chupa Chupa .....</p> */}
                  <LinearProgress color="primary" />
                </Stack>
              </div>:
              <Box className="flex  w-full   mdmax:flex-wrap justify-evenly   lg:justify-start">
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
                getOptionLabel={(option) =>
                  option.rutCompleto || dataParticipant[0].rutCompleto
              
                }
                id="combo-box-demo"
                options={nameParticipants}
                value={dataParticipant}
                renderInput={(params) => <TextField {...params} label="Rut" />}
              />
            </Box>}
      
    </Box>
  );
}

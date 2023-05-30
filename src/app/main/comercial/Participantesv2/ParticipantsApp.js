import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import FusePageSimple from "@fuse/core/FusePageSimple";
import FacturacionMasivaAppHeader from "./ParticipantsAppHeader";
import VerticalStepper from "./tabs/VerticalStepper";
import ErrorOutlinedIcon from "@mui/icons-material/ErrorOutlined";
import FiltrosParticipant from "./tabs/FiltrosParticipant";

import { CallApi } from "./store/CallApi";
import { useEffect, useState } from "react";

const Root = styled(FusePageSimple)(({ theme }) => ({
  "& .FusePageSimple-header": {
    backgroundColor: theme.palette.background.paper,
    boxShadow: `inset 0 0 0 1px  ${theme.palette.divider}`,
  },
}));
let participants = [];
const NominaPagoApp = () => {
  const [dataParticipant, setDataParticipant] = useState([]);
  const [change, setChange] = useState(false);
  const [idParticipant, setIdParticipant] = useState();
  const getIdParticipant = (data) => {
    setIdParticipant(data);
  };
  const getDataParticipants = (data) => {
    setDataParticipant(data);
  };
  const getChange = (data) => {
    setChange(data);
  };
  return (
    <Root
      // header={<FacturacionMasivaAppHeader />}
      content={
        <Box className="flex flex-col w-full  p-[20px]">
          <Box className="  bg-white rounded-sm p-[10px] mb-[20px]">
            <h1 className="ml-[5px]">Participantes</h1>
            <h1 className="border border-b-pantoneazul"></h1>
            <Box className="flex flex-auto bg-white rounded-sm bg-grey-300 m-[10px] p-[10px]">
              <div>
                <ErrorOutlinedIcon className="text-pantonerojo mr-[20px]" />
              </div>
              <div>
                <span className="text-grey-700">
                  Introducir términos de búsqueda en los <b>filtros</b>{" "}
                  superiores para encontrar al <b>cliente</b> que requiera{" "}
                  gestionar su información, luego en la parte inferior se
                  cargaran los datos asociados.
             
                </span>
              </div>
            </Box>
          </Box>
          <Paper className="w-full p-[20px] mb-[20px]">
         
            <FiltrosParticipant
              change={change}
              sendParticipants={getDataParticipants}
              idParticipant={idParticipant}
            />
          </Paper>
       
          <Paper className="w-full p-[20px] ">
            <VerticalStepper
              dataParticipant={dataParticipant}
              sendChange={getChange}
              sendIdParticipant={getIdParticipant}
            />
          </Paper>
        </Box>
      }
      scroll="content"
    />
  );
};

export default NominaPagoApp;

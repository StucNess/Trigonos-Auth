import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import FusePageSimple from "@fuse/core/FusePageSimple";
import FacturacionMasivaAppHeader from "./ParticipantsAppHeader";
import VerticalStepper from "./tabs/VerticalStepper";
import ErrorOutlinedIcon from "@mui/icons-material/ErrorOutlined";
import FiltrosParticipant from "./tabs/FiltrosParticipant";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import { CallApi } from "./store/CallApi";
import { useEffect, useState } from "react";
import { useGetPartAllQuery, useGetProyAllQuery } from "app/store/participantesApi/participantesApi";
import { useGetFactCLAllQuery } from "app/store/facturacionClApi/facturacionClApi";
import { useGetFacturadorERPTableQuery, useGetNominaPagoTableQuery } from "app/store/nominasApi/nominasApi";

const Root = styled(FusePageSimple)(({ theme }) => ({
  "& .FusePageSimple-header": {
    backgroundColor: theme.palette.background.paper,
    boxShadow: `inset 0 0 0 1px  ${theme.palette.divider}`,
  },
}));
let participants = [];
const NominaPagoApp = () => {
  const [isloading, setIsloading] = useState(true);
  const [carga, setCarga] = useState(true);
  const [dataParticipant, setDataParticipant] = useState([]);
  const [fullData, setFullData] = useState(undefined);
  const {data: getParticipant, isFetching: fetchParticipant }= useGetPartAllQuery({PageIndex:1,PageSize:1000});
  const {data: getProject, isFetching: fetchProject }= useGetProyAllQuery({PageIndex:1,PageSize:1000});
  const {data: getFactCl, isFetching: fetchFact }= useGetFactCLAllQuery();
  const {data: getFactErp, isFetching: fetchFactErp }= useGetFacturadorERPTableQuery();
  const {data: getNomPago, isFetching: fetchNomPag }= useGetNominaPagoTableQuery();
  const [datapermanet, setDatapermanet] = useState([])
  let ArrayFetchs = [fetchParticipant,fetchProject,fetchFact,fetchFactErp,fetchNomPag];
    let ArrayDatas = [getParticipant,getProject,getFactCl,getFactErp,getNomPago];
    function verificarLista() {
      if (ArrayFetchs.every((valor) => valor === true)) {
        return true;
      } else {
        if(ArrayDatas.every((valor) => valor != undefined)){
          return false;
        }else{
          
          return true;
          
        }
        
      }
    }
  
  // let isloadingg =verificarLista();
  // // console.log(fetchParticipant,fetchProject,fetchFact,fetchFactErp,fetchNomPag)
  // // console.log(isloadingg)
  useEffect(() => {
 
      function verificacarga() {
        if ([fetchParticipant,fetchProject,fetchFact,fetchFactErp,fetchNomPag].every((valor) => valor === false)) {
          return false;
        } else {
          return true;
  
          
        }
      }
    
    setCarga(verificacarga() )
  
  

  }, [fetchParticipant,fetchProject,fetchFact,fetchFactErp,fetchNomPag])
  useEffect(() => {
    if(!carga){
      setTimeout(() => {
        if(fullData != undefined){
          setIsloading(false);
          setDatapermanet([fullData.dataParticipant.id])
        }
      }, 1300);
    }
   
  }, [carga])
  
 
  
  useEffect(() => {
    
    if(fullData != undefined){
      setIsloading(false);
    }
  }, [fullData])
  
 

  const [change, setChange] = useState(false);
  const [idParticipant, setIdParticipant] = useState();
  const [tipoCliente, setTipoCliente] = useState({id: 7455, id_participants: 2, vHabilitado: 0});
  const getIdParticipant = (data) => {
    
    setIdParticipant(data);
  };
  const getFullData = (data) => {
   
    setFullData(data);
  };
  const getDataParticipants = (data) => {
    setDataParticipant(data);
  };
  const getChange = (data) => {
    
    
    setChange(data);
  };
  const getTipoCliente = (data) => {
    setTipoCliente(data);
  };
  // const getIsloading = (data) => {
  //   setIsloading(data);
  // };
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
          {carga?<Paper className="w-full p-[20px] mb-[20px]">
            <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
                  
                    <LinearProgress color="primary" />
            </Stack>
         </Paper>:

         <>
         <Paper className="w-full p-[20px] mb-[20px]">
         
         <FiltrosParticipant
           allparticipants={getParticipant.data}
           allprojects={getProject.data}
           allfactcl={getFactCl}
           sendFullData={getFullData}
           change={carga}
           idParticipant={datapermanet}
          //  isLoading={getIsloading}
         
         />
       </Paper>
        {isloading?  <Paper className="w-full p-[20px] mb-[20px]">
       <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
             
               <LinearProgress color="primary" />
       </Stack>
       </Paper>:
          <Paper className="w-full p-[20px] ">
         <VerticalStepper
          
           fullData={fullData}
           nominaPago={getNomPago}
           facturadorErp={getFactErp}
           sendChange={getChange}
           sendIdParticipant={getIdParticipant}
           
          //  isLoading ={isloading}
         />
       </Paper>
       }</>} 
        </Box>
      }
      scroll="content"
    />
  );
};

export default NominaPagoApp;

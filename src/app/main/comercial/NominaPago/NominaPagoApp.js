import { Box, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import withReducer from "app/store/withReducer";
import FusePageSimple from "@fuse/core/FusePageSimple";
import NominaPagoAppHeader from "./NominaPagoAppHeader";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import {Stack} from "@mui/material";

import LinearProgress from "@mui/material/LinearProgress";

import { motion } from "framer-motion";
import axios from "axios";
import SortingSelectingTable from "./tabs/SortingSelectingTable";
import SelectClient from "./tabs/SelectClient";
import UploadFile from "./tabs/UploadFile";
import ErrorOutlinedIcon from "@mui/icons-material/ErrorOutlined";
import TablaNominaBCI from "./tabs/widgets/TablaNominaBCI";
import TablaNominaSantander from "./tabs/widgets/TablaNominaSantander";
import TablaNominaSecurity from "./tabs/widgets/TablaNominaSecurity";
import { useGetNominasMutation } from "app/store/nominasApi/nominasApi";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import ReportIcon from "@mui/icons-material/Report";
import { forwardRef } from "react";
const Root = styled(FusePageSimple)(({ theme }) => ({
  "& .FusePageSimple-header": {
    backgroundColor: theme.palette.background.paper,
    boxShadow: `inset 0 0 0 1px  ${theme.palette.divider}`,
  },
}));
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
let changeDisc;
let discPrueba = false;
let ldata;
const NominaPagoApp = () => {
  let tablaSelect = 1;
  const [getNominas,dataNomina]  = useGetNominasMutation();
  const [clientData, setClienteData] = useState([]);
  const [payRollData, setPayRollData] = useState([]);
  const [disc, setDisc] = useState(false);
  const [stateNomina, setStateNomina] = useState({})
  const [open, setOpen] = useState(false);
  const [estado, setEstado] = useState('');

  const actualizarEstado = (nuevoEstado) => {
    setEstado(nuevoEstado);
  };


  // const [render, setRender] = useState(false);
  useEffect(() => {
   console.log(stateNomina)
  }, [stateNomina])
 
  useEffect(() => {
    discPrueba= false;
    changeDisc = undefined;
    ldata= undefined;
    setDisc(false);
    setClienteData([])
    setStateNomina({});

  }, [estado])
  

  const getClientData = (data, glosa = "") => {
    
    
    // console.log(disc);
    setClienteData(data);
    callApiPayroll(data.id, glosa);
    ldata = data;
  };
  const getDiscData = (disc, glosa = "") => {
    discPrueba = disc;
    setDisc(disc);

    getClientData(ldata, glosa);
  };
  const callApiPayroll = (id, glosa = "") => {
    if (discPrueba == false) {
      
      getNominas({
        id: id,
        Glosa: glosa
      }).then((response)=>{
        const {data, error} = response;
        if(data!=undefined){
          setStateNomina({data:data, error:data.length>0?false:true, msgError:data.length>0? error:"No se registran datos", title:"Notificación"})
          if(data.length===0){
            setOpen(true);
            setTimeout(() => {
              setOpen(false);
            }, 2000);
           }
        }else{
         
          setStateNomina({data:undefined, error:true, msgError: error, title:"Error en busqueda" })
          setOpen(true);
          setTimeout(() => {
            setOpen(false);
          }, 2000);
        }
      }).catch((error)=>{
        setStateNomina({data:undefined, error:true, msgError: error, title:"Error en busqueda" })
        setOpen(true);
        setTimeout(() => {
          setOpen(false);
        }, 2000);
      });
    } else {
      getNominas({
        id: id,
        Glosa: glosa,
        Disc: "si"
      }).then((response)=>{
        const {data, error} = response;
        if(data!=undefined){
          setStateNomina({data:data, error:data.length>0?false:true, msgError:data.length>0? error:"No existen disconformidades", title:"Notificación"})
          if(data.length===0){
          setOpen(true);
          setTimeout(() => {
            setOpen(false);
          }, 2000);
         }
        }else{
          setStateNomina({data:undefined, error:true, msgError: error , title:"Error en busqueda"})
          setOpen(true);
          setTimeout(() => {
            setOpen(false);
          }, 2000);
        }
      }).catch((error)=>{
        setStateNomina({data:undefined, error:true, msgError: error , title:"Error en busqueda"})
        setOpen(true);
        setTimeout(() => {
          setOpen(false);
        }, 2000);
      });
   
    }
   
  };
  const getChangeDisc = (param) => {
    changeDisc = param;

    // setDisc(param);
  };
  return (
    <Root
      // header={<NominaPagoAppHeader />}
      content={
        <div className="w-full">
          <motion.div
            className="grid auto-cols-auto smmax:grid-cols-2 sm:grid-cols-12 gap-2 w-full min-w-0 p-20 "
            initial="hidden"
            animate="show"
          >
            <motion.div className="  col-span-12 mb-[20px]">
              <Box className="  bg-white rounded-sm p-[10px] ">
                <h1 className="ml-[5px]">Nominas de Pago &#40;Deudor&#41;</h1>
                <h1 className="border border-b-pantoneazul"></h1>
                <Box className="flex flex-auto bg-white rounded-sm bg-grey-300 m-[10px] p-[10px]">
                  <div>
                    <ErrorOutlinedIcon className="text-pantonerojo mr-[20px]" />
                  </div>
                  <div>
                    <span className="text-grey-700">
                      Selecciona tu <b>Cliente</b>, descarga y edita los datos
                      de las <b>Fechas de Pago</b>
                    </span>
                  </div>
                </Box>
              </Box>
            </motion.div>
            <motion.div className=" mdmax:col-span-12  md:col-span-6">
              <SelectClient
                sendClientData={getClientData}
                disc={disc}
                actualizarEstado={actualizarEstado}
                changeDisc={getChangeDisc}
              />
            </motion.div>

            <motion.div className=" mdmax:col-span-12  md:col-span-6">
              {/*
            Cargar la diversificacion de las tablas aca
            */}
              <UploadFile />

              {/*
            HAY QUE DIFERENCIAR CUAL TABLA LE PERTENECE AL CLIENTE
            */}
            </motion.div>
            <motion.div className="  col-span-12 ">
              

              <Stack  sx={{ width: "100%", color: "grey.500", height:"3px"}} spacing={2}>
            {dataNomina.isLoading ? 
              <LinearProgress color="primary" className="ml-[20px] mr-[20px]" />   
              :<></>}
            </Stack>
            <Paper>
            {clientData.bank == 4 && (
               <TablaNominaBCI
               isLoading ={dataNomina.isLoading}
               payRollData={stateNomina}
               sendDiscData={getDiscData}
               changedDisc={changeDisc}
                />
              )}
              {clientData.bank == 9 && (
                 <TablaNominaSecurity
                 payRollData={stateNomina}
                 sendDiscData={getDiscData}
                 changedDisc={changeDisc}
               />
              )}
              {clientData.bank == 7 && (
                <TablaNominaSantander
                payRollData={stateNomina}
                sendDiscData={getDiscData}
                changedDisc={changeDisc}
              />
              )}
              </Paper>
            </motion.div>
            
            
          </motion.div>
        <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        // onClose={}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{ color: "#FF5733" }}>
          {stateNomina.title}
          <ReportIcon sx={{ color: "#FF5733" }} />
        </DialogTitle>
        <DialogContent>
          
            <h2 className="text-pantoneazul">{JSON.stringify(stateNomina.msgError)}</h2>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose}>Agree</Button> */}
        </DialogActions>
      </Dialog>
        </div>
      }
      scroll="content"
    />
  );
};

export default NominaPagoApp;

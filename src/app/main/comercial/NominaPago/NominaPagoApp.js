
import {
  Box,
  
} from "@mui/material";
import { styled } from "@mui/material/styles";
import withReducer from "app/store/withReducer";
import FusePageSimple from "@fuse/core/FusePageSimple";
import NominaPagoAppHeader from "./NominaPagoAppHeader";

import { motion } from "framer-motion";
import SortingSelectingTable from "./tabs/SortingSelectingTable";
import SelectClient from "./tabs/SelectClient";
import UploadFile from "./tabs/UploadFile";
import ErrorOutlinedIcon from '@mui/icons-material/ErrorOutlined';



const Root = styled(FusePageSimple)(({ theme }) => ({
  "& .FusePageSimple-header": {
    backgroundColor: theme.palette.background.paper,
    boxShadow: `inset 0 0 0 1px  ${theme.palette.divider}`,
  },
}));

const NominaPagoApp = () => {
  

  return (
    <Root
      header={<NominaPagoAppHeader />}
      content={
        <div className="p-12 pt-16 sm:pt-24 lg:pt-24 md:pt-24 lg:ltr:pr-0 lg:rtl:pl-0 w-full">
         
           
          <motion.div
          className="grid auto-cols-auto smmax:grid-cols-2 sm:grid-cols-12 gap-2 w-full min-w-0 p-24 "
         
          initial="hidden"
          animate="show">
          <motion.div className="  col-span-12 mb-[20px]" >
            <Box className="  bg-white rounded-sm p-[10px] ">
              <h1 className="ml-[5px]">Nominas de Pago  &#40;Deudor&#41;</h1>
              <h1 className="border border-b-pantoneazul"></h1>
              <Box   className="flex flex-auto bg-white rounded-sm bg-grey-300 m-[10px] p-[10px]"  >
                <div>
                <ErrorOutlinedIcon className="text-pantonerojo mr-[20px]" />
                </div>
                <div>
                <span className="text-grey-700">Selecciona tu <b>Cliente</b>, descarga y edita los datos de las <b>Fechas de Pago</b></span>
                </div>
                
              </Box>
            </Box>
          </motion.div>
          <motion.div className=" mdmax:col-span-12  md:col-span-6">
           <SelectClient/>
          </motion.div>
          
          <motion.div  className=" mdmax:col-span-12  md:col-span-6"> 
            {/*
            Cargar la diversificacion de las tablas aca
            */} 
           <UploadFile/>
          </motion.div>
          <motion.div className="  col-span-12 " >
              <SortingSelectingTable/>
          </motion.div>
        </motion.div>
          
          
         
          
        </div>
      }
      scroll="content"
    />
  );
};

export default NominaPagoApp;

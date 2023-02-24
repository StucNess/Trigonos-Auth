import { styled } from "@mui/material/styles";
import withReducer from "app/store/withReducer";
import FusePageSimple from "@fuse/core/FusePageSimple";
import NominaPagoAppHeader from "./NominaPagoAppHeader";

import { motion } from "framer-motion";
import SortingSelectingTable from "./tabs/SortingSelectingTable";
import SelectClient from "./tabs/SelectClient";
import UploadFile from "./tabs/UploadFile";




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
        <div className="p-24">
          <div>
            <h1>Nominas de Pago</h1>
          <br />
          <motion.div
          className="grid grid-cols-1 sm:grid-cols-12 gap-24 w-full min-w-0 p-24 "
         
          initial="hidden"
          animate="show">
          <motion.div className=" hdmas:col-span-12  hd:col-span-6">
           <SelectClient/>
          </motion.div>
          
          <motion.div  className=" hdmas:col-span-12  hd:col-span-6"> 
            {/*
            Cargar la diversificacion de las tablas aca
            */} 
           <UploadFile/>
          </motion.div>
          <motion.div className="  col-span-12  items-center" >
              <SortingSelectingTable/>
          </motion.div>
        </motion.div>
          </div>
          
         
          
        </div>
      }
      scroll="content"
    />
  );
};

export default NominaPagoApp;

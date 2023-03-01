import {
    Box,
    Paper
    
  } from "@mui/material";
  import { styled } from "@mui/material/styles";
  import FusePageSimple from "@fuse/core/FusePageSimple";
  import { motion } from "framer-motion";
//   import NominaPagoAppHeader from "./NominaPagoAppHeader";
  import ErrorOutlinedIcon from '@mui/icons-material/ErrorOutlined';
  import EditUserPaper from "./tabs/EditUserPaper";
  import ListUserPaper from "./tabs/ListUserPaper";
  
  
  const Root = styled(FusePageSimple)(({ theme }) => ({
    "& .FusePageSimple-header": {
      backgroundColor: theme.palette.background.paper,
      boxShadow: `inset 0 0 0 1px  ${theme.palette.divider}`,
    },
  }));
  
  const NominaPagoApp = () => {
    
  
    return (
      <Root
        header={<div>
            Header
        </div>}
        content={
          <div className="p-12 pt-16 sm:pt-24 lg:pt-24 md:pt-24 lg:ltr:pr-0 lg:rtl:pl-0 w-full ">
          <motion.div
          className="grid auto-cols-auto smmax:grid-cols-2 sm:grid-cols-12 gap-2 w-full min-w-0 p-24   "
         
          initial="hidden"
          animate="show">
          <motion.div className="  col-span-12 mb-[20px]" >
             {/* Box de titulo y guía */}
            <Box className="  bg-white rounded-sm p-[10px] ">
              <h1 className="ml-[5px]">Editar Usuarios</h1>
              <h1 className="border border-b-pantoneazul"></h1>
              <Box   className="flex flex-auto bg-white rounded-sm bg-grey-300 m-[10px] p-[10px]"  >
                <div>
                  <ErrorOutlinedIcon className="text-pantonerojo mr-[20px]" />
                </div>
                <div>
                  <span className="text-grey-700">Selecciona un <b>Usuario</b> desde la tabla adyacente que contiene una <b>lista</b> de los usuarios registrados</span>
                </div>
                
              </Box>
            </Box>
          </motion.div>
          <motion.div className=" lgmax:col-span-12  lg:col-span-6 lg:mr-[20px]">
            <EditUserPaper/>
          </motion.div>
          
          <motion.div  className=" lgmax:col-span-12  lg:col-span-6 lgmax:mt-[20px] lg:ml-[20px] "> 
            <ListUserPaper/>
           
          </motion.div>
         
        </motion.div>
            
          </div>





        }
        scroll="content"
      />
    );
  };
  
  export default NominaPagoApp;
  
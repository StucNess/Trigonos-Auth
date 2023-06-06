import {Paper, Typography,Button,Box} from "@mui/material";
import AssignmentIcon from '@mui/icons-material/Assignment';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import * as React from 'react';

import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import DoneAllIcon from '@mui/icons-material/DoneAll';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Disponible from "../tablas/Disponible";
import HistorialCarga from "../tablas/HistorialCarga";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#f1f5f9",
    color: '#002554',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    // backgroundColor: "#F7F7F7",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  // '&:nth-of-type(odd)': {
  //   backgroundColor: theme.palette.action.hover,
  // },
  // '&:nth-of-type(odd)': {
  //   backgroundColor: theme.palette.action.hover,
  // },
  // hide last border
 
}));
function createData(name,estado) {
  return { name,estado};
}

const rows = [
  createData('Excel 1',false),
  createData('Excel 2',true),
 
];


export default function Acreedor(props) {

    return (
        <div className="grid grid-cols-9 gap-12 p-[20px]">
           <div className="col-span-3 bg-white rounded-md">
              <div className="flex flex-row  m-[20px]">
              <Typography className="text-2xl font-medium tracking-tight text-pantoneazul leading-6 truncate">
                Excel Disponibles 
              </Typography>
            
              </div>
              <h1 className="border border-b-pantoneazul w-full"></h1>
              <div className="p-[20px]">
           
               
              <Disponible/>
              </div>
           </div>
             
          
           <div className="col-span-3 bg-white rounded-md">
           <div className="flex flex-row  m-[20px]">
              <Typography className="text-2xl font-medium tracking-tight text-pantoneazul leading-6 truncate">
              Historia de Carga
              </Typography>
              <AssignmentIcon className="ml-[10px] text-pantoneazul" />
              </div>
              <h1 className="border border-b-pantoneazul w-full"></h1>
              <div className="p-[20px]">
              <HistorialCarga/>
              </div>
           
           </div>
           <div className="col-span-3 bg-white rounded-md">
           <div className="flex flex-row  m-[20px]">
              <Typography className="text-2xl font-medium tracking-tight text-pantoneazul leading-6 truncate">
                Subida
              </Typography>
              <UploadFileIcon className="ml-[10px] text-pantoneazul" />
              </div>
              <h1 className="border border-b-pantoneazul w-full"></h1>
              <div className="p-[20px] ">
                <div className="bg-[#f0f0f0] rounded-md flex items-center justify-center ">
                <Button className="cursor-copy" variant="contained" size="medium">
                  Medium
                </Button>
                </div>
              </div>
           </div>
        </div>
      );
}
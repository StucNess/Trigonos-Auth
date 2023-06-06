import {Paper, Typography,Button,Box} from "@mui/material";
import * as React from 'react';

import { SiMicrosoftexcel } from "react-icons/si";
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
  function createData(name,description) {
    return { name,description};
  }
  
  const rows = [
    createData('Excel 1','Folio y sin Fecha de Recepción'),
    createData('Excel 2','Cuadre Masivo'),
   
  ];
export default function Disponible(props) {


return (
    <TableContainer component={Box}>
    <Table  aria-label="customized table" size="small">
      <TableHead>
        <TableRow>
          <StyledTableCell >Documento</StyledTableCell>
          <StyledTableCell  align="left">Descripción</StyledTableCell>
         
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
            <Tooltip  
            title="Descargar" 
            arrow 
            placement="right"
            // placement="top-start"
          >
          <StyledTableRow  key={row.name} hover className="border-b-2 border-inherit cursor-pointer ">
            <StyledTableCell component="th" scope="row"  align="left" >
              <SiMicrosoftexcel size={30} className="mr-[10px] text-green-700"/>
            </StyledTableCell>
            <StyledTableCell align="left"> {row.description}</StyledTableCell>
          
          </StyledTableRow>
       
        </Tooltip>
          
        ))}
      </TableBody>
    </Table>
  </TableContainer>
)
}
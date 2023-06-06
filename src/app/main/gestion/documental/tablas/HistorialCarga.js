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
  function createData(name,estado) {
    return { name,estado};
  }
  
  const rows = [
    createData('Excel 1',false),
    createData('Excel 2',true),
   
  ];
  
export default function HistorialCarga(props) {


return (
    <TableContainer component={Box}>
              <Table  aria-label="customized table" size="small">
                <TableHead>
                  <TableRow>
                    <StyledTableCell >Excel cargado</StyledTableCell>
                    <StyledTableCell  align="left">Estado del archivo</StyledTableCell>
                   
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <StyledTableRow  key={row.name} hover className="border-b-2 border-inherit">
                      <StyledTableCell component="th" scope="row"  align="left" >
                        {row.name}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                      {row.estado?   
                        <Tooltip  
                        title="Se ha cargado correctamente" 
                        arrow 
                        placement="right"
                        // placement="top-start"
                      >
                      <IconButton
                      sx={{ "&:hover": { color: "#e4493f" } }}
                      key="chechedLeft"
                      aria-label="Close"
                      color="success"
                      //  onClick={() => {
                      //   Activar(row.id);
                      // }}
                      size="small"
                    >
                      <DoneAllIcon fontSize="large" />
                    </IconButton>
                    </Tooltip> :  
                        <Tooltip  
                        title="Error al procesar solicitud" 
                        arrow 
                        placement="right"
                        // placement="top-start"
                      >
                      <IconButton
                      sx={{ "&:hover": { color: "#e4493f" } }}
                      key="chechedLeft"
                      aria-label="Close"
                      color="error"
                    //   onClick={() => {
                    //     Desactivar(row.id);
                    //  }}
                      size="small"
                    >
                      <ErrorOutlineIcon fontSize="large" />
                    </IconButton>
                    </Tooltip> 
                        
                        } 
                      </StyledTableCell>
                    
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
)
}
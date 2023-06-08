import { Paper, Typography, Button, Box } from "@mui/material";
import * as React from "react";
import * as XLSX from "xlsx";

import { SiMicrosoftexcel } from "react-icons/si";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useState } from "react";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#f1f5f9",
    color: "#002554",
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

export default function Disponible(props) {
  const {tableUtils,actionDownload}= props

 

  return (
    <TableContainer component={Box}>
      <Table aria-label="customized table" size="small">
        <TableHead>
          <TableRow>
            <StyledTableCell>Documento</StyledTableCell>
            <StyledTableCell align="left">Descripción</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        
        {tableUtils.map((row) => (
            <Tooltip
              title="Descargar"
              arrow
              placement="right"
              // placement="top-start"
            >
              <StyledTableRow
                key={row.id}
                hover
                className="border-b-2 border-inherit cursor-pointer "
                onClick={ ()=>{
                  actionDownload(row.headerExcel,row.dataExcel,row.name)
                
                }}
              >
                <StyledTableCell component="th" scope="row" align="left">
                  <SiMicrosoftexcel
                    size={30}
                    className="mr-[10px] text-green-700"
                  />
                </StyledTableCell>
                <StyledTableCell align="left">
                  {" "}
                  {row.description}
                </StyledTableCell>
              </StyledTableRow>
            </Tooltip>
          ))}
          
        </TableBody>
      </Table>
    </TableContainer>
  );
}

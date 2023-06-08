import { Paper, Typography, Button, Box } from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import * as React from "react";
import * as XLSX from "xlsx";

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
import Disponible from "../tablas/Disponible";
import HistorialCarga from "../tablas/HistorialCarga";
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
function createData(name, estado) {
  return { name, estado };
}

const rows = [createData("Excel 1", false), createData("Excel 2", true)];

export default function Deudor(props) {
  console.log(props.cliente)
  console.log(props.dataExcel.data.map(function(el) {
    return {Id :el.id_instruccions, nombre_acreedor: props.cliente.business_Name,nombre_deudor: el.giroDeudor, rut: el.rutAcreedor,folio:el.folio,fecha_recepcion:el.fecha_recepcion,fecha_aceptacion:el.fecha_aceptacion,glosa: el.glosa,monto:el.montoNeto}         
  }),)

  let headersExcel_uno = [
    [
      "ID Instruccion",
      "Nombre Acreedor",
      "Nombre Deudor",
      "Rut",
      "Folio",
      "Fecha Recepcion",
      "Fecha Aceptacion",
      "Concepto",
      "Monto",
    ],
  ];
  
  let headersExcel_dos= [
    [
      "ID Instruccion",
      "Nombre Acreedor",
      "Nombre Deudor",
      "Rut",
      "Folio",
      "Fecha Recepcion",
      "Fecha Aceptacion",
      "Concepto",
      "Fecha de Pago",
      "Monto",
    ],
  ];
 
  function convertToSheet(header,data) {
    const wb = XLSX.utils.book_new();
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet([]);
    if(header===1){
      XLSX.utils.sheet_add_aoa(ws, headersExcel_uno);
    }else{
      XLSX.utils.sheet_add_aoa(ws, headersExcel_dos);
          }
  

    const sheet = XLSX.utils.sheet_add_json(ws, data, {
      origin: "A2",
      skipHeader: true,
    });

    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    XLSX.writeFile(wb, "filename.xlsx");
  }
  function donwloadCuadreMasivoExcel(filename,header) {
    convertToSheet( header,props.dataExcel.data.map(function(el) {
      return {Id :el.id_instruccions, nombre_acreedor: props.cliente.business_Name,nombre_deudor: el.giroDeudor, rut: el.rutAcreedor,folio:el.folio,fecha_recepcion:el.fecha_recepcion,fecha_aceptacion:el.fecha_aceptacion,glosa: el.glosa,monto:el.montoNeto}         
    }));
  }
  function donwloadHistoricoExcel(filename,header) {
    convertToSheet( header,props.dataExcel.data.map(function(el) {
      return {Id :el.id_instruccions, nombre_acreedor: props.cliente.business_Name,nombre_deudor: el.giroDeudor, rut: el.rutAcreedor,folio:el.folio,fecha_recepcion:el.fecha_recepcion,fecha_aceptacion:el.fecha_aceptacion,glosa: el.glosa,fecha_pago:el.fecha_pago,monto:el.montoNeto}         
    }));
  }
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
          <Button className="cursor-copy" variant="contained" size="medium" onClick={() => donwloadCuadreMasivoExcel("mydata",1)}>
                Medium
              </Button>
              <Button className="cursor-copy" variant="contained" size="medium" onClick={() => donwloadHistoricoExcel("mydata",2)}>
                Medium
              </Button>
          <Disponible excelData={undefined} />
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
          {/* <HistorialCarga excelData={props.dataExcel} /> */}
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

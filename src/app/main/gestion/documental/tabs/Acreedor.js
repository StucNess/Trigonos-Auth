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
let head1 = [
  [
    "ID Instruccion",
    "Nombre Acreedor",
    "Nombre Deudor",
    "Rut",
    "Folio",
    "Fecha Emision",
    "Fecha de Pago",
    "Concepto",
    "Monto",
  ],
];

let head2= [
  [
    "ID Instruccion",
    "Nombre Acreedor",
    "Nombre Deudor",
    "Rut",
    "Folio",
    "Fecha Emision",
    "Fecha de Pago",
    "Concepto",
    "Monto",
  ],
];
const convertAndDownloadExcel = (header,data,name)=>{
  const wb = XLSX.utils.book_new();
  const ws= XLSX.utils.json_to_sheet([]);
  XLSX.utils.sheet_add_aoa(ws, header);
  const sheet = XLSX.utils.sheet_add_json(ws, data, {
    origin: "A2",
    skipHeader: true,
  });

  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

  XLSX.writeFile(wb, `${name}.xlsx`);
}

export default function Acreedor(props) {

  const cuadremasivo = props.dataExcelAcreedor.data.map(function(el) {
    return {Id :el.id_instruccions, nombre_acreedor: props.cliente.business_Name,nombre_deudor: el.giroDeudor, rut: el.rutAcreedor,folio:el.folio,fecha_emision:el.fecha_emision,fecha_pago:el.fecha_pago,glosa: el.glosa,monto:el.montoNeto}         
  });
  const historico =  props.dataExcelAcreedor.data.map(function(el) {
    return {Id :el.id_instruccions, nombre_acreedor: props.cliente.business_Name,nombre_deudor: el.giroDeudor, rut: el.rutAcreedor,folio:el.folio,fecha_emision:el.fecha_emision,fecha_pago:el.fecha_pago,glosa: el.glosa,monto:el.montoNeto}         
  });

  const tableUtils = [
    {
      id: 1,
      name: `AC-${props.cliente.rut}` ,
      description: "Cuadre Masivo de instrucciones acreedor",
      dataExcel:cuadremasivo,
      headerExcel: head1
    
    },
    {
      id: 2,
      name: `AC-HIST-${props.cliente.rut}`,
      description: "Historia de instrucciones de acreedor",
      dataExcel:historico,
      headerExcel: head2
    }
  ]

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
            <Disponible  tableUtils={tableUtils} actionDownload = {convertAndDownloadExcel} />
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
          <HistorialCarga excelData={props.dataExcel} />
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

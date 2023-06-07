import { Paper, Typography, Button, Box } from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import * as React from "react";
import * as XLSX from "xlsx";
import axios from "axios";
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
import { setRole } from "app/store/Role";
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
function createData(name, estado) {
  return { name, estado };
}

export default function Facturacion(props) {
  const [refresh, setRefresh] = useState(false);
  const devuelveFechaHoy = (param = 0) => {
    let fechaActual = new Date();
    param === 1 && fechaActual.setDate(fechaActual.getDate() + 2);
    let dia = fechaActual.getDate();
    let mes = fechaActual.getMonth() + 1; // Los meses comienzan desde 0, por lo que se suma 1
    let año = fechaActual.getFullYear();

    if (dia < 10) {
      dia = "0" + dia;
    }
    if (mes < 10) {
      mes = "0" + mes;
    }
    let fechaCorta = año + "-" + mes + "-" + dia;
    return fechaCorta;
  };
  const rows = [createData("Excel 1", false), createData("Excel 2", true)];
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    let dataPrueba = [];
    let name = event.target.files[0].name;

    let fecha = devuelveFechaHoy();
    let idParticipant = props.idParticipant;
    let type = "Facturacion Masiva";

    // console.log(name);
    // console.log(status);
    // console.log(fecha);
    // console.log(props.idParticipant);
    // console.log(type);
    // console.log(description);

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      // const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      // Procesar cada fila de datos
      jsonData.forEach((row) => {
        dataPrueba.push(row);
      });
      let url;
      url =
        "https://trigonosapi.azurewebsites.net/api/Instrucciones/acturalizarFacturacion";
      axios
        .post(url, dataPrueba)
        .then(function (response) {
          let description = "Se actualizo todo correctamente";
          console.log(response);
          let status = "OK";
          let json = {
            excelName: name,
            status: status,
            // date: devuelveFechaHoy(),
            idParticipant: idParticipant,
            type: type,
            description: description,
          };
          let url =
            "https://trigonosapi.azurewebsites.net/api/Instrucciones/Agregar";
          axios
            .post(url, json)
            .then(function (response) {
              console.log(response);
              window.location.reload();
            })
            .catch(function (error) {
              console.log(error);
            });
        })
        .catch(function (error) {
          // console.log(typeof error.response.data.message == typeof "hola");
          let description = error.response.data.message;
          let status = "ERROR";
          let json = {
            excelName: name,
            status: status,
            // date: devuelveFechaHoy(),
            idParticipant: idParticipant,
            type: type,
            description: error.response.data.message,
          };
          let url =
            "https://trigonosapi.azurewebsites.net/api/Instrucciones/Agregar";
          axios
            .post(url, json)
            .then(function (response) {
              console.log(response);
              //window.location.reload();
            })
            .catch(function (error) {
              console.log(error);
            });
          // window.location.reload();
        });
    };

    reader.readAsArrayBuffer(file);
  };
  return (
    <div className="grid grid-cols-9 gap-12 p-[20px]">
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
          <UploadFileIcon
            onClick={() => console.log("hola")}
            className="ml-[10px] text-pantoneazul"
          />
          <input type="file" onChange={(e) => handleFileUpload(e)} />
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

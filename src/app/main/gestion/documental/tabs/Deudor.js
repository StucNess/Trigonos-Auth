import { Paper, Typography, Button, Box, ButtonBase } from "@mui/material";
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
    "Fecha Recepcion",
    "Fecha Aceptacion",
    "Concepto",
    "Monto",
  ],
];

let head2 = [
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
const convertAndDownloadExcel = (header, data, name) => {
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet([]);
  XLSX.utils.sheet_add_aoa(ws, header);
  const sheet = XLSX.utils.sheet_add_json(ws, data, {
    origin: "A2",
    skipHeader: true,
  });

  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

  XLSX.writeFile(wb, `${name}.xlsx`);
};

export default function Deudor(props) {
  console.log(props.cliente);
  const cuadremasivo = props.dataExcel.data.map(function (el) {
    return {
      Id: el.id_instruccions,
      nombre_acreedor: props.cliente.business_Name,
      nombre_deudor: el.giroDeudor,
      rut: el.rutAcreedor,
      folio: el.folio,
      fecha_recepcion: el.fecha_recepcion,
      fecha_aceptacion: el.fecha_aceptacion,
      glosa: el.glosa,
      monto: el.montoNeto,
    };
  });
  const historico = props.dataExcel.data.map(function (el) {
    return {
      Id: el.id_instruccions,
      nombre_acreedor: props.cliente.business_Name,
      nombre_deudor: el.giroDeudor,
      rut: el.rutAcreedor,
      folio: el.folio,
      fecha_recepcion: el.fecha_recepcion,
      fecha_aceptacion: el.fecha_aceptacion,
      glosa: el.glosa,
      fecha_pago: el.fecha_pago,
      monto: el.montoNeto,
    };
  });

  const tableUtils = [
    {
      id: 1,
      name: `DC-${props.cliente.rut}`,
      description:
        "Cuadre Masivo de instrucciones deudor, Folio 0 sin fecha de recepción",
      dataExcel: cuadremasivo,
      headerExcel: head1,
    },
    {
      id: 2,
      name: `DC-HIST-${props.cliente.rut}`,
      description: "Historia de instrucciones de deudor",
      dataExcel: historico,
      headerExcel: head2,
    },
  ];
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
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    let dataPrueba = [];
    let name = event.target.files[0].name;

    let fecha = devuelveFechaHoy();
    let idParticipant = props.idParticipant;
    let type = "Facturacion Masiva";

    reader.onload = (e) => {
      // setOpenDialog(true);
      // setCargando(true);
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      // Procesar cada fila de datos
      jsonData.forEach((row) => {
        dataPrueba.push(row);
      });
      let url;
      axios.interceptors.request.use((request) => {
        request.maxContentLength = Infinity;
        request.maxBodyLength = Infinity;
        return request;
      });

      url = `https://trigonosapi.azurewebsites.net/api/Instrucciones/ActualizarFacDeudor?id=${props.idParticipant}`;
      axios
        .post(url, dataPrueba, { maxBodyLength: 100 })
        .then(function (response) {
          console.log(response);
          // let description = "Se actualizo todo correctamente";
          // let status = "OK";
          // let json = {
          //   excelName: name,
          //   status: status,
          //   idParticipant: props.idParticipant,
          //   type: type,
          //   description: description,
          // };
          // let url = `https://trigonosapi.azurewebsites.net/api/Instrucciones/Agregar`;
          // axios
          //   .post(url, json)
          //   .then(function (response) {
          //     setMsgAlert({
          //       msgResp: true,
          //       msgText: "Exito, Archivo Subido!",
          //       msgError: false,
          //     });
          //     setCargando(false);
          //     setTimeout(() => {
          //       window.location.reload();
          //     }, 2000);
          //   })
          //   .catch(function (error) {
          //     console.log(error);
          //   });
        })
        .catch(function (error) {
          console.log(error);
          // let description = error.response.data.message;
          // let status = "ERROR";
          // let json = {
          //   excelName: name,
          //   status: status,
          //   idParticipant: props.idParticipant,
          //   type: type,
          //   description: description,
          // };
          // let url =
          //   "https://trigonosapi.azurewebsites.net/api/Instrucciones/Agregar";
          // // axios
          //   .post(url, json)
          //   .then(function (response) {
          //     setMsgAlert({
          //       msgResp: true,
          //       msgText: "Error, Archivo subido con errores!",
          //       msgError: true,
          //     });
          //     setCargando(false);
          //     setTimeout(() => {
          //       window.location.reload();
          //     }, 2000);
          //   })
          //   .catch(function (error) {
          //     console.log(error);
          //   });
        });
    };

    reader.readAsArrayBuffer(file);
  };
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
          <Disponible
            tableUtils={tableUtils}
            actionDownload={convertAndDownloadExcel}
          />
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
            <input type="file" onChange={(e) => handleFileUpload(e)} />
            <ButtonBase
              className="cursor-copy"
              variant="contained"
              size="medium"
            ></ButtonBase>
          </div>
        </div>
      </div>
    </div>
  );
}

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
//DIALOG
import WarningIcon from "@mui/icons-material/Warning";
import CircularProgress from "@mui/material/CircularProgress";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import ReportIcon from "@mui/icons-material/Report";
import { forwardRef } from "react";
//
//LLAMADAS A API REDUX
import { useGetInstruccionesSpecmMutation } from "app/store/instrucciones/instruccionesApi";
//
import { useState } from "react";
import { useEffect } from "react";
import { id } from "date-fns/locale";
//TRANSICION DEL DIALOG
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
//
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
let head2 = [
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
let array = [];
export default function Disponible(props) {
  const [cargando, setCargando] = useState(true);
  //PROPIEDADES DIALOG
  const [open, setOpen] = useState(false);
  const [stateDataExcel, setStateDataExcel] = useState({
    data: [],
    error: false,
    msgError: "",
    title: "Cargando porfavor espere",
  });

  //
  const [getInstructions, dataInstructions] =
    useGetInstruccionesSpecmMutation();
  let tableUtils = [
    {
      id: 1,
      name: `AC-${props.cliente.rut}`,
      description: "Cuadre Masivo de instrucciones acreedor",
      // dataExcel: cuadremasivo,
      headerExcel: head1,
    },
    {
      id: 2,
      name: `AC-HIST-${props.cliente.rut}`,
      description: "Historia de instrucciones de acreedor",
      // dataExcel: historico,
      headerExcel: head2,
    },
  ];
  const callAllInstructions = (header, name, idDocumento) => {
    let jsonApi = {};
    if (idDocumento == 1) {
      jsonApi = {
        id: 196,
        PageIndex: 1,
        PageSize: 100,
        spec: { conFolio: "si", Pagada: true },
      };
    } else {
      jsonApi = {
        id: 196,
        PageIndex: 1,
        PageSize: 100,
        spec: { Folio: 0, Pagada: true },
      };
    }
    setOpen(true);
    getInstructions(jsonApi)
      .then((response) => {
        let { data, error, count } = response;
        if (data != undefined) {
          if (data.count > 0) {
            let buclesF = Math.round(data.count / 100 + 0.49) + 1;
            for (let x = 1; x < buclesF; x++) {
              jsonApi.PageIndex = x;
              getInstructions(jsonApi)
                .then((response) => {
                  response.data.data.map((el) => {
                    if (idDocumento == 1) {
                      array.push({
                        Id: el.id_instruccions,
                        nombre_acreedor: props.cliente.business_Name,
                        nombre_deudor: el.giroDeudor,
                        rut: el.rutAcreedor,
                        folio: el.folio,
                        fecha_emision: el.fecha_emision,
                        fecha_pago: el.fecha_pago,
                        glosa: el.glosa,
                        monto: el.montoNeto,
                      });
                    } else {
                      array.push({
                        Id: el.id_instruccions,
                        nombre_acreedor: props.cliente.business_Name,
                        nombre_deudor: el.giroDeudor,
                        rut: el.rutAcreedor,
                        folio: el.folio,
                        fecha_emision: el.fecha_emision,
                        fecha_pago: el.fecha_pago,
                        glosa: el.glosa,
                        monto: el.montoNeto,
                      });
                    }
                  });
                  if (array.length === data.count) {
                    setCargando(false);
                    convertAndDownloadExcel(header, array, name);
                    setStateDataExcel({
                      data: array,
                      error: false,
                      msgError: "Se descargo con exito",
                      title: "Notificación",
                    });
                    setTimeout(() => {
                      restablecerCargaDato();
                    }, 2000);
                  }
                })
                .catch((error) => {
                  console.log(error);
                });
            }
          } else if (data.length === 0) {
            setOpen(true);
            setTimeout(() => {
              setOpen(false);
            }, 2000);
          } else {
            setStateDataExcel({
              data: array,
              error: array.length > 0 ? false : true,
              msgError: array.length > 0 ? error : "No se registran datos",
              title: "Notificación",
            });
            setOpen(true);
            setTimeout(() => {
              setOpen(false);
            }, 2000);
          }
        }
      })
      .catch((error) => {
        setStateDataExcel({
          data: array,
          error: array.length > 0 ? false : true,
          msgError: array.length > 0 ? error : "No se registran datos",
          title: "Notificación",
        });
        setOpen(true);
        setTimeout(() => {
          setOpen(false);
        }, 2000);
      });
  };
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
  const restablecerCargaDato = () => {
    setOpen(false);
    array = [];
    setCargando(true);
    setStateDataExcel({
      data: [],
      error: false,
      msgError: "",
      title: "Cargando porfavor espere",
    });
  };
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
                onClick={() => {
                  callAllInstructions(row.headerExcel, row.name, row.id);
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
      {/* TERMINA  */}

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        // onClose={}
        // aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{ color: "#FF5733" }}>
          {stateDataExcel.title}

          {/* <ReportIcon sx={{ color: "#FF5733" }} /> */}
        </DialogTitle>
        <DialogContent>
          {stateDataExcel.msgError == "" ? (
            <div className="flex justify-center items-center h-[250px] w-[300px]">
              <CircularProgress color="secondary" />
            </div>
          ) : (
            <h2 className="text-pantoneazul">
              {JSON.stringify(stateDataExcel.msgError)}
            </h2>
          )}
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose}>Agree</Button> */}
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
}

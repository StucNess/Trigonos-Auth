import { 
  Paper, 
  Typography, 
  Button, 
  Box,
  Grid, 
  Checkbox, 
  FormLabel,
  Autocomplete,
  FormControlLabel,
  FormGroup,
  InputAdornment,
  TextFieldTable,
  Table,
  TextField,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow, MenuItem } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Stack } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import AdapterDateFns from "@date-io/date-fns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { es } from "date-fns/locale";
import AssignmentIcon from "@mui/icons-material/Assignment";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import EqualizerIcon from '@mui/icons-material/Equalizer';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import TuneIcon from '@mui/icons-material/Tune';
import * as React from "react";
import * as XLSX from "xlsx";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import LinearProgress from "@mui/material/LinearProgress";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
// import Table from "@mui/material/Table";

// import TableCell, { tableCellClasses } from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
import Estadisticas from "../Componentes/Estadisticas/Estadisticas";
import TableContainer from "@mui/material/TableContainer";

import EditIcon from "@mui/icons-material/Edit";

import { styled } from "@mui/material/styles";



import FormHelperText from "@mui/material/FormHelperText";
import Switch from "@mui/material/Switch";
import { useEffect, useState } from "react";
import TablaInstrucciones from "../Componentes/TablaInstrucciones/TablaInstrucciones";
import { useGetConceptoQuery, useGetInstruccionesSpecQuery, useGetNombreAcreedorQuery, useGetRutAcreedorQuery } from "app/store/instrucciones/instruccionesApi";
import { useGetBusinessNameQuery, useGetRutQuery } from "app/store/participantesApi/participantesApi";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));


const columns = [
  { id: "ceN_billing_status_type_name", label: "E.Emision" },
  { id: "trgnS_dte_reception_status_name", label: "E.Recepcion" },
  { id: "ceN_payment_status_type_name", label: "E.Pago" },
  { id: "fecha_emision", label: "Fecha emision" },
  { id: "fecha_pago", label: "Fecha pago" },
  { id: "fecha_carta", label: "Fecha carta" },
  { id: "ceN_dte_acceptance_status_name", label: "E.Aceptacion" },
  { id: "folio", label: "Folio" },
  { id: "carta", label: "Carta" },
  { id: "nombreAcreedor", label: "Nombre Acreedor" },
  { id: "rutAcreedor", label: "Rut Acreedor" },
  { id: "nombreDeudor", label: "Nombre Deudor" },
  { id: "rutDeudor", label: "Rut Deudor" },
  { id: "glosa", label: "Glosa" },
  { id: "concepto", label: "Concepto" },
  { id: "montoNeto", label: "Monto Neto" },
  { id: "montoBruto", label: "Monto Bruto" },
  { id: "tipo_instruccion", label: "tipo_instruccion" },
  { id: "id_instruccions", label: "Instruccion" },
  { id: "editar", label: "editar" },
];



let condicion = 1;
let estados = [];
let tableData = [];
let columnsHidden = [
  "id_instruccions",
  "editar",
  "trgnS_dte_reception_status_name",
  "ceN_dte_acceptance_status_name",
  "tipo_instruccion",
];
let columnsOrder = [
  "Monto Neto",
  "Monto Bruto",
  "Fecha emision",
  "Fecha pago",
  "Fecha carta",
  "Folio",
];
let idProyecto = 141;
let Respaldo;
let dataInstruction;
let tokenOpenModal;
let proyects;
let orderByList = {
  orderByNeto: "",
  orderByBruto: "",
  orderByFechaEmision: "",
  orderByFechaPago: "",
  orderByFechaCarta: "",
  orderByFolio: "",
};


export default function Instrucciones(props) {
  const { id } = props
  const [pageIndex, setPageIndex] = useState(1);
  const [pagination, setPagination] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  // const [tableData, setTableData] = useState([]);
  const [cargando, setCargando] = useState(true);
 //estados
  const [state, setState] = useState({
    estadoEmision: false,
    estadoPago: false,
    estadoRecepcion: false,
    estadoAceptacion: false,
    acreedor: false,
    deudor: false,
  });
  const clearStates = () => {
    setState({
      estadoEmision: false,
      estadoPago: false,
      estadoRecepcion: false,
      estadoAceptacion: false,
      acreedor: false,
      deudor: false,
    });
  };
//filtros
let condicionFilters = 0;
  let conditionPeriods = 0;
  const [disabledDateEnd, setDisabledDateEnd] = useState(false);
  const [bussN, setBusinessName] = useState([]);
  const [rutN, setRutName] = useState([]);
  const [conceptN, setConceptName] = useState([]);
  const [cart, setCart] = useState([]);
  const [codRef, setCodRef] = useState([]);
  const [limpiar, setLimpiar] = useState(false);
  const [selected, setSelected] = useState({
    sBusinessName: "",
    sRut: "",
    sConcept: "",
    sMontoNeto: "",
    sMontoBruto: "",
    sFolio: "",
    sCarta: "",
    sCodRef: "",
    sInicioPeriodo: "",
    sTerminoPeriodo: "",
    buscar: "",
  });
  const {
    sBusinessName,
    sRut,
    sConcept,
    sCodRef,
    sCarta,
    sMontoNeto,
    sMontoBruto,
    sFolio,
    sInicioPeriodo,
    sTerminoPeriodo,
    buscar,
  } = selected;
  //tabla
  const [page, setPage] = useState(0);

  const [alert, setAlert] = useState(false);

  const [modal, setModal] = useState(false);
  const [editar, setEditar] = useState(false);
  
//apis
  const { data: getDataName, isFetching: fetchName, refetch: refetchName} = 
  useGetBusinessNameQuery();
  const { data: getDataRut, isFetching: fetchRut, refetch: refetchRut} = 
  useGetRutQuery();
  const [skipFetchs, setSkipFetchs] = useState({
    skipNombreAcre:false,
    skipRutAcre:false,
    skipNombreDeudor:false,
    skipRutDeudor:false,

  })
  const { data: getDataNombreAcre, isFetching: fetchNombreAcre, refetch: refetchNombreAcre} = 
  useGetNombreAcreedorQuery(
    {id:id,
      spec:{
        EstadoAceptacion:state.estadoAceptacion?"Aceptado":"",
        EstadoRecepcion:state.estadoRecepcion?"Recepcionado":"",
        Acreedor:state.acreedor?id:"",
        Deudor:state.deudor?id:"",
        EstadoEmision:state.estadoEmision?"Facturado":"",
        EstadoPago:state.estadoPago?"Pagado":"",
        RutDeudor:state.deudor?(selected.sRut.slice(0, 8)!=""?selected.sRut.slice(0, 8):""):(""),
        RutAcreedor:state.acreedor?(selected.sRut.slice(0, 8)!=""?selected.sRut.slice(0, 8):""):(""),
        Glosa:selected.sConcept!=""?selected.sConcept:"",
        MontoNeto:selected.sMontoNeto!=""?selected.sMontoNeto:"",
        MontoBruto:selected.sMontoBruto!=""?selected.sMontoBruto:"",
        Folio:selected.sFolio!=""?selected.sFolio:"",
        NombreDeudor:state.deudor?(selected.sBusinessName!=""?selected.sBusinessName:""):(""),
        NombreAcreedor:state.acreedor?(selected.sBusinessName!=""?selected.sBusinessName:""):(""),
  }},{skip:skipFetchs.skipNombreAcre});//propiedad skip es para no iniciar la carga previa

  const { data: getDataRutAcre, isFetching: fetchRutAcre, refetch: refetchRutAcre} = 
  useGetRutAcreedorQuery(
    {id:id,
      spec:{
        EstadoAceptacion:state.estadoAceptacion?"Aceptado":"",
        EstadoRecepcion:state.estadoRecepcion?"Recepcionado":"",
        Acreedor:state.acreedor?id:"",
        Deudor:state.deudor?id:"",
        EstadoEmision:state.estadoEmision?"Facturado":"",
        EstadoPago:state.estadoPago?"Pagado":"",
        RutDeudor:state.deudor?(selected.sRut.slice(0, 8)!=""?selected.sRut.slice(0, 8):""):(""),
        RutAcreedor:state.acreedor?(selected.sRut.slice(0, 8)!=""?selected.sRut.slice(0, 8):""):(""),
        Glosa:selected.sConcept!=""?selected.sConcept:"",
        MontoNeto:selected.sMontoNeto!=""?selected.sMontoNeto:"",
        MontoBruto:selected.sMontoBruto!=""?selected.sMontoBruto:"",
        Folio:selected.sFolio!=""?selected.sFolio:"",
        NombreDeudor:state.deudor?(selected.sBusinessName!=""?selected.sBusinessName:""):(""),
        NombreAcreedor:state.acreedor?(selected.sBusinessName!=""?selected.sBusinessName:""):(""),
  }},{skip:skipFetchs.skipRutAcre});//propiedad skip es para no iniciar la carga previa
  const { data: getDataNombreDeudor, isFetching: fetchNombreDeudor, refetch: refetchNombreDeudor} = 
  useGetNombreDeudorQuery(
    {id:id,
      spec:{
        EstadoAceptacion:state.estadoAceptacion?"Aceptado":"",
        EstadoRecepcion:state.estadoRecepcion?"Recepcionado":"",
        Acreedor:state.acreedor?id:"",
        Deudor:state.deudor?id:"",
        EstadoEmision:state.estadoEmision?"Facturado":"",
        EstadoPago:state.estadoPago?"Pagado":"",
        RutDeudor:state.deudor?(selected.sRut.slice(0, 8)!=""?selected.sRut.slice(0, 8):""):(""),
        RutAcreedor:state.acreedor?(selected.sRut.slice(0, 8)!=""?selected.sRut.slice(0, 8):""):(""),
        Glosa:selected.sConcept!=""?selected.sConcept:"",
        MontoNeto:selected.sMontoNeto!=""?selected.sMontoNeto:"",
        MontoBruto:selected.sMontoBruto!=""?selected.sMontoBruto:"",
        Folio:selected.sFolio!=""?selected.sFolio:"",
        NombreDeudor:state.deudor?(selected.sBusinessName!=""?selected.sBusinessName:""):(""),
        NombreAcreedor:state.acreedor?(selected.sBusinessName!=""?selected.sBusinessName:""):(""),
  }},{skip:skipFetchs.skipNombreDeudor});//propiedad skip es para no iniciar la carga previa

  const { data: getDataRutDeudor, isFetching: fetchRutDeudor, refetch: refetchRutDeudor} = 
  useGetRutDeudorQuery(
    {id:id,
      spec:{
        EstadoAceptacion:state.estadoAceptacion?"Aceptado":"",
        EstadoRecepcion:state.estadoRecepcion?"Recepcionado":"",
        Acreedor:state.acreedor?id:"",
        Deudor:state.deudor?id:"",
        EstadoEmision:state.estadoEmision?"Facturado":"",
        EstadoPago:state.estadoPago?"Pagado":"",
        RutDeudor:state.deudor?(selected.sRut.slice(0, 8)!=""?selected.sRut.slice(0, 8):""):(""),
        RutAcreedor:state.acreedor?(selected.sRut.slice(0, 8)!=""?selected.sRut.slice(0, 8):""):(""),
        Glosa:selected.sConcept!=""?selected.sConcept:"",
        MontoNeto:selected.sMontoNeto!=""?selected.sMontoNeto:"",
        MontoBruto:selected.sMontoBruto!=""?selected.sMontoBruto:"",
        Folio:selected.sFolio!=""?selected.sFolio:"",
        NombreDeudor:state.deudor?(selected.sBusinessName!=""?selected.sBusinessName:""):(""),
        NombreAcreedor:state.acreedor?(selected.sBusinessName!=""?selected.sBusinessName:""):(""),
  }},{skip:skipFetchs.skipRutDeudor});//propiedad skip es para no iniciar la carga previa

  const { data: getDataInstruction, isFetching: fetchInstructions, refetch: refetchInstruc} = 
  useGetInstruccionesSpecQuery(
    {
    id: id,
    PageIndex: pageIndex,
    PageSize:rowsPerPage,
    spec: {
      EstadoAceptacion:state.estadoAceptacion?"Aceptado":"",
      EstadoRecepcion:state.estadoRecepcion?"Recepcionado":"",
      Acreedor:state.acreedor?id:"",
      Deudor:state.deudor?id:"",
      EstadoEmision:state.estadoEmision?"Facturado":"",
      EstadoPago:state.estadoPago?"Pagado":"",
      FechaEmision:"",
      FechaRecepcion:"",
      FechaPago:"",
      FechaAceptacion:"",
      Glosa:"",
      Concepto:"",
      MontoNeto:"",
      MontoBruto:"",
      RutAcreedor:"",
      RutDeudor:"",
      Folio:"",
      NombreAcreedor:"",
      NombreDeudor:"",
      InicioPeriodo:"",
      TerminoPeriodo:"",
      Carta:"",
      CodigoRef:"",
      OrderByNeto:"",
      OrderByBruto:"",
      OrderByFechaEmision:"",
      OrderByFechaPago:"",
      OrderByFechaCarta:"",
      OrderByFolio:"",
    }
    });
  const { data: getDataConcept, isFetching: fetchConcept, refetch: refetchConcept} = 
  useGetConceptoQuery(
    {id:id,
    spec: undefined}
  );

  useEffect(() => {
    refetchInstruc();
    refetchRut();
    refetchName();
    refetchConcept();
  }, [id])


  function verificacarga() {
    if ([fetchInstructions,fetchName,fetchRut,fetchConcept].every((valor) => valor === false)) {
      return false;
    } else {
      return true;     
    }
  }
  
  // useEffect(() => {
  //   if(getDataInstruction && getDataInstruction.data){
  //     if(!fetchInstructions){
  //       console.log(getDataInstruction.data)
  //       setPagination(getDataInstruction.count)
  //     }
  //   }
  // }, [fetchInstructions])
  useEffect(() => {
    setCargando(true);
    if(getDataInstruction && getDataInstruction.data){
      tableData = getDataInstruction.data
      setPagination(getDataInstruction.count)
      setPageCount(getDataInstruction.pageCount + 1);

      setCargando(false);
    

    }
  }, [getDataInstruction])
  useEffect(() => {
    if(getDataNombreDeudor){
      setBusinessName(getDataNombreDeudor)
    }
  }, [getDataNombreDeudor])
  useEffect(() => {
    if(getDataRutDeudor){
      setRutName(getDataRutDeudor)
    }
  }, [getDataRutDeudor])
  useEffect(() => {
    if( getDataName!=undefined ){
      setBusinessName(getDataName);
    }
    setCargando(verificacarga() )
  }, [fetchName])
  useEffect(() => {
    if( getDataRut!=undefined ){
      setRutName(getDataRut);
    }
    setCargando(verificacarga() )
  }, [fetchRut])
  useEffect(() => {
    if( getDataConcept!=undefined ){
      setConceptName(getDataConcept.label);
      setCodRef(getDataConcept.codRef);
      setCart(getDataConcept.carta);
    }
    setCargando(verificacarga() )
  }, [fetchConcept])

//logica y control
  //estados
  const {
    estadoEmision,
    estadoPago,
    estadoRecepcion,
    estadoAceptacion,
    acreedor,
    deudor,
  } = state;
  const handleChange = (event) => {
    
    if (event.target.name === "acreedor" &&
    event.target.checked === true) {
      setCargando(true);
      setState({
        ...state,
        [event.target.name]: event.target.checked,
        deudor: false,
      });
     
      refetchInstruc();
    } else if (
      
      event.target.name === "deudor" &&
      event.target.checked === true
    ) {
      setSkipFetchs({...skipFetchs,skipNombreAcre:false,skipRutAcre:false});
      refetchNombreAcre();
      refetchRutAcre();
      setCargando(true);
      setState({
        ...state,
        [event.target.name]: event.target.checked,
        acreedor: false,
      });
      refetchInstruc();
    } else {
      setCargando(true);
      setState({
        ...state,
        [event.target.name]: event.target.checked,
      });
      refetchInstruc();
    }
  };
  //filtros
  const conditionFilters = (e) => {
    if (e.target.name === "estados" && e.target.checked === true) {
      condicionFilters = 1;
    }
    if (e.target.name === "estados" && e.target.checked === false) {
      condicionFilters = 0;
    }
  };
  const chile = new Intl.NumberFormat("es-CL", {
    currency: "CLP",
    style: "currency",
  });
  //tabla
  const handleChangePage = () => {
    setCargando(true);
  
    setPageIndex(pageIndex===pageCount?pageIndex: pageIndex + 1)
    if(pageIndex===pageCount){
      setCargando(false);
    }
    // setPage(pageIndex + 1);
    console.log(`${pageIndex} ${pageCount}`)
    refetchInstruc();
    
  };
  const handleChangePagedos = () => {
    setCargando(true);
   
    setPageIndex(pageIndex >1? pageIndex - 1:1)
    if(pageIndex===1){
      setCargando(false);
    }
    // setPage(pageIndex + 1);
    refetchInstruc();
    
  };
  const handleChangeRowsCount = (option) => {
   
    if(rowsPerPage!=option){
      setCargando(true);
      setRowsPerPage(option)
      setPageIndex(1);
      refetchInstruc();
    }
    // setPage(pageIndex + 1);

    
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
    setPageIndex(1);
  };
  const showModal = (data) => {
    if (modal === true) {
      setModal(false);
      return;
    }

    dataInstruction = data;
    setModal(true);
  };
  const getOpenModal = (openModal) => {
    tokenOpenModal = openModal;
  };

  const exportToExcel = () => {
    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet(tableData);
    XLSX.utils.book_append_sheet(wb, ws, "MySheet1");
    XLSX.writeFile(wb, "instrucciones.xlsx");
  };

  function random(dateString) {
    var thedate = new Date(dateString);
    var prueba = `${
      thedate.getDate() <= 9 ? "0".concat(thedate.getDate()) : thedate.getDate()
    }/${
      thedate.getMonth() < 9
        ? "0".concat(thedate.getMonth() + 1)
        : thedate.getMonth() + 1
    }/20${thedate.getYear().toString().slice(1, 3)}`;
    return prueba;
  }
  function returnInstructionState(id) {
    let estado = "vacio";
    if (id === 0) {
      estado = "Abierta";
    } else if (id === 1) {
      estado = "Editable";
    } else if (id === 2) {
      estado = "Cerrada";
    }
    return estado;
  }
  const clearOrderBy = () => {
    orderByList.orderByFolio = "";
    orderByList.orderByFechaCarta = "";
    orderByList.orderByFechaPago = "";
    orderByList.orderByFechaEmision = "";
    orderByList.orderByNeto = "";
    orderByList.orderByBruto = "";
  };
  const orderBy = (column) => {
    if (column === "Monto Neto") {
      orderByList.orderByBruto = "";
      orderByList.orderByFechaEmision = "";
      orderByList.orderByFechaPago = "";
      orderByList.orderByFechaCarta = "";
      orderByList.orderByFolio = "";
      if (orderByList.orderByNeto === "") {
        orderByList.orderByNeto = "desc";
      } else if (orderByList.orderByNeto === "desc") {
        orderByList.orderByNeto = "asc";
      } else if (orderByList.orderByNeto === "asc") {
        orderByList.orderByNeto = "desc";
      }
    } else if (column === "Monto Bruto") {
      orderByList.orderByNeto = "";
      orderByList.orderByFechaEmision = "";
      orderByList.orderByFechaPago = "";
      orderByList.orderByFechaCarta = "";
      orderByList.orderByFolio = "";
      if (orderByList.orderByBruto === "") {
        orderByList.orderByBruto = "desc";
      } else if (orderByList.orderByBruto === "desc") {
        orderByList.orderByBruto = "asc";
      } else if (orderByList.orderByBruto === "asc") {
        orderByList.orderByBruto = "desc";
      }
    } else if (column === "Fecha emision") {
      orderByList.orderByNeto = "";
      orderByList.orderByBruto = "";
      orderByList.orderByFechaPago = "";
      orderByList.orderByFechaCarta = "";
      orderByList.orderByFolio = "";
      if (orderByList.orderByFechaEmision === "") {
        orderByList.orderByFechaEmision = "desc";
      } else if (orderByList.orderByFechaEmision === "desc") {
        orderByList.orderByFechaEmision = "asc";
      } else if (orderByList.orderByFechaEmision === "asc") {
        orderByList.orderByFechaEmision = "desc";
      }
    } else if (column === "Fecha pago") {
      orderByList.orderByFechaEmision = "";
      orderByList.orderByNeto = "";
      orderByList.orderByBruto = "";

      orderByList.orderByFechaCarta = "";
      orderByList.orderByFolio = "";
      if (orderByList.orderByFechaPago === "") {
        orderByList.orderByFechaPago = "desc";
      } else if (orderByList.orderByFechaPago === "desc") {
        orderByList.orderByFechaPago = "asc";
      } else if (orderByList.orderByFechaPago === "asc") {
        orderByList.orderByFechaPago = "desc";
      }
    } else if (column === "Fecha carta") {
      orderByList.orderByFechaPago = "";
      orderByList.orderByFechaEmision = "";
      orderByList.orderByNeto = "";
      orderByList.orderByBruto = "";

      orderByList.orderByFolio = "";
      if (orderByList.orderByFechaCarta === "") {
        orderByList.orderByFechaCarta = "desc";
      } else if (orderByList.orderByFechaCarta === "desc") {
        orderByList.orderByFechaCarta = "asc";
      } else if (orderByList.orderByFechaCarta === "asc") {
        orderByList.orderByFechaCarta = "desc";
      }
    } else if (column === "Folio") {
      orderByList.orderByFechaCarta = "";
      orderByList.orderByFechaPago = "";
      orderByList.orderByFechaEmision = "";
      orderByList.orderByNeto = "";
      orderByList.orderByBruto = "";
      if (orderByList.orderByFolio === "") {
        orderByList.orderByFolio = "desc";
      } else if (orderByList.orderByFolio === "desc") {
        orderByList.orderByFolio = "asc";
      } else if (orderByList.orderByFolio === "asc") {
        orderByList.orderByFolio = "desc";
      }
    }
  };
  return (
    <div className="grid grid-cols-12 gap-12 p-[20px]">
      <div className="hd:col-span-6  hdmas:col-span-12   bg-white rounded-md">
        <div className="flex flex-row  m-[20px]">
          <Typography className="text-2xl font-medium tracking-tight text-pantoneazul leading-6 truncate">
            Estados
          </Typography>
          <TuneIcon className="ml-[10px] text-pantoneazul" />
        </div>
        <h1 className="border border-b-pantoneazul w-full"></h1>
        
        <div className="p-[20px]">
        <Grid
            container
            direction="row"
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
            justifyContent="space-evenly"
            alignItems="flex-start"
          >
                <Grid item xs="auto" sm="auto" md="auto">
                  <Item>
                    <FormControlLabel
                      control={
                        <Switch
                           // disabled={
                          //   props.cargando || !props.cargarFiltros
                          //     ? true
                          //     : false
                          // }
                          checked={state.estadoEmision}
                          onChange={handleChange}
                          name="estadoEmision"
                        />
                      }
                      label={
                        state.estadoEmision
                          ? "Factura Emitida"
                          : "Factura No Emitida"
                      }
                      sx={
                        state.estadoEmision
                          ? { color: "green" }
                          : { color: "red" }
                      }
                    />
                  </Item>
                </Grid>
                <Grid item xs="auto" sm="auto" md="auto">
                  <Item>
                    <FormControlLabel
                      control={
                        <Switch
                          // disabled={
                          //   props.cargando || !props.cargarFiltros
                          //     ? true
                          //     : false
                          // }
                          checked={state.estadoPago}
                          onChange={handleChange}
                          name="estadoPago"
                        />
                      }
                      label={state.estadoPago ? "Pagado" : "No Pagado"}
                      sx={
                        state.estadoPago ? { color: "green" } : { color: "red" }
                      }
                    />
                  </Item>
                </Grid>
                <Grid item xs="auto" sm="auto" md="auto">
                  <Item>
                    <FormControlLabel
                      control={
                        <Switch
                           // disabled={
                          //   props.cargando || !props.cargarFiltros
                          //     ? true
                          //     : false
                          // }
                          checked={state.estadoRecepcion}
                          onChange={handleChange}
                          name="estadoRecepcion"
                        />
                      }
                      label={
                        state.estadoRecepcion
                          ? "Recepcionado"
                          : "No Recepcionado"
                      }
                      sx={
                        state.estadoRecepcion
                          ? { color: "green" }
                          : { color: "red" }
                      }
                    />
                  </Item>
                </Grid>
                <Grid item xs="auto" sm="auto" md="auto">
                  <Item>
                    <FormControlLabel
                      control={
                        <Switch
                           // disabled={
                          //   props.cargando || !props.cargarFiltros
                          //     ? true
                          //     : false
                          // }
                          checked={state.estadoAceptacion}
                          onChange={handleChange}
                          name="estadoAceptacion"
                        />
                      }
                      label={
                        state.estadoAceptacion ? "Aceptado" : "No Aceptado"
                      }
                      sx={
                        state.estadoAceptacion
                          ? { color: "green" }
                          : { color: "red" }
                      }
                    />
                  </Item>
                </Grid>
                <Grid item xs="auto" sm="auto" md="auto">
                  <Item>
                    <FormControlLabel
                      control={
                        <Switch
                           // disabled={
                          //   props.cargando || !props.cargarFiltros
                          //     ? true
                          //     : false
                          // }
                          checked={state.acreedor}
                          onChange={handleChange}
                          name="acreedor"
                        />
                      }
                      label="Acreedor"
                      sx={
                        state.acreedor ? { color: "green" } : { color: "red" }
                      }
                    />
                  </Item>
                </Grid>
                <Grid item xs="auto" sm="auto" md="auto">
                  <Item>
                    <FormControlLabel
                      control={
                        <Switch
                           // disabled={
                          //   props.cargando || !props.cargarFiltros
                          //     ? true
                          //     : false
                          // }
                          checked={state.deudor}
                          onChange={handleChange}
                          name="deudor"
                        />
                      }
                      label="Deudor"
                      sx={state.deudor ? { color: "green" } : { color: "red" }}
                    />
                  </Item>
                </Grid>
              </Grid>
        </div>
      </div>

      <div className="hd:col-span-6  hdmas:col-span-12  bg-white rounded-md">
        <div className="flex flex-row  m-[20px]">
          <Typography className="text-2xl font-medium tracking-tight text-pantoneazul leading-6 truncate">
            Estadísticas
          </Typography>
          <EqualizerIcon className="ml-[10px] text-pantoneazul" />
        </div>
        <h1 className="border border-b-pantoneazul w-full"></h1>
        <div className="p-[20px]">
         <Estadisticas  participantId ={props.id} />
        </div>
      </div>
      <div className="hdmas:col-span-12  hd:col-span-2  bg-white rounded-md">
        <div className="flex flex-row  m-[20px]">
          <Typography className="text-2xl font-medium tracking-tight text-pantoneazul leading-6 truncate">
            Filtros
          </Typography>
          <FilterAltIcon className="ml-[10px] text-pantoneazul" />
        </div>
        <h1 className="border border-b-pantoneazul w-full"></h1>
        {cargando?  
        <div className="flex items-center">
          <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
            {/* <p>Chupa Chupa .....</p> */}
            <LinearProgress color="primary" />
          </Stack>
        </div>:
        <div className="flex flex-col flex-auto mt-6">
        <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
          <Box className="flex flex-col hd:flex-col  ">
            {/* sx={{  width: 1000}} */}

           
              <>
                <Box className="flex flex-wrap justify-evenly">
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    disabled={
                      (!state.acreedor &&
                        !state.deudor)
                        ? true
                        : false}
                    options={bussN}
                    value={selected.sBusinessName}
                    // isOptionEqualToValue={(option, value) =>
                    //   bussN.label === value.label
                    // }
                    name="cambio"
                    sx={{ width: 300, mb: 2 }}
                    onChange={(event, newValue) => {
                      if (newValue === null) {
                        setSelected({
                          ...selected,
                          sBusinessName: "",
                          sRut: "",
                        });
                      } 
                      else {
                        setSelected({ ...selected, sBusinessName: newValue });
                        // apiGet(1, newValue.label);
                      }
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="Coordinado" />
                    )}
                  />
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    disabled={
                      (!state.acreedor &&
                        !state.deudor)
                        ? true
                        : false}
                    value={selected.sRut}
                    options={rutN}
                    sx={{ width: 300, mb: 2 }}
                    onChange={(event, newValue) => {
                      if (newValue === null) {
                        setSelected({
                          ...selected,
                          sRut: "",
                          sBusinessName: "",
                        });
                      } else {
                        setSelected({ ...selected, sRut: newValue });
                        // apiGet(1, newValue.label);
                      }
                    }}
                    // isOptionEqualToValue={(option, value) =>
                    //   rutN.label === value.label
                    // }
                    renderInput={(params) => (
                      <TextField {...params} label="Rut" />
                    )}
                  />
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    value={selected.sConcept}
                    // disabled={!disabled ? true : false}
                    options={conceptN}
                    sx={{ width: 300, mb: 2 }}
                    onChange={(event, newValue, reason) => {
                      if (newValue !=null) {
                        setSelected({ ...selected, sConcept: newValue });
                      }else{
                        setSelected({ ...selected, sConcept: "" });

                      }
                    }}
                    // isOptionEqualToValue={(option, value) => conceptN=== value.id}
                    renderInput={(params) => (
                      <TextField {...params} key={params.id} label="Concepto" />
                    )}
                  />
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    value={selected.sCarta}
                    // disabled={props.cargando || !disabled ? true : false}
                    options={cart}
                    sx={{ width: 300, mb: 2 }}
                    onChange={(event, newValue, reason) => {
                      if (newValue !=null) {
                        setSelected({ ...selected, sCarta: newValue });
                      } else{
                        setSelected({ ...selected, sCarta: "" });

                      } 
                    }}
                    // isOptionEqualToValue={(option, value) => cart === value}
                    renderInput={(params) => (
                      <TextField {...params}key={params.id} label="Carta" />
                    )}
                  />
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    value={selected.sCodRef}
                    // disabled={!disabled ? true : false}
                    options={codRef}
                    sx={{ width: 300, mb: 2 }}
                    onChange={(event, newValue, reason) => {
                      if (newValue != null) {
                        setSelected({ ...selected, sCodRef: newValue });
                      } else{
                        setSelected({ ...selected, sCodRef: "" });

                      } 
                    }}
                    // isOptionEqualToValue={(option, value) => codRef === value}
                    renderInput={(params) => (
                      <TextField {...params}  key={params.id} label="Codigo Referencia" />
                    )}
                  />

                  <TextField
                    label="Monto Neto"
                    id="outlined-start-adornment"
                    // disabled={!disabled ? true : false}
                    sx={{ width: 300, mb: 2 }}
                    value={
                      limpiar || selected.sMontoNeto === ""
                        ? ""
                        : chile.format(selected.sMontoNeto).replace("$", "")
                    }
                    onChange={(event) => {
                      if (event.target.value === null) {
                        setSelected({ ...selected, sMontoNeto: null });
                      } else {
                        if (
                          !isLetters(
                            event.target.value
                              .replace(".", "")
                              .replace(".", "")
                              .replace(".", "")
                          )
                        ) {
                          setSelected({
                            ...selected,
                            sMontoNeto: event.target.value
                              .replace(".", "")
                              .replace(".", "")
                              .replace(".", ""),
                          });
                        }
                      }
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    label="Monto Bruto"
                    id="outlined-start-adornment"
                    // disabled={!disabled ? true : false}
                    sx={{ width: 300, mb: 2 }}
                    value={
                      limpiar || selected.sMontoBruto === ""
                        ? ""
                        : chile.format(selected.sMontoBruto).replace("$", "")
                    }
                    onChange={(event) => {
                      if (event.target.value === null) {
                        setSelected({ ...selected, sMontoBruto: null });
                      } else {
                        if (
                          !isLetters(
                            event.target.value
                              .replace(".", "")
                              .replace(".", "")
                              .replace(".", "")
                          )
                        ) {
                          setSelected({
                            ...selected,
                            sMontoBruto: event.target.value
                              .replace(".", "")
                              .replace(".", "")
                              .replace(".", ""),
                          });
                        }
                      }
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    label="Folio"
                    id="outlined-start-adornment"
                    // disabled={!disabled ? true : false}
                    value={selected.sFolio}
                    onChange={(event) => {
                      if (event.target.value === null) {
                        setSelected({ ...selected, sFolio: null });
                      } else {
                        setSelected({
                          ...selected,
                          sFolio: event.target.value,
                        });
                      }
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <ReceiptLongIcon />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ mb: 2, width: 300 }}
                  />
                </Box>

                <LocalizationProvider
                  dateAdapter={AdapterDateFns}
                  adapterLocale={es}
                  
                >
                  <Box className="flex justify-center">

                    <Box className="flex flex-col">
                      {/* <FormControlLabel
                        control={<Checkbox />}
                        label="Desde"
                        disabled
                        checked
                        name="desde"
                      /> */}
                      <DatePicker
                        views={["year", "month"]}
                        label="Fecha inicio"
                        openTo="year"
                        minDate={new Date("2017-02-01")}
                        maxDate={new Date("2023-01-01")}
                        value={sInicioPeriodo === "" ? null : sInicioPeriodo}
                        onChange={(value) => {
                          value != null &&
                            setSelected({
                              ...selected,
                              sInicioPeriodo: value,
                            });
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            helperText={null}
                            sx={{  mb: 2 }}
                          />
                        )}
                      />
                  
                      {/* <FormControlLabel
                        control={<Checkbox />}
                        label="Hasta"
                        onChange={(e) => conditionalPeriods(e)}
                        name="hasta"
                      /> */}
                      <DatePicker
                        views={["year", "month"]}
                        label="Fecha termino"
                        openTo="year"
                        // disabled={disabledDateEnd ? true : false}
                        minDate={new Date("2017-02-01")}
                        maxDate={new Date("2023-01-01")}
                        value={sTerminoPeriodo === "" ? null : sTerminoPeriodo}
                        onChange={(value) => {
                          value != null &&
                            setSelected({
                              ...selected,
                              sTerminoPeriodo: value,
                            });
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            helperText={null}
                            
                            sx={{  mb: 2 }}
                          />
                        )}
                      />
                   
                    </Box>
                  </Box>
                </LocalizationProvider>
                <FormLabel className="text-center" component="legend">
                  Limpieza Filtros
                </FormLabel>
                <Box className="flex flex-wrap justify-evenly">
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox defaultChecked />}
                      label="Filtros"
                      disabled
                      onChange={(e) => conditionFilters(e)}
                      name="filtros"
                    />
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Estados"
                      onChange={(e) => conditionFilters(e)}
                      name="estados"
                    />
                  </FormGroup>
                </Box>
                {/* {props.cargando ? <>Cargando...</> :
                  <><Button
                  className="w-[150px]"
                  variant="contained"
                  color="secondary"
                  startIcon={<SearchIcon />}
                  value={selected.sFolio}
                  onClick={() => {
                    if (condicionFilters === 1) {
                      clearAllFilters();
                    } else {
                      clearFilters();
                    }
                  }}
                  style={{
                    m: 1,
                    width: 200,
                    margin: "0 auto",
                    display: "flex",
                    marginTop: 25,
                    // backgroundColor: "#002553",
                    color: "white",
                  }}
                >
                  Limpiar Filtros
                </Button>
                <Button
                  className="w-[150px]"
                  variant="contained"
                  color="secondary"
                  startIcon={<SearchIcon />}
                  onClick={
                    buscar
                      ? () => {
                          setSelected({ ...selected, buscar: false });
                        }
                      : () => {
                          setSelected({ ...selected, buscar: true });
                        }
                  }
                  style={{
                    m: 1,
                    width: 200,
                    margin: "0 auto",
                    display: "flex",
                    marginTop: 25,

                    color: "white",
                  }}
                >
                  Buscar
                </Button></>
                } */}
                
              </>
            
          </Box>
        </Box>
        </div>}
      
      </div>
      <div className=" hdmas:col-span-12   hd:col-span-10  bg-white rounded-md">
        {/* <div className="flex flex-row  m-[20px]">
          <Typography className="text-2xl font-medium tracking-tight text-pantoneazul leading-6 truncate">
            Instrucciones
          </Typography>
          <FilterAltIcon className="ml-[10px] text-pantoneazul" />
        </div>
        <h1 className="border border-b-pantoneazul w-full"></h1> */}
       
        {cargando? <div className="flex items-center">
                <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
                  {/* <p>Chupa Chupa .....</p> */}
                  <LinearProgress color="primary" />
                </Stack>
              </div>: 
        <Box className="flex flex-col flex-auto p-[5px]  overflow-hidden h-full  w-full">
        <div className="flex flex-col sm:flex-row items-start justify-between">
          {alert && <AlertDialogSlide />}
        </div>
        <div className="flex flex-col flex-auto ">
        
        <div className="flex flex-row justify-between items-center">
              <div className="flex flex-row items-center">
              <div className="flex flex-row justify-center items-center">
              Filas por Página
              <TextField
                id="PagePerRows"
                select
               
                value={rowsPerPage}
                variant="standard"
                // size="small"
              >
                {[5, 10, 25].map((option) => (
                  <MenuItem key={option} value={option} 
                  onClick={()=>{handleChangeRowsCount(option)}}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
              </div>
              <div className="flex flex-row justify-center items-center"> 
              </div>
             
              <Tooltip  
                title="Previo" 
                arrow 
                placement="top"
              >
                <span>
                <IconButton
                  sx={{ "&:hover": { color: "#e4493f" } }}
                  key="chechedRight"
                  aria-label="Close"
                  color="primary"
                  onClick={handleChangePagedos}
                  disabled={pageIndex===1}
                  
                  size="small"
                >
                  <NavigateBeforeIcon fontSize="large" />
                </IconButton>
                </span>
              </Tooltip>
                <Tooltip  
                  title="Siguiente" 
                  arrow 
                  placement="top">
                  <span>
                  <IconButton
                  sx={{ "&:hover": { color: "#e4493f" } }}
                  key="chechedLeft"
                  aria-label="Close"
                  color="primary"
                  onClick={handleChangePage}
                  disabled={pageIndex===pageCount}
                  // disabled={checkeddos.length === 0}
                  size="small"
                >
                  <NavigateNextIcon fontSize="large" />
                </IconButton>
                  </span>
               </Tooltip>
              </div>
              <div>
               <b>{`Página ${pageIndex} de ${pageCount} / Total de instrucciones: ${pagination}`}</b> 
              </div>
          </div>
          <TableContainer component={Paper}>
            <Table
              stickyHeader
              sx={{ minWidth: 650 }}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  {columns.map((column) =>
                    columnsOrder.some((e) => e === column.label) ? (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                        sx={
                          columnsHidden.some((e) => e === column.id)
                            ? { display: { xl: "none", xs: "block" } }
                            : {}
                        }
                      >
                        <ImportExportIcon
                          onClick={() => {
                            orderBy(column.label);
                          }}
                        />{" "}
                        {column.label}
                      </TableCell>
                    ) : (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{
                          minWidth: column.minWidth,
                        }}
                        sx={
                          columnsHidden.some((e) => e === column.id)
                            ? { display: { xl: "none", xs: "block" } }
                            : {}
                        }
                      >
                        {column.label}
                      </TableCell>
                    )
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {getDataInstruction.data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id_instruccions}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          const dataRow = row;

                          // !tableData.some(
                          //   (e) => e.id_instruccions === id_instruccions
                          // );

                          if (
                            columnsHidden.some((e) => e === column.id) &&
                            column.label != "editar"
                          ) {
                            return (
                              <TableCell
                                key={column.id}
                                align={column.align}
                                sx={{ display: { xl: "none", xs: "block" } }}
                              >
                                {column.format && typeof value === "number"
                                  ? column.format(value)
                                  : value}
                              </TableCell>
                            );
                          } else if ("editar" === column.label) {
                            return (
                              <TableCell key={column.id} align={column.align}>
                                <EditIcon
                                  style={{ cursor: "pointer" }}
                                  // onClick={() => {
                                  //   showModal(dataRow);
                                  // }}
                                />
                              </TableCell>
                            );
                          } else if (
                            "Monto Bruto" === column.label ||
                            "Monto Neto" === column.label
                          ) {
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {chile.format(
                                  column.format && typeof value === "number"
                                    ? column.format(value)
                                    : value
                                )}
                              </TableCell>
                            );
                          } else if ("tipo_instruccion" === column.label) {
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {returnInstructionState(value)}
                              </TableCell>
                            );
                          } else if (
                            column.label === "Fecha emision" ||
                            column.label === "Fecha pago" ||
                            column.label === "Fecha carta"
                          ) {
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {random(value)}
                              </TableCell>
                            );
                          } else if (
                            column.label === "E.Emision" ||
                            column.label === "E.Pago"
                          ) {
                            if (value.includes("No")) {
                              return (
                                <TableCell
                                  key={column.id}
                                  align={column.align}
                                  style={{ color: "red" }}
                                >
                                  {column.format && typeof value === "number"
                                    ? column.format(value)
                                    : value}
                                </TableCell>
                              );
                            } else {
                              return (
                                <TableCell
                                  key={column.id}
                                  align={column.align}
                                  style={{ color: "green" }}
                                >
                                  {column.format && typeof value === "number"
                                    ? column.format(value)
                                    : value}
                                </TableCell>
                              );
                            }
                          } else {
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === "number"
                                  ? column.format(value)
                                  : value}
                              </TableCell>
                            );
                          }
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          
          {/* <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={pagination}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            // onRowsPerPageChange={handleChangeRowsPerPage}
          /> */}
        </div>
        {/* {modal && (
          <ModalGeneric
            data={dataInstruction}
            getOpenModal={getOpenModal}
            closeModal={() => {
              tableData = [];
              setModal(false);

              if (render1 === true) {
                setRender1(false);
              } else {
                setRender1(true);
              }
            }}
            proyects={proyects.data.data}
          />
        )} */}
      </Box>}
      
      
      </div>
    </div>
  );
}

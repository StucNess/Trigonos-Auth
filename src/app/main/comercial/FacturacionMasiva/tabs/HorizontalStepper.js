import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import {
  useGetLogsFacturacionQuery,
  useGetInstruccionesSpecmMutation,
} from "app/store/instrucciones/instruccionesApi";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
// ELEMENTOS VISUALES
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
//
import {
  useGetAcreedorDocumentQuery,
  useGetDeudorDocumentQuery,
} from "app/store/instrucciones/instruccionesApi";
import Select from "@mui/material/Select";
import { HiOutlineInformationCircle, HiOutlineUser } from "react-icons/hi";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import themesConfig from "app/configs/themesConfig";
import { useGetInstruccionesQuery } from "app/store/instrucciones/instruccionesApi";
import { useState } from "react";
import { useEffect } from "react";
import TabInstrucciones from "./TabInstrucciones";
import { array } from "prop-types";

// PARA EL ESTILO DEL SELECT MULTIPLE
function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightMedium
        : theme.typography.fontWeightBold,
  };
}
const steps = [
  "Seleccionar cliente",
  "Listado de instrucciones",
  "Finalización del proceso",
];
// let idErp = 0;
let erpSelect;
let array2 = [];
let arrayPendientes = [];
export default function HorizontalLinearStepper(props) {
  const [activeStep, setActiveStep] = useState(0);
  const [idParticipant, setIdParticipant] = useState(0);
  const [getInstrucciones] = useGetInstruccionesSpecmMutation();
  const [facturador, setFacturador] = useState("Vacio");
  const [cargando, setCargando] = useState(true);
  const { data: getParticipants, isLoading: isLoadParticipant } =
    useGetLogsFacturacionQuery(idParticipant);
  const { data: dataWeb = [], isLoading: isloadingListar = true } =
    useGetInstruccionesQuery(idParticipant);
  useEffect(() => {
    if (idParticipant != 0) {
      erpSelect = props.dataParticipants.find(
        (d) => d.id == idParticipant
      ).trgns_erp;
    }
    if (erpSelect == 1) {
      setFacturador("SAP_ABASTIBLE");
    } else if (erpSelect == 2) {
      setFacturador("NUBOX");
    } else if (erpSelect == 3) {
      setFacturador("ENTHERNET");
    } else if (erpSelect == 5) {
      setFacturador("FACTURACION.CL");
    } else if (erpSelect == 7) {
      setFacturador("DEFONTANA");
    }
  }, [idParticipant]);

  const handleNext = () => {
    callInstructions();
    setActiveStep((prevActiveStep) => prevActiveStep + 1);

    // setSkipped(newSkipped);
  };
  const handleBack = () => {
    // setActiveStep((prevActiveStep) => prevActiveStep - 1);
    array2 = [];
    setActiveStep(0);
    setCargando(true);
  };

  const handleReset = () => {
    array2 = [];
    setActiveStep(0);
    setCargando(true);
  };

  const handleChange = (event) => {
    setIdParticipant(event.target.value);
    // idErp = props.dataParticipants.find((d) => d.id);
  };
  const callInstructions = () => {
    getInstrucciones({
      id: idParticipant,
      PageIndex: 1,
      PageSize: 100,
      spec: {
        Folio: 0,
        Acreedor: idParticipant,
        MontoNeto: 10,
        FacturacionMasiva: "A",
      },
    }).then(({ data }) => {
      let buclesF = Math.round(data.count / 100 + 0.49) + 2;

      for (let x = 1; x < buclesF; x++) {
        getInstrucciones({
          id: idParticipant,
          PageIndex: x,
          PageSize: 100,
          spec: {
            Folio: 0,
            Acreedor: idParticipant,
            MontoNeto: 10,
            FacturacionMasiva: "A",
          },
        }).then(({ data }) => {
          data.data.map((e) => {
            array2.push(e);
            if (e.estado_emision == 4) {
              console.log("entre aca ");
              arrayPendientes.push(e.id_instruccions);
            }
          });

          if (array2.length === data.count) {
            setCargando(false);
          }
        });
      }
    });
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            Ha completado el proceso, si lo desea puede inicializarlo otra vez
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Inicializar proceso de nuevo</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}> </Typography>
          {activeStep === 0 ? ( //seleccion de cliente
            <Box>
              <Box
                className="flex justify-center   text-white p-[10px] m-[40px] "
                sx={{ bgcolor: "primary.main" }}
              >
                <HiOutlineUser className="w-[30px] h-[30px]  mr-[10px] " />
                <b>
                  {" "}
                  <span className="text-[20px]"> Seleccionar Cliente</span>
                </b>
              </Box>

              <div className="flex  w-full items-center justify-evenly hdmas:flex-wrap-reverse ">
                <FormControl sx={{ m: 1, minWidth: 300 }}>
                  <InputLabel id="demo-simple-select-autowidth-label">
                    Seleccionar Cliente
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={idParticipant}
                    onChange={handleChange}
                    autoWidth
                    label="Seleccionar Cliente"
                  >
                    <MenuItem value="">
                      <em>Seleccionar</em>
                    </MenuItem>
                    {props.dataParticipants.map(({ business_Name, id }) => (
                      <MenuItem key={id} value={id}>
                        {business_Name}.
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Box sx={{ m: 1, minWidth: 300 }}>
                  {facturador}
                  {/* INSERTAR IMAGEN DE CLIENTE */}
                </Box>
              </div>
            </Box>
          ) : (
            //descarga de folio/instrucciones
            <>
              {/* <Box> */}
              {cargando == true ? (
                <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
                  <LinearProgress color="primary" />
                </Stack>
              ) : (
                <TabInstrucciones
                  dataInstructions={array2}
                  dataPendiente={arrayPendientes}
                  dataLogsFacturacion={getParticipants.data}
                  erp={
                    props.dataParticipants.find((d) => d.id == idParticipant)
                      .trgns_erp
                  }
                  id={
                    props.dataParticipants.find((d) => d.id == idParticipant).id
                  }
                />
              )}

              {/* </Box> */}
            </>
          )}
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Atrás
            </Button>
            <Button onClick={handleNext}>
              {activeStep === 0 && "Siguiente"}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}

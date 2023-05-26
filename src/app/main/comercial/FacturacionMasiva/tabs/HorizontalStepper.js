import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
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
export default function HorizontalLinearStepper(props) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [idParticipant, setIdParticipant] = useState(0);
  const { data: dataWeb = [], isLoading: isloadingListar = true } =
    useGetInstruccionesQuery(idParticipant);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    // setSkipped(newSkipped);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  const [cliente, setcliente] = React.useState("");

  const handleChange = (event) => {
    setIdParticipant(event.target.value);
    // idErp = props.dataParticipants.find((d) => d.id);
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
                    {props.dataParticipants
                      .filter((data) => data.trgns_erp != 5)
                      .map(({ business_Name, id }) => (
                        <MenuItem key={id} value={id}>
                          {business_Name}.
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
                <Box sx={{ m: 1, minWidth: 300 }}>
                  INSERTE IMAGEN
                  {/* INSERTAR IMAGEN DE CLIENTE */}
                </Box>
              </div>
            </Box>
          ) : activeStep === 1 ? ( //descarga de folio/instrucciones
            <>
              {/* <Box> */}

              <TabInstrucciones
                erp={
                  props.dataParticipants.find((d) => d.id == idParticipant)
                    .trgns_erp
                }
                id={
                  props.dataParticipants.find((d) => d.id == idParticipant).id
                }
              />

              {/* </Box> */}
            </>
          ) : (
            //finalizacion del proceso
            <Box>
              <Box
                className="flex justify-center   text-white p-[10px] m-[40px] "
                sx={{ bgcolor: "primary.main" }}
              >
                <CheckCircleOutlinedIcon className="w-[30px] h-[30px]  mr-[10px] " />
                <b>
                  {" "}
                  <span className="text-[20px]">Finalizar Proceso</span>
                </b>
              </Box>
              <div className="flex  w-full items-center justify-evenly m-[10px]  ">
                <Button
                  className="w-[150px]"
                  variant="contained"
                  color="secondary"
                  startIcon={<FileUploadIcon />}
                  style={{
                    m: 1,
                    width: 250,
                    margin: "0 auto",
                    display: "flex",
                    marginTop: 25,

                    color: "white",
                  }}
                >
                  Subir Archivo
                </Button>
              </div>
            </Box>
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
              {activeStep === steps.length - 1 ? "Finalizar" : "Siguiente"}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}

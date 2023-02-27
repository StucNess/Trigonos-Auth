import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { HiOutlineInformationCircle,HiOutlineUser } from  "react-icons/hi";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
// PARA EL ESTILO DEL SELECT MULTIPLE
function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightMedium
          : theme.typography.fontWeightBold,
    };
  }
const steps = ['Seleccionar cliente', 'Listado de instrucciones', 'Finalización del proceso'];

export default function HorizontalLinearStepper() {

  const [activeStep, setActiveStep] = React.useState(0);
//   const [skipped, setSkipped] = React.useState(new Set());

//   const isStepOptional = (step) => {
//     return step === 1;
//   };

//   const isStepSkipped = (step) => {
//     return skipped.has(step);
//   };

  const handleNext = () => {
    // let newSkipped = skipped;
    // if (isStepSkipped(activeStep)) {
    //   newSkipped = new Set(newSkipped.values());
    //   newSkipped.delete(activeStep);
    // }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    // setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

//   const handleSkip = () => {
//     if (!isStepOptional(activeStep)) {
//       // You probably want to guard against something like this,
//       // it should never occur unless someone's actively trying to break something.
//       throw new Error("You can't skip a step that isn't optional.");
//     }

//     setActiveStep((prevActiveStep) => prevActiveStep + 1);
//     setSkipped((prevSkipped) => {
//       const newSkipped = new Set(prevSkipped.values());
//       newSkipped.add(activeStep);
//       return newSkipped;
//     });
//   };

  const handleReset = () => {
    setActiveStep(0);
  };
  const [cliente, setcliente] = React.useState('');

  const handleChange = (event) => {
      setcliente(event.target.value);
      
  };




  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
        //   if (isStepOptional(index)) {
        //     labelProps.optional = (
        //       <Typography variant="caption">Optional</Typography>
        //     );
        //   }
        //   if (isStepSkipped(index)) {
        //     stepProps.completed = false;
        //   }
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
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Inicializar proceso de nuevo</Button>
          </Box>
        </React.Fragment>
      ): (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}> </Typography>
          {activeStep ===0 ?( //seleccion de cliente
            <Box >
                <div className="flex justify-center  bg-pantonerojo  text-white p-[10px] m-[40px] ">
        
                    <HiOutlineUser  className="w-[30px] h-[30px]  mr-[10px] " /><b> <span  className="text-[20px]"> Seleccionar Cliente</span></b>

                </div>
              
                <div className="flex  w-full items-center justify-evenly hdmas:flex-wrap-reverse ">
                                <FormControl sx={{ m: 1, minWidth: 300 }}>
                                    <InputLabel id="demo-simple-select-autowidth-label">Seleccionar Cliente</InputLabel>
                                    <Select
                                    labelId="demo-simple-select-autowidth-label"
                                    id="demo-simple-select-autowidth"
                                    value={cliente}
                                    onChange={handleChange}
                                    autoWidth
                                    label="Seleccionar Cliente"
                                    >
                                    <MenuItem value="">
                                        <em>Seleccionar</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Abastible S.A.</MenuItem>
                                    <MenuItem value={21}>ANTUKO GENERACIÓN S.A</MenuItem>
                                    <MenuItem value={22}>AustrianSlar Chile Cuatro P.A.N</MenuItem>
                                    </Select>
                                </FormControl>
                                <Box sx={{ m: 1, minWidth: 300 }}> 
                                 INSERTE IMAGEN
                                    {/* INSERTAR IMAGEN DE CLIENTE */}
                                </Box>
                </div>
            </Box>
          ):activeStep ===1 ?(  //descarga de folio/instrucciones
          <Box>
            
            <div className="flex justify-center  bg-pantonerojo  text-white p-[10px] m-[40px] ">
        
                <ListAltOutlinedIcon  className="w-[30px] h-[30px]  mr-[10px] " /><b> <span  className="text-[20px]">Listado de Instrucciones</span></b>

            </div>
  
          </Box>
          ):(//finalizacion del proceso
            <Box>
                 <div className="flex justify-center  bg-pantonerojo  text-white p-[10px] m-[40px] ">
        
                    <CheckCircleOutlinedIcon  className="w-[30px] h-[30px]  mr-[10px] " /><b> <span  className="text-[20px]">Finalizar Proceso</span></b>

                </div>
                <div  className="flex  w-full items-center justify-evenly m-[10px]  ">
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
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            
            <Box sx={{ flex: '1 1 auto' }} />
            {/* {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )} */}
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Atrás
            </Button>
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finalizar' : 'Siguiente'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}


//ORDENAR CODIGO

import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SearchIcon from "@mui/icons-material/Search";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
const steps = ['Coordinado', 'Datos de Contacto', 'Datos Bancarios','Gestión Trígonos', 'Historificación']; 
const iconSteps = [<LockOpenIcon/>,<ManageAccountsIcon/>,<AssignmentIcon/>,<AccountBalanceIcon/>,<ManageHistoryIcon/>];
let LabelSetep ='';
export default function HorizontalNonLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const [activeLabel, setActiveLabel] = React.useState('');
  const [grupo, setGrupo] = React.useState('');
  const [erp, setErp] = React.useState('');

  const handleChange = (event) => {
    setGrupo(event.target.value);
  };
  const handleChangeERP = (event) => {
    setErp(event.target.value);
  };

  //erp
  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step,i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
    

  };

  const handleBack = () => {

    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    console.log(step);
    setActiveStep(step);
  };
 
  
  
  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };
  //step icon
  
  const handleIconStep = (step) =>{
    if (step===0) {
      LabelSetep = 'Coordinado';
      return <Box  >
              <LockOpenIcon  />
              </Box>
                  ;
    } else if (step===1) {
      return <ManageAccountsIcon />;
    } else if (step===2) {
      return <AssignmentIcon/>;
    } else if (step===3) {
      return <AccountBalanceIcon/>;
  
    } else {
      return <ManageHistoryIcon/>;
    }
    
  };
 {/* <Typography className="border-b-4 border-indigo-500"  color="primary">
                 
                 {label}
                </Typography> */}
  return (
    <Box className="flex w-full h-full" sx={{ width: '100%' }}>
      
        <Box className="pr-[10px]  md:min-w-[300px] h-full"  >
            <Typography variant="h6" className="mb-4"   color="primary">
                Gestión de Participantes
            </Typography>
            
            <Stepper className="ml-[30px] mt-[30px] " nonLinear activeStep={activeStep} orientation="vertical">
            {steps.map((label, index) => (
            <Step key={label} completed={completed[index] } 
            sx={{
              '& .MuiStepLabel-root .Mui-completed': {
                color: 'secondary.light', 
              },
              '& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel':
                {
                  color: 'secondary.light', 
                },
              '& .MuiStepLabel-root .Mui-active': {
                color: 'secondary.main', 
              },
              '& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel':
                {
                  color: 'common.black', 
                },
              '& .MuiStepIcon':
                {
                  color:  'blue',
                },
                
                
                
              
            }}
            
            >
              <StepButton focusRipple className="hover:bg-blue-50" StepIconProps={{
                    classes: {
                      root: classes.stepIconRoot,
                      active: classes.stepIconActive,
                      completed: classes.stepIconCompleted
                    }
                  }} icon={handleIconStep(index)} onClick={handleStep(index)}
            >
                {label}
                </StepButton>
            </Step>
            ))}
            
        </Stepper>
        </Box>
      
      <Box className="mt-[30px]  border-solid border-l-2 w-full" >
        
        {allStepsCompleted() ? (
          <Box className="w-full">
              <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </Box>
          // <React.Fragment>
          
          // </React.Fragment>
        ) : (
          
          <Box className="ml-[10px]  ">

           
            <Box className=" h-[300px] ">
            {activeStep ===0 ?(
            <Box className="w-full">
                <Typography variant="h6" className="mb-4"   color="primary">
                    Coordinado
                </Typography>
                
                <Box className="flex flex-wrap justify-between zerorange:justify-center  ">
                    <TextField
                      className="zerorange:w-[300px]  lg:w-[400px] w-[350px]  mdmax:m-[20px] m-[20px] zerorange:m-[10px] "
                      label="Nombre"
                      type="text"
                      
                      variant="filled"
                    />
                    <TextField
                      className="zerorange:w-[300px]  lg:w-[400px] w-[350px]  mdmax:m-[20px] m-[20px] zerorange:m-[10px] "
                      label="Nombre Comercial"
                      type="text"
                      
                      variant="filled"
                    /> 
                    <TextField
                      className="zerorange:w-[300px]  lg:w-[400px] w-[350px]  mdmax:m-[20px] m-[20px] zerorange:m-[10px] "
                      label="Giro"
                      type="text"
                      
                      variant="filled"
                    /> 
                    <FormControl variant="filled" className="zerorange:w-[300px]  lg:w-[400px] w-[350px]  mdmax:m-[20px] m-[20px] zerorange:m-[10px] ">
                      <InputLabel id="demo-simple-select-filled-label">Grupo Coordinado</InputLabel>
                      <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        value={grupo}
                        onChange={handleChange}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                      </Select>
                    </FormControl>
                    <TextField
                      className="zerorange:w-[300px]  lg:w-[400px] w-[350px]  mdmax:m-[20px] m-[20px] zerorange:m-[10px] "
                      label="Rut"
                      type="text"
                      
                      variant="filled"
                    /> 
                </Box>



            </Box>
          ):activeStep ===1 ?( 
          <Box className="w-full">
                <Typography variant="h6" className="mb-4"   color="primary">
                    Datos de Contacto
                </Typography>
                <Box className="flex flex-wrap justify-between zerorange:justify-center ml-[0 auto]" >
                    
                    <TextField
                      className="zerorange:w-[250px]  lg:w-[400px] w-[300px]  mdmax:m-[20px] m-[20px] zerorange:m-[10px] "
                      label="Dirección Comercial"
                      type="text"
                      
                      variant="filled"
                    />
                    <TextField
                      className="zerorange:w-[250px]  lg:w-[400px] w-[300px]  mdmax:m-[20px] m-[20px] zerorange:m-[10px] "
                      label="Comuna"
                      type="text"
                      
                      variant="filled"
                    /> 
                    <TextField
                      className="zerorange:w-[250px]  lg:w-[400px] w-[300px]  mdmax:m-[20px] m-[20px] zerorange:m-[10px] "
                      label="Ciudad"
                      type="text"
                      
                      variant="filled"
                    /> 
                    <TextField
                      className="zerorange:w-[250px]  lg:w-[400px] w-[300px]  mdmax:m-[20px] m-[20px] zerorange:m-[10px] "
                      label="Email DTE"
                      type="email"
                      
                      variant="filled"
                    /> 
                    <TextField
                      className="zerorange:w-[250px]  lg:w-[400px] w-[300px]  mdmax:m-[20px] m-[20px] zerorange:m-[10px] "
                      label="Nómina ID"
                      type="text"
                      
                      variant="filled"
                    /> 
                  
                    
                </Box>
          </Box>
          ):activeStep ===2 ?(
          <Box className="w-full">
                <Typography variant="h6" className="mb-4"   color="primary">
                    Datos Bancarios
                </Typography>
                <Box className="flex flex-wrap justify-between zerorange:justify-center ml-[0 auto]" >
                    
                    <TextField
                      className="zerorange:w-[250px]  lg:w-[400px] w-[300px]  mdmax:m-[20px] m-[20px] zerorange:m-[10px] "
                      label="Banco"
                      type="text"
                      
                      variant="filled"
                    />
                    <TextField
                      className="zerorange:w-[250px]  lg:w-[400px] w-[300px]  mdmax:m-[20px] m-[20px] zerorange:m-[10px] "
                      label="Cuenta Corriente"
                      type="text"
                      
                      variant="filled"
                    /> 
                    <TextField
                      className="zerorange:w-[250px]  lg:w-[400px] w-[300px]  mdmax:m-[20px] m-[20px] zerorange:m-[10px] "
                      label="RUT Cuenta Corriente"
                      type="text"
                      
                      variant="filled"
                    /> 
                 
                  
                    
                </Box>
               
          </Box >
          ):activeStep ===3 ?(
          <Box className="w-full">
                <Typography variant="h6" className="mb-4"   color="primary">
                    Gestión Trígonos
                </Typography>


                <Box className="flex flex-wrap justify-between zerorange:justify-center ml-[0 auto]" >
                    
                    <TextField
                      className="zerorange:w-[250px]  lg:w-[400px] w-[300px]  mdmax:m-[20px] m-[20px] zerorange:m-[10px] "
                      label="Token"
                      type="text"
                      
                      variant="filled"
                    />
                  
                  <FormControl variant="filled" className="zerorange:w-[300px]  lg:w-[400px] w-[350px]  mdmax:m-[20px] m-[20px] zerorange:m-[10px] ">
                      <InputLabel id="demo-simple-select-filled-label">ERP</InputLabel>
                      <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        value={erp}
                        onChange={handleChangeERP}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                      </Select>
                    </FormControl>
                  
                    
                </Box>
          </Box>
          ):(
            <Box className="w-full">
                <Typography variant="h6" className="mb-4"   color="primary">
                    Historificación 
                </Typography>
                <Box className="flex flex-wrap justify-between zerorange:justify-center ml-[0 auto] w-full">
                  Debo ingresar a la bd y consultar estos campos uwu
                </Box>
            </Box>
          )}
            </Box>
          <Box className=" flex justify-end w-full">
            
            <Button
                className="w-[150px]"
                variant="contained"
                color="secondary"
                // startIcon={<SearchIcon />}
                disabled={activeStep === 0}
                onClick={handleBack}
                >
                Atrás
              </Button>
            <Button
                className="w-[150px]"
                variant="contained"
                color="secondary"
                // startIcon={<SearchIcon />}
                onClick={handleNext}
                >
                Siguiente
              </Button>
            {activeStep !== steps.length &&
              (completed[activeStep] ? (
                <Typography variant="caption" sx={{ display: 'inline-block' }}>
                  Confirmado
                </Typography>
              ) : (
                <Button onClick={handleComplete}>
                  {completedSteps() === totalSteps() - 1
                    ? 'Finalizar'
                    : 'completar'}
                </Button>
              ))}
          </Box>
          </Box>
       
        
        )}
      </Box>
    </Box>
  );
}
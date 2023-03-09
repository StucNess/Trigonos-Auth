

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

const steps = ['Coordinado', 'Datos de Contacto', 'Datos Bancarios','Gestión Trígonos', 'Historificación']; 
const iconSteps = [<LockOpenIcon/>,<ManageAccountsIcon/>,<AssignmentIcon/>,<AccountBalanceIcon/>,<ManageHistoryIcon/>];
let LabelSetep ='';
export default function HorizontalNonLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const [activeLabel, setActiveLabel] = React.useState('');
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
      return <ManageAccountsIcon/>;
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
    <Box className="flex w-full" sx={{ width: '100%' }}>
      
        <Box className="pr-[10px]" >
            <Typography variant="h6" className="mb-4"   color="primary">
                Gestión de Participantes
            </Typography>
            
            <Stepper className="ml-[30px] mt-[30px]" nonLinear activeStep={activeStep} orientation="vertical">
            {steps.map((label, index) => (
            <Step key={label} completed={completed[index]}
            sx={{
              '& .MuiStepLabel-root .Mui-completed': {
                color: 'secondary.dark', // circle color (COMPLETED)
              },
              '& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel':
                {
                  color: 'grey.500', // Just text label (COMPLETED)
                },
              '& .MuiStepLabel-root .Mui-active': {
                color: 'secondary.main', // circle color (ACTIVE)
              },
              '& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel':
                {
                  color: 'common.white', // Just text label (ACTIVE)
                },
              '& .MuiStepLabel-root .Mui-active .MuiStepIcon-text': {
                fill: 'black', // circle's number (ACTIVE)
              },
            }}
            
            >
              <StepButton className="hover:bg-blue-50" icon={handleIconStep(index)} onClick={handleStep(index)}  >
                {label}

                

                </StepButton>
            </Step>
            ))}
            
        </Stepper>
        </Box>
      
      <Box className="mt-[30px]  border-solid border-l-2" >
        
        {allStepsCompleted() ? (
          <Box>
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

           
            {activeStep ===0 ?(
            <Box >
                 <Typography variant="h6" className="mb-4"   color="primary">
                    Coordinado
                </Typography>
            </Box>
          ):activeStep ===1 ?( 
          <Box>
                <Typography variant="h6" className="mb-4"   color="primary">
                    Datos de Contacto
                </Typography>
          </Box>
          ):activeStep ===2 ?(
          <Box>
                <Typography variant="h6" className="mb-4"   color="primary">
                    Datos Bancarios
                </Typography>
               
          </Box>
          ):activeStep ===3 ?(
          <Box>
                <Typography variant="h6" className="mb-4"   color="primary">
                    Gestión Trígonos
                </Typography>
          </Box>
          ):(
            <Box>
                <Typography variant="h6" className="mb-4"   color="primary">
                    Historificación 
                </Typography>
            </Box>
          )}
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Atrás
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleNext} sx={{ mr: 1 }}>
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
                    ? 'Finish'
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
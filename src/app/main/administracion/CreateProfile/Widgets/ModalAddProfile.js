
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import IconButton from '@mui/material/IconButton';
import Typography from "@mui/material/Typography";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import TextField from "@mui/material/TextField";
import Switch from '@mui/material/Switch';
import { useEffect, useRef, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import { Paper } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";
import jwtServiceConfig from 'src/app/auth/services/jwtService/jwtServiceConfig';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
const schema = yup.object().shape({
  // user: yup.string().required("Debe ingresar su nombre completo"),
  
  name: yup
    .string()
    .required("Debe ingresar un Nombre"),
  descripcion: yup
    .string()
    .required("Debe ingresar una Descripción"),
});
const defaultValues = {

  name: "",
  descripcion: "",
  
  
};

const label = { inputProps: { 'aria-label': 'Switch demo' } };
export default function ModalAddProfile({
    setTable,tipoModal = true,
}) {
  const [open, setOpen] = useState(true);
  const [scroll, setScroll] = useState('paper');
  const [secondDopen, setSecondDopen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [nameRol, setNameRol] = useState("");
  const [descRol, setDescRol] = useState("");
  const [MsgAlert, setMsgAlert] = useState({
    msgResp: false,
    msgText:"",
    msgError:false,
  });
  const {msgResp,msgText,msgError} = MsgAlert;
  const { control, formState, handleSubmit, reset } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });
  const { isValid, dirtyFields, errors } = formState;
  const handleClose = () => {
    setOpen(false);
    setTable();
  };
  const handleClickOpen = () => {
    setSecondDopen(true);
  
  };
  const handleCloseAlert = () => {
    setSecondDopen(false);
  };
 
  const handleChangeNombre = event => {
    setNameRol(event.target.value);
  };
  const handleChangeDesc = event => {
    setDescRol(event.target.value);
  };
  function onSubmitRol(e) {
    const data = {
      name: e.name,
      descripcion: e.descripcion,
      bhabilitado: 0,
    };
    setLoading(true);
    setTimeout(() => {
      axios
      .post(jwtServiceConfig.addNewRol, data)
      .then((response) => {
        setLoading(false);
        setMsgAlert({msgResp: true,msgText:"Rol agregado correctamente.",msgError:false});
        setTimeout(() => {
          handleClose();
        },2500);
      })
      .catch((error) => {
        setLoading(false);
        setMsgAlert({msgResp: true,msgText:"Error, no se ha logrado agregar el Rol.",msgError:true});
        setTimeout(() => {
          handleClose();
        },2500);
      });
    }, 2000);
  }

  return (
    <Dialog
        open={open}
        // onClose={handleClose}
      
        scroll={'paper'}
         aria-labelledby="scroll-dialog-title"
         aria-describedby="scroll-dialog-description"
      >

      
        <DialogTitle id="scroll-dialog-title"><div className="static ">
                <Typography className="text-2xl font-medium tracking-tight text-pantoneazul leading-6 truncate mt-[5px]">
                Agregar Nuevo Perfil <RecentActorsIcon/>
                </Typography>

                
                <IconButton className="absolute top-0 right-0" onClick={handleClose} variant="contained" color="error">
                    <HighlightOffIcon />
                </IconButton>
            
            </div></DialogTitle>
        <DialogContent dividers={scroll === 'paper'} className="min-w-[400px]">
          <div>
        <form
            name="registerForm"
            noValidate
            className="w-full"
            // onSubmit={}
            >
                <div className="ml-[10px] mr-[10px] flex flex-col">
                        
                        <Controller
                          name="name"
                          control={control}
                          render={({ field }) => (
                              <TextField
                              {...field}
                  
                              className="w-full mt-[20px]"
                              label="Nombre Rol"
                              onChange={e => {
                                field.onChange(e);
                                handleChangeNombre(e);
                              }}
                              type="text"
                              error={!!errors.nombre}
                              helperText={errors?.nombre?.message}
                              variant="filled"
                              required
                              
                              />
                          )}
                        />
                        <Controller
                          name="descripcion"
                          control={control}
                          render={({ field }) => (
                              <TextField
                              {...field}
                  
                              className="w-full mt-[20px]"
                              label="Descripción Rol"
                              onChange={e => {
                                field.onChange(e);
                                handleChangeDesc(e);
                              }}
                              type="text"
                              error={!!errors.descripcion}
                              helperText={errors?.descripcion?.message}
                              variant="filled"
                              required
                              
                              />
                          )}
                        />
                </div>
                        <div className="ml-[10px] mr-[10px] flex flex-col">
                        <h4>Selección de paginas</h4>
                     
                        <FormGroup className="ml-[10px]">
                            <FormControlLabel control={<Switch defaultChecked />} label="Todas" />
                            <FormControlLabel control={<Checkbox  />} label="Gestión Participantes" />
                            <FormControlLabel control={<Checkbox  />} label="Agregar Usuarios" />
                            <FormControlLabel control={<Checkbox  />} label="Estado de facturación" />
                            <FormControlLabel control={<Checkbox  />} label="Nominas de Pago" />
                            <FormControlLabel control={<Checkbox  />} label="Facturación Masiva" />
                            <FormControlLabel control={<Checkbox  />} label="DashBoards" />
                            <FormControlLabel control={<Checkbox  />} label="Label" />
                            <FormControlLabel control={<Checkbox  />} label="Label" />
                            <FormControlLabel control={<Checkbox  />} label="Label" />
                            <FormControlLabel control={<Checkbox  />} label="Label" />
                            <FormControlLabel control={<Checkbox  />} label="Label" />
                            <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
                        
                            <FormControlLabel disabled control={<Checkbox />} label="Disabled" />
                        </FormGroup>

                </div>
                <Dialog
          open={secondDopen}
          // onClose={handleCloseAlert}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          {loading?(<div className='flex justify-center items-center h-[250px] w-[300px]'>
            <CircularProgress color="secondary"/>
          </div>):(
          <div>
           {msgResp? (<div className='flex justify-center items-center h-[250px] w-[300px]' >
            {msgError? (<div className='flex justify-center items-center h-[250px] w-[300px]'>
              <WarningIcon className='w-[68px] h-[68px] text-red'/>
              <span className='absolute bottom-[70px] text-red'> <b>{msgText}</b></span>
            </div>):(<div className='flex justify-center items-center h-[250px] w-[300px]'>
              <CheckCircleIcon className='w-[68px] h-[68px] text-green'/>
              <span className='absolute bottom-[70px] text-green'> <b>{msgText}</b></span>
            </div>)}
            
           </div>):(<div>
            <DialogTitle id="alert-dialog-title">
            {"¿Desea guardar el siguiente Rol?"}
          </DialogTitle>
          <DialogContent className='flex flex-col' >
            <Typography className="text-lg font-medium tracking-tight text-pantoneazul leading-6 truncate mt-[5px]">
            Nombre del Rol: <b className='text-black'>{nameRol}</b>
            </Typography>
            <Typography className="text-lg font-medium tracking-tight text-pantoneazul leading-6 truncate mt-[5px]">
            Descripción del Rol: <b className='text-black'>{descRol}</b>
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAlert}>Cancelar</Button>
            <Button onClick={handleSubmit(onSubmitRol)} autoFocus>
              Guardar
            </Button>
          </DialogActions>
           </div>)}
          </div>)}
        </Dialog>
          </form>
          </div>
          
        
        </DialogContent>
        <DialogActions className='flex justify-center m-[20px]'>
      
                <Button 
                    size="large"
                    className=" h-[28px]  w-[100px] mr-[20px]"
                    disabled={_.isEmpty(dirtyFields) || !isValid}
                    onClick={handleClickOpen}
                    variant="contained"
                    color="secondary">
                      Guardar
                  </Button>
                        
            
        </DialogActions>
        
       
      </Dialog>

  );
}

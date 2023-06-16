
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import IconButton from '@mui/material/IconButton';
import Typography from "@mui/material/Typography";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import EditIcon from "@mui/icons-material/Edit";

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
import ScreenshotMonitorIcon from '@mui/icons-material/ScreenshotMonitor';
import DesktopAccessDisabledIcon from '@mui/icons-material/DesktopAccessDisabled';
import { Paper } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";
import jwtServiceConfig from 'src/app/auth/services/jwtService/jwtServiceConfig';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import InputAdornment from "@mui/material/InputAdornment";
import { useGetAllRoutesQuery, useGetListarPaginaWebQuery, usePostDeshabilitarRolMutation, usePostEditRolMutation, usePostHabilitarRolMutation, usePostNewRolMutation, usePostNewRolPagesMutation } from "app/store/RoutesRoles/routesApi";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CommentIcon from "@mui/icons-material/Comment";
import CachedIcon from '@mui/icons-material/Cached';
import Tooltip from '@mui/material/Tooltip';
const schema = yup.object().shape({
  // user: yup.string().required("Debe ingresar su nombre completo"),
  
  nombre: yup
    .string()
    .required("Debe ingresar un Nombre"),
  descripcion: yup
    .string()
    .required("Debe ingresar una Descripción"),
});
const defaultValues = {

  nombre: "",
  descripcion: "",
  
  
};

const label = { inputProps: { 'aria-label': 'Switch demo' } };
export default function ModalAddProfile({
    setTable,
    tipoModal ,//true es para un nuevo perfil, false es para editar un perfil
    dataRol,
    dataAsing,
    dataNoAsing,

}) {
  
  const [open, setOpen] = useState(true);
  const [scroll, setScroll] = useState('paper');
  const [secondDopen, setSecondDopen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [countActive, setCountActive] = useState(0);
  const [postHabilitarRol, data_] = usePostHabilitarRolMutation();
  const [postDeshabilitarRol, data] = usePostDeshabilitarRolMutation();
  const [postNewRol, data__] = usePostNewRolMutation();
  const [postNewRolPages, data_rolpages_] = usePostNewRolPagesMutation();
  const [postEditRol,dataEditRol] = usePostEditRolMutation()
  
  const {data: dataWeb =[],isLoading: isloadingListar =true} = useGetListarPaginaWebQuery();  //Son las paginas web que estan disponibles en la BD.

  const postHabilitarRolPagina = async (data) => {
    try {
      await postHabilitarRol(data);
      // console.log(response); // Manejar la respuesta exitosa
    } catch (error) {
      // console.error(error); // Manejar el error
    }
  };
  const postDeshabilitarRolPagina = async (data) => {
    try {
      await postDeshabilitarRol(data);
      // console.log(response); // Manejar la respuesta exitosa
    } catch (error) {
      // console.error(error); // Manejar el error
    }
  };
  const [nameRol, setNameRol] = useState("");
  const [descRol, setDescRol] = useState("");
  const [idprueba, setidprueba] = useState(2);
  const [MsgAlert, setMsgAlert] = useState({
    msgResp: false,
    msgText:"",
    msgError:false,
  });
  const {msgResp,msgText,msgError} = MsgAlert;


 
  if(tipoModal){
   return( 
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
        
      </div>
    </DialogContent>
    <DialogActions className='flex justify-center m-[20px]'>
  
            <Button 
                size="large"
                className=" h-[28px]  w-[100px] mr-[20px]"
                // disabled={_.isEmpty(dirtyFields) || !isValid}
                onClick={handleClickOpen}
                variant="contained"
                color="secondary">
                  Guardar
              </Button>
                    
        
    </DialogActions>
    
   
  </Dialog>
  }

  

  
}


import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useRef, useState } from 'react';
import Typography from "@mui/material/Typography";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import IconButton from '@mui/material/IconButton';
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import TextField from "@mui/material/TextField";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import * as yup from "yup";
const schema = yup.object().shape({
    // user: yup.string().required("Debe ingresar su nombre completo"),
    rutCompany: yup
      .string()
      .required("Debe ingresar un rut de empresa"),
      nameCompany: yup
      .string()
      .required("Debe ingresar un nombre comercial"),
  });
  const defaultValues = {
    rutCompany:"",
    nameCompany: "",
    
    
  };
export default function ModalAddCompany({setActive}) {
  const [open, setOpen] = useState(true);
  const [scroll, setScroll] = useState('paper');
 
  const { control, formState, handleSubmit, reset } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });
  const { isValid, dirtyFields, errors } = formState;

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
    setActive();
  };

  const descriptionElementRef = useRef(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    // <div>
    //   <Button onClick={handleClickOpen('paper')}>scroll=paper</Button>
    //   <Button onClick={handleClickOpen('body')}>scroll=body</Button>
      <Dialog
        open={open}
        // onClose={handleClose}
      
        scroll={'paper'}
        // aria-labelledby="scroll-dialog-title"
        // aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title"><div className="static ">
                <Typography className="text-2xl font-medium tracking-tight text-pantoneazul leading-6 truncate mt-[5px]">
                Agregar Nueva Empresa <DriveFileRenameOutlineIcon/>
                </Typography>

                
                <IconButton className="absolute top-0 right-0" onClick={handleClose} variant="contained" color="error">
                    <HighlightOffIcon />
                </IconButton>
            
            </div></DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
        <div className='flex flex-col m-[20px]   min-w-[300px]'>
            <Controller
                    name="rutCompany"
                    
                    control={control}
                    render={({ field }) => (
                        <TextField
                        {...field}
                        className="w-full mb-[20px]"
                        label="Rut Empresa"
                       
                        type="text"
                        error={!!errors.rutCompany}
                        helperText={errors?.rutCompany?.message}
                        variant="outlined"
                        required
                        
                        />
                    )}
                    />
            <Controller
                    name="nameCompany"
                    control={control}
                    render={({ field }) => (
                        <TextField
                        {...field}
                        className="w-full mt-[20px]"
                        label="Nombre Comercial"
                       
                        type="text"
                        error={!!errors.nameCompany}
                        helperText={errors?.nameCompany?.message}
                        variant="outlined"
                        required
                        
                        />
                    )}
                    />
        </div>
        
        </DialogContent>
        <DialogActions className='flex justify-center m-[20px]'>
      
                <Button
                    variant="contained"
                    color="secondary"
                    className=" h-[28px]  w-[100px] mr-[20px]"
                    onClick={handleClose}
                    
                    size="small">
                    Cancelar
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    className=" h-[28px]  w-[100px] mr-[20px]"
                    
                    type="submit"
                    size="small">
                    Guardar
                </Button>
                
            
        </DialogActions>
      </Dialog>
    // </div>
  );
}
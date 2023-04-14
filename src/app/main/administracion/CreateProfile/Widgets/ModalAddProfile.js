
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



import { Paper } from "@mui/material";
import { useState } from "react";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  
  borderRadius: 2,
};
const label = { inputProps: { 'aria-label': 'Switch demo' } };
export default function ModalAddProfile({
    setTable,
}) {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    setTable();
  };


  return (
    <div>
      <Modal
        open={open}
        onClose={() => handleClose}
        >
       
          <Box sx={style}>
            
            <div className="static  m-[20px] min-w-[400px]">
                <Typography className="text-2xl font-medium tracking-tight text-pantoneazul leading-6 truncate mt-[5px]">
                    Agregar un nuevo Perfil
                    </Typography>
                
                <IconButton className="absolute top-0 right-0" onClick={handleClose} variant="contained" color="error">
                    <HighlightOffIcon />
                </IconButton>
            
            </div>
            
            <h1 className="border-b-[1px] border-b-pantoneazul w-full"></h1>
            
            <div className="overflow-y-scroll max-h-[80vh]">
                <div className="ml-[10px] mr-[10px] flex flex-col">
                    <TextField className="w-full mt-[20px] mb-[20px]" id="outlined-basic" label="Código de Referencia" variant="filled" />
                    <TextField className="w-full mt-[20px] mb-[20px]" id="outlined-basic" label="Nombre del Rol" variant="filled" />
                    <TextField className="w-full mt-[20px] mb-[20px]" id="outlined-basic" label="Descripción del Rol" variant="filled" />
                </div>
                <div className="ml-[10px] mr-[10px] flex flex-col">
                <h4>Selección de paginas</h4>
                <Switch {...label} />
                <FormGroup className="ml-[10px]">
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
            </div>
            <h1 className="border-b-[1px] border-b-pantoneazul w-full"></h1>
            <div className="flex justify-evenly  m-[20px]">
                <Button
                    variant="contained"
                    color="secondary"
                    className=" h-[28px]  w-[100px] mr-[20px]"
                    onClick={handleClose}
                    type="submit"
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
                
            </div>
            
            
           
            
            

       
          
          </Box>
        
      </Modal>
    </div>
  );
}

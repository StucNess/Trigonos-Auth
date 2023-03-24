import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ModalTablaCampo from './ModalTablaCampo';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import TextField from '@mui/material/TextField';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
 
  bgcolor: 'background.paper',
  
  boxShadow: 24,
  p: 4,
};

export default function ModalCampo({valueId,hide = true,
    setTable}) {
  const [open, setOpen] = React.useState(hide);
  const [idHist, setIdHist] = React.useState(9602);
  const handleClose = () => {
    setOpen(false);
    setTable();
  };
  return (
    <div>
      
      <Modal
        
        open={open}
        onClose={ () =>handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box >
            
            <Box sx={style}>
            <Box className="flex justify-end">
                    <Button
                        
                        onClick={handleClose}
                        variant="contained"
                        color="error">
                       <HighlightOffIcon/>
                    </Button>
            </Box>
            <Typography id="" variant="h6" component="h2">
                Cambios realizados el "Traer fecha por prop"
            </Typography>

            <Box className="inline-block align-middle">
            Listado de cambios asociados al <b>ID {valueId}</b>
            {/* <TextField
                className="w-[100px]"
                disabled
               
                defaultValue="9612"
                /> */}
            </Box>
           
                <ModalTablaCampo/>
                

            
            </Box>
        </Box>


        
      </Modal>
    </div>
  );
}
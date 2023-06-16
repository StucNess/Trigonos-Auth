
import {
    Box,
    Modal,
    Button,
    IconButton,
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Tooltip,
    TextField,
  } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useEffect, useRef, useState } from 'react';
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
const componentsProps = {
    tooltip: {
      sx: {
        userSelect: "none",
  
        bgcolor: "primary.main",
        "& .MuiTooltip-arrow": {
          color: "primary.main",
        },
      },
    },
  };
const label = { inputProps: { 'aria-label': 'Switch demo' } };
export default function ModalEdicionInstruccion({
    setTable,
}) {

  
  const [open, setOpen] = useState(true);
    const handleClose = () => {
        setOpen(false);
        setTable();

    };
   return (<Dialog
            open={open}
            // onClose={handleClose}
        
            scroll={'paper'}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
        >
            <DialogTitle id="scroll-dialog-title"><div className="static ">
                <Typography className="text-2xl font-medium tracking-tight text-pantoneazul leading-6 truncate mt-[5px]">
                Actualizar Instrucción <DriveFileRenameOutlineIcon/>
                </Typography>
                <IconButton className="absolute top-0 right-0" onClick={handleClose} variant="contained" color="error">
                    <HighlightOffIcon />
                </IconButton>
                </div></DialogTitle>
            <DialogContent dividers={scroll === 'paper'} className="min-w-[400px]">
            <div>
                Prueba
            </div>
            </DialogContent>
            <DialogActions className='flex justify-evenly m-[20px]'>
                    <Tooltip
                    title="Actualizar Instrucción"
                    arrow
                    placement="top"
                    componentsProps={componentsProps}
                    >
                    <IconButton
                        className=""
                        size="medium"
                        variant="contained"
                        color="success"
                        // onClick={() => {
                        // ApiPatch();
                        // }}
                    >
                        <CheckCircleOutlineIcon fontSize="large" />
                    </IconButton>
                    </Tooltip>
                    <Tooltip
                    title="Nose que poner uwu"
                    followCursor
                    componentsProps={componentsProps}
                    >
                    <IconButton
                        className=""
                        size="medium"
                        variant="contained"
                        color="info"
                    >
                        <ErrorOutlineOutlinedIcon fontSize="large" />
                    </IconButton>
                    </Tooltip>
                    <Tooltip
                    title="Regresar a instrucciones"
                    placement="top"
                    componentsProps={componentsProps}
                    >
                    <IconButton
                        className=""
                        size="medium"
                        variant="contained"
                        color="primary"
                        // onClick={props.onClose}
                    >
                        <ArrowCircleRightOutlinedIcon fontSize="large" />
                    </IconButton>
                    </Tooltip>
            </DialogActions>
        </Dialog>
        )

  

  
}

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import SearchIcon from "@mui/icons-material/Search";

export default function FiltrosParticipant(){
  return (
    <Box >
        <Box className="flex flex-col w-full mb-[20px]">
          <Typography variant="h6" className="mb-4"   color="primary">
            Búsqueda de Participante
          </Typography>
          <span>Introducir términos de búsqueda</span>
        </Box>
        <Box className="flex  w-full justify-between  mdmax:flex-wrap mdmax:justify-center">
          <TextField
            className="zerorange:w-[300px]  lg:w-[400px] w-[200px]  mdmax:m-[20px]"
            label="Ingrese nombre comercial"
            type="text"
           
            variant="filled"
          />
            <TextField
            className=" zerorange:w-[300px]  lg:w-[400px] w-[200px]  mdmax:m-[20px]"
            label="Ingrese RUT del cliente"
            type="text"
            
            variant="filled"
          />
            <TextField
              className="zerorange:w-[300px]  lg:w-[400px] w-[200px]  mdmax:m-[20px]"
              label="Seleccionar cliente"
              type="text"
              
              variant="filled"
            />
          
        </Box>
        <Box  className="flex  w-full items-center  mt-[30px]  ">
          <Button
                className="w-[150px]"
                variant="contained"
                color="secondary"
                startIcon={<SearchIcon />}
                
                
                style={{
                  m: 1,
                  width: 200,
                  margin: "0 auto",
                  display: "flex",
                  
                  
                  color: "white",
                }}
                >
                Buscar
              </Button>
          </Box>
    </Box>
  )
}

import {
    Box,
    Divider,
    Grid,
    Paper,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Button,
    Tabs,
    Typography,
  } from "@mui/material";
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { HiOutlineInformationCircle,HiOutlineUser } from  "react-icons/hi";
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import SearchIcon from "@mui/icons-material/Search";


export default function SelectClientTable(){

    const [cliente, setcliente] = React.useState('');

    const handleChange = (event) => {
        setcliente(event.target.value);
      
    };
    const handleChangeDate = (newValue) => {
        
        setValue(newValue);
    };
    const [value, setValue] = React.useState(dayjs());
    
return (
    <Box  sx={{
        display: 'flex',
        '& > :not(style)': {
        m: 1,
        width: '100%',
        height: '100%',
        minHeight: 300,
        },
            }}>
       
    
        <Paper variant="outlined">
            <div className="flex justify-center  bg-pantonerojo  text-white p-[10px] ">
            
            <HiOutlineUser  className="w-[30px] h-[30px]  mr-[10px] " /><b> <span  className="text-[16px]"> Seleccionar Cliente</span></b>

            </div>
            <div className="flex justify-center  p-[10px] text-center border-2 border-pantonerojo bg-grey-100 align-middle  smmax:space-x-[3px] sm:space-x-[10px]">
            
            <HiOutlineInformationCircle className="w-[30px] h-[30px] text-red-300" /><span>Es necesario seleccionar <b>Cliente</b>  y <b>Fecha</b> para la Descarga</span>

            </div>
            <div className="flex  w-full items-center justify-evenly mt-[10px]   ">
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
            </div>
                
            <div  className="flex  w-full items-center justify-evenly   ">
            <LocalizationProvider dateAdapter={AdapterDayjs} sx={{ m: 1, minWidth: 350 }}>
                    <Stack spacing={3}>
                        <DesktopDatePicker
                        label="Seleccione Fecha"
                        inputFormat="DD/MM/YYYY"
                        disablePast= {true}
                        value={value}
                        onChange={handleChangeDate}
                        renderInput={(params) => <TextField {...params} />}
                        />
                    </Stack>
            </LocalizationProvider>
                
            </div>
            <div  className="flex  w-full items-center justify-evenly m-[10px]  ">
            <Button
                  className="w-[150px]"
                  variant="contained"
                  color="secondary"
                  startIcon={<SearchIcon />}
                 
                  
                  style={{
                    m: 1,
                    width: 250,
                    margin: "0 auto",
                    display: "flex",
                   
                    
                    color: "white",
                  }}
                  >
                  Buscar
                </Button>
            </div>
           
                        
        


        </Paper>
    </Box>
        
);
}

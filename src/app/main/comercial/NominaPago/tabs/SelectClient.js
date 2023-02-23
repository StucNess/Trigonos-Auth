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



export default function SelectClientTable(){

    const [cliente, setcliente] = React.useState('');

    const handleChange = (event,newValue) => {
        setcliente(event.target.value);
        setValue(newValue);
    };
    const [value, setValue] = React.useState(dayjs('2023-02-23T21:11:54'));
    
return (
    <Box  sx={{
        display: 'flex',
        '& > :not(style)': {
        m: 1,
        width: '500px',
        height: '500px',
        },
            }}>
       
    
        <Paper variant="outlined">
            <div className="flex justify-center  bg-pantonerojo  text-white p-[10px] rounded-[12px]">
            
            <HiOutlineUser  className="w-[30px] h-[30px] " /><h1> Seleccionar Cliente</h1>

            </div>
            <div className="flex justify-center bg-grey-50 h-[100px] p-[10px] text-center ">
            
            <HiOutlineInformationCircle className="w-[50px] h-[50px] text-red-300" /><h2>Es necesario seleccionar <b>Cliente</b>  y <b>Fecha</b> para la Descarga</h2>

            </div>
            <div className="flex  w-full items-center justify-evenly   ">
                <FormControl sx={{ m: 1, minWidth: 350 }}>
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
                        inputFormat="MM/DD/YYYY"
                        value={value}
                        onChange={handleChange}
                        renderInput={(params) => <TextField {...params} />}
                        />
                    </Stack>
            </LocalizationProvider>
                
            </div>
                        
        


        </Paper>
    </Box>
        
);
}

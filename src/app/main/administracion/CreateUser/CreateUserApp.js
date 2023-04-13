/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable prettier/prettier */
import { Autocomplete, Stack, Alert } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import { styled, useTheme } from "@mui/material/styles";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import axios from "axios";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import * as yup from "yup";
import _ from "@lodash";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import OutlinedInput from "@mui/material/OutlinedInput";
// import jwtService from '../../auth/services/jwtService';
/* Importaciones mias */
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FusePageSimple from "@fuse/core/FusePageSimple";
import jwtServiceConfig from "../../../auth/services/jwtService/jwtServiceConfig";
import { CallApiParticipants } from "../store/CallApiParticipants";
import AdviceModule from "../../comercial/AdviceModule";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ErrorOutlinedIcon from '@mui/icons-material/ErrorOutlined';
import { CallApiUsers } from "./store/CallApiUsers";

const columns = [
  { id: "id", label: "ID", minWidth: 20 },
  { id: "username", label: "Usuario", minWidth: 20 },
  { id: "nombre", label: "Nombre", minWidth: 20 },
  { id: "apellido", label: "Apellido", minWidth: 20 },
  { id: "email", label: "Email", minWidth: 20 },
  
];
function createData(id, email, username, nombre, apellido) {
  return { id, email, username, nombre, apellido };
}
const rows = [];
const schema = yup.object().shape({
  // user: yup.string().required("Debe ingresar su nombre completo"),
  email: yup
    .string()
    .email("Debe ingresar un email correcto")
    .required("Debe completar este campo"),
  password: yup
    .string()
    .required("Por favor ingrese una contraseña")
    // .matches(/[A-Z]/, "La contraseña debe tener almenos una MAYUSCULA")
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "La contraseña debe tener almenos una mayuscula, un numero y un caracter especial"
    )
    .min(8, "Contraseña demasiado corta - mínimo 8 caracteres."),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "Las contraseñas no coinciden"),

  project: yup.string(),
});
const defaultValues = {
  user: "",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  passwordConfirm: "",
  project: "",
  rol: "",
};
// PARA EL ESTILO DEL SELECT MULTIPLE
function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightMedium
        : theme.typography.fontWeightBold,
  };
}
//
const Root = styled(FusePageSimple)(({ theme }) => ({
  "& .FusePageSimple-header": {
    backgroundColor: theme.palette.background.paper,
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: theme.palette.divider,
  },
  "& .FusePageSimple-toolbar": {},
  "& .FusePageSimple-content": {},
  "& .FusePageSimple-sidebarHeader": {},
  "& .FusePageSimple-sidebarContent": {},
}));

// eslint-disable-next-line import/prefer-default-export
// export const CreateUserApp = () => {
function CreateUserApp(props) {
  const theme = useTheme();
  const [apiResponseProyects, setApiResponseProyects] = useState([]);
  const { control, formState, handleSubmit, reset } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });
  const [personName, setPersonName] = useState([]);
  const [rolName, setRolName] = useState("");
  const [alertt, setAlertt] = useState(false);
  const [error, setError] = useState(false);
  const [emailUser, setEmailUser] = useState('');
  const { isValid, dirtyFields, errors } = formState;

  

  const [data, setData] = useState([]);
  useEffect(() => {
    (async () => {
      const data = await CallApiUsers();;
      setData(data);
      
      
    })();
   
  }, []);
  // console.log(data);
  // data.map(
  //   ({
  //     id, email, username, nombre, apellido,
  //   }) =>
      
  //     rows.push(
  //       createData(
  //         id, email, username, nombre, apellido,
  //       )
  //     )
  // );
  // console.log(rows);
 const handleSetEmail = (event) => {
  const {
    target: { value },
  } = event;
  setEmailUser(value);
}
  const handleChangeProyect = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const handleChangeRol = (event) => {
    const {
      target: { value },
    } = event;
    setRolName(value);
  };
  function timeout(delay = number) {
    return new Promise((res) => setTimeout(res, delay));
  }
  useEffect(() => {
    if (alertt === true) {
      setTimeout(() => {
        setAlertt(false);
      }, 5000);
    }
    if (error === true) {
      setTimeout(() => {
        setError(false);
      }, 5000);
    }
    const fetchData = async () => {
      let prueba;
      // eslint-disable-next-line prefer-const
      prueba = await CallApiParticipants();
      return prueba;
    };
    fetchData().then((value) => {
      setApiResponseProyects(value);
    });
  }, [alertt, error]);
  function onSubmit(e) {
    const data = {
      email: e.email,
      username: e.email,
      nombre: e.firstName,
      apellido: e.lastName,
      password: e.password,
      rol: rolName,
    };
    let timer = 0;
    axios
      .post(jwtServiceConfig.signUp, data)
      .then((response) => {
        const idUser = response.data.id;
        for (let x = 0; x < personName.length; x++) {
          timer = timer + 1000;
          const dataProyect = {
            idProyect: personName[x],
            idUser: idUser,
          };
          setTimeout(() => {
            axios
              .post(jwtServiceConfig.addProyects, dataProyect)
              .then((response) => {
                // console.log(
                //   `Se agrego el proyecto ${personName[x]} al usuario creado`
                // );
              })
              .catch((error) => {
                console.log(`Error al agregar el proyecto ${personName[x]}`);
                return;
              });
          }, timer);
        }
        setAlertt(true);
      })
      .catch((error) => {
        // console.log("entro");
        setError(true);
      });
  }
  return (
    <Root
      // header={<div>
      //     Header
      // </div>}
      content={
        <div className="p-12 pt-16 sm:pt-24 lg:pt-24 md:pt-24 lg:ltr:pr-0 lg:rtl:pl-0 w-full ">
        <div
        className="grid auto-cols-auto smmax:grid-cols-2 sm:grid-cols-12 gap-2 w-full min-w-0 p-24   ">
        <div className="  col-span-12 mb-[20px]" >
           {/* Box de titulo y guía */}
          <Box className="  bg-white rounded-sm p-[10px] ">
            <h1 className="ml-[5px]">Agregar Usuarios</h1>
            <h1 className="border border-b-pantoneazul"></h1>
            <Box   className="flex flex-auto bg-white rounded-sm bg-grey-300 m-[10px] p-[10px]"  >
              <div>
                <ErrorOutlinedIcon className="text-pantonerojo mr-[20px]" />
              </div>
              <div>
                <span className="text-grey-700">Debe ingresar los datos del <b>Usuario</b> en la sección izquierda luego presionar <b>Crear Usuario</b> debe aceptar o rechazar y posteriormente se actualizará la lista de la izquierda</span>
              </div>
              
            </Box>
          </Box>
        </div>
        
        <div className=" lgmax:col-span-12  lg:col-span-6 lg:mr-[20px]">
          
          <div  className="lg:h-[730px]">
           
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                   {columns.map((column) => (
                     <TableCell
                       key={column.id}
                       align={column.align}
                       style={{ minWidth: column.minWidth }}
                     >
                       {column.label}
                     </TableCell>
                   ))}
                  </TableRow>
              </TableHead>
                <TableBody>
                {data
                 
                 .map((row) => {
                   return (
                     
                     <TableRow hover role="checkbox" tabIndex={-1} key={row.email}>
                       {columns.map((column) => {
                         const value = row[column.id];
                         const valuee = row;
                         return (
                           <TableCell
                             key={column.id}
                             align={column.align}>
                             {column.format && typeof value === "number"
                               ? column.format(value)
                               : value}
                           </TableCell>
                         );
                       })}
                     </TableRow>
                   );
                 })}
               </TableBody>
             </Table>
           </TableContainer>
           </div>
        </div>
        
        <div  className=" lgmax:col-span-12  lg:col-span-6 lgmax:mt-[20px] lg:ml-[20px] "> 
         
          <form
               name="registerForm"
               noValidate
               className="bg-white"
               onSubmit={handleSubmit(onSubmit)}>
             <Box className="flex flex-col">
             <div className="flex flex-row items-center">
             <div className="w-[200px] h-[150px] ">
                <img className="" src="assets/images/logo/logoTRGNS.png" />
             </div>
             <div className="">
               <Typography className=" text-4xl font-extrabold tracking-tight leading-tight">
                 Agregar Usuario Hmorales
               </Typography>
             </div>
               
             </div>
             
             <Box className="flex flex-row ssmmax:flex-col ssmmax:justify-center  w-full ">
               <div className="w-1/2 ssmmax:w-2/2  bg-grey-50 ml-[50px] mr-[50px] lg:mr-[25px]">
                       <div >
                           <AdviceModule textwidth={350}  msg={"El usuario por defecto es el email ingresado en el campo \"Email\"."} />
                           <Controller
                             name="user"
                             control={control}
                             render={({ field }) => (
                               <TextField
                               {...field}
                                 className="mb-24  w-full"
                                 label="Usuario"
                                 type="user"
                                 variant="outlined"
                                 fullWidth
                                 disabled
                                 value={emailUser}
                                 
                               />
                             )}
                           />
                           
                           </div>
                           
                           <Controller
                             name="firstName"
                             control={control}
                             render={({ field }) => (
                               <TextField
                                 {...field}
                                 className="mb-24"
                                 label="Nombre"
                                 autoFocus
                                 type="name"
                                 error={!!errors.firstName}
                                 helperText={errors?.firstName?.message}
                                 variant="outlined"
                                 required
                                 fullWidth
                               />
                             )}
                           />
                           <Controller
                             name="lastName"
                             control={control}
                             render={({ field }) => (
                               <TextField
                                 {...field}
                                 className="mb-24"
                                 label="Apellido"
                                 autoFocus
                                 type="apellido"
                                 error={!!errors.lastName}
                                 helperText={errors?.lastName?.message}
                                 variant="outlined"
                                 required
                                 fullWidth
                               />
                             )}
                           />
                         
   
                       
                           <Controller
                             name="email"
                             control={control}
                             
                             render={({ field }) => (
                               <TextField
                                 {...field}
                                 className="mb-24"
                                 label="Email"
                                 type="email"
                                 error={!!errors.email}
                                 helperText={errors?.email?.message}
                                 variant="outlined"
                                 required
                                 fullWidth
                                 onChange={e => {
                                   field.onChange(e);
                                   handleSetEmail(e);
                                 }}
                               />
                             )}
                           />
               </div>
               <div className="w-1/2 ssmmax:w-2/2 bg-grey-50 ml-[50px] lg:ml-[25px] mr-[50px]">
               <AdviceModule textwidth={350} msg={"La contraseña debe contener:\n-Debe tener al menos 8 carácteres.\n-Debe tener al menos una mayúscula.\n-Debe tener al menos un número.\n-Debe tener al menos un carácter especial."}  />
                   <Controller
                     name="password"
                     control={control}
                     render={({ field }) => (
                       <TextField
                         {...field}
                         className="mb-24"
                         label="Contraseña"
                         type="text"
                         error={!!errors.password}
                         helperText={errors?.password?.message}
                         variant="outlined"
                         required
                         fullWidth
                       />
                     )}
                   />
   
                   <Controller
                     name="passwordConfirm"
                     control={control}
                     render={({ field }) => (
                       <TextField
                         {...field}
                         className="mb-24"
                         label="Contraseña (Confirmar)"
                         type="text"
                         error={!!errors.passwordConfirm}
                         helperText={errors?.passwordConfirm?.message}
                         variant="outlined"
                         required
                         fullWidth
                       />
                     )}
                   />
                     <div className="w-full" >
                     <AdviceModule textwidth={400}msg={"Para asignar los clientes al usuario debe desplegar la lista y podrá seleccionar uno por uno los clientes que requiera asignar."} />
                     <Controller
                       
                       name="project"
                       control={control}
                       render={({ field }) => (
                         <FormControl
                           
                           className="mb-24 w-full"
                           label="project"
                           error={!!errors.project}
                           type="select"
                           required>
                           <InputLabel id="demo-simple-select-standard-label">
                             Seleccione clientes
                           </InputLabel>
                           <Select
                             labelId="demo-multiple-name-label"
                             id="demo-multiple-name"
                             multiple
                             value={personName}
                             onChange={handleChangeProyect}
                             input={<OutlinedInput label="Name" />}
                             // MenuProps={MenuProps}
                           >
                             {apiResponseProyects.data != undefined ? (
                               apiResponseProyects.data.map((e) => (
                                 <MenuItem
                                   key={e.id}
                                   value={e.id}
                                   style={getStyles(
                                     e.commercial_Business,
                                     personName,
                                     theme
                                   )}>
                                   {e.business_Name}
                                 </MenuItem>
                               ))
                             ) : (
                               <MenuItem id="1" value="1">
                                 Proyecto 1
                               </MenuItem>
                             )}
                           </Select>
                         </FormControl>
                       )}
                     />
                     </div>
                     
                 
                   
                   
                   <Controller
                     name="rol "
                     control={control}
                     render={({ field }) => (
                       <FormControl
                         className="mb-24 w-full"
                         label="Rol"
                         type="select"
                         required>
                         <InputLabel id="demo-simple-select-standard-label">
                           Seleccione rol
                         </InputLabel>
                         <Select
                           value={rolName}
                           onChange={handleChangeRol}
                           input={<OutlinedInput label="Name" />}
                           // MenuProps={MenuProps}
                         >
                           <MenuItem id="1" value="admin">
                             ADMIN
                           </MenuItem>
                           <MenuItem id="2" value="trgns">
                             TRGNS
                           </MenuItem>
                           <MenuItem id="3" value="cliente">
                             CLIENTE
                           </MenuItem>
                         </Select>
                       </FormControl>
                     )}
                   />
               </div>
             </Box>
             <Box className="flex justify-center">
                 <Button
                       variant="contained"
                       color="secondary"
                       className=" w-[200px] "
                       aria-label="Register"
                       // disabled={_.isEmpty(dirtyFields) || !isValid}
                       type="submit"
                       size="large">
                       Crear usuario
                     </Button>
                     {alertt && (
                       <Stack className="mt-[10px]" sx={{ width: "100%" }} spacing={2}>
                         <Alert severity="success">
                           Usuario registrado correctamente!!
                         </Alert>
                       </Stack>
                     )}
                     {error && (
                       <Stack className="mt-[10px]" sx={{ width: "100%" }} spacing={2}>
                         <Alert severity="warning">
                           Error!! El usuario no se ha registrado
                         </Alert>
                       </Stack>
                     )}
             </Box>
          
             </Box>
            
             
           </form>
        </div>
       
      </div>
          
        </div>   




      }
      scroll="content"
    />
  );
 
}

export default CreateUserApp;

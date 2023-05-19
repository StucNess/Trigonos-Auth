import Box from "@mui/material/Box";

import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";

import WarningIcon from "@mui/icons-material/Warning";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import FormControlLabel from "@mui/material/FormControlLabel";

import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";

import PersonAddIcon from "@mui/icons-material/PersonAdd";
import InputAdornment from "@mui/material/InputAdornment";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import EditIcon from "@mui/icons-material/Edit";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import { FormHelperText } from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { useEffect } from "react";
import { CallApiEmpresas } from "../../CreateUser/store/CallApiEmpresas";
import { CallApiRole } from "../../CreateUser/store/CallApiRole";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import SelectClients from "./SelectClients";
import { CallApiParticipants } from "../../store/CallApiParticipants";
import { styled, useTheme } from "@mui/material/styles";
import TransferSelectParticipants from "./TransferSelectParticipants";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import CommentIcon from "@mui/icons-material/Comment";
import { white } from "tailwindcss/colors";
import jwtServiceConfig from "src/app/auth/services/jwtService/jwtServiceConfig";
import axios from "axios";
// PARA EL ESTILO DEL SELECT MULTIPLE
function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightMedium
        : theme.typography.fontWeightBold,
  };
}
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,

  borderRadius: 2,
};
let roles;
const label = { inputProps: { "aria-label": "Switch demo" } };
let dataproject_ = {};

export default function ModalEditUser({
  apiResponseProyects,
  dataUser,
  setTable,
}) {
  const { userData, participantData, participantFullData } = dataUser;

  const [formState, setFormState] = useState({
    id: userData.id,
    usuario: userData.usuario,
    rol: userData.rol,
    nombre: userData.nombre,
    apellido: userData.apellido,
    email: userData.email,
    codempresa: userData.codempresa,
    empresa: userData.empresa,
    pais: userData.pais,
    estado: userData.estado,
    participants: participantData,
  });
  const [dataConfirm, setDataConfirm] = useState({
    id: userData.id,
    usuario: userData.usuario,
    rol: userData.rol,
    nombre: userData.nombre,
    apellido: userData.apellido,
    email: userData.email,
    codempresa: userData.codempresa,
    empresa: userData.empresa,
    pais: userData.pais,
    estado: userData.estado,
    participants: participantData,
  });
  const [update, setUpdate] = useState({
    estado: false,
    nombre: false,
    apellido: false,
    email: false,
    pais: false,
    usuario: false,
    rol: false,
    empresa: false,
    participants: false,
  });

  const theme = useTheme();
  // const [apiResponseProyects, setApiResponseProyects] = useState([]);
  const [secondDopen, setSecondDopen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [MsgAlert, setMsgAlert] = useState({
    msgResp: false,
    msgText: "",
    msgError: false,
  });
  const { msgResp, msgText, msgError } = MsgAlert;
  const [personName, setPersonName] = useState([]);

  const [countActive, setCountActive] = useState(0);
  const [activeButton, setActiveButton] = useState(false);
  const [checkedExt, setCheckedExt] = useState(false);
  const [checkedBlue, setCheckedBlue] = useState(false);
  const [emailUser, setEmailUser] = useState(dataUser.email);
  const [dataEmpresas, setDataEmpresas] = useState([]);
  const [dataRole, setDataRole] = useState([]);
  const [scroll, setScroll] = useState("paper");
  // usstate para los clientes disponibles y los asignados
  const [clientDisp, setClientDisp] = useState(participantFullData);
  const [clientAsig, setClientAsig] = useState(participantData);

  const {
    estado,
    nombre,
    apellido,
    email,
    pais,
    rol,
    empresa,
    usuario,
    participants,
  } = update;

  const [checked, setChecked] = useState([]);
  const [checkeddos, setCheckeddos] = useState([]);
  const handleCloseSecond = () => {
    setSecondDopen(false);
  };

  const ApiPatch = () => {
    setSecondDopen(true);

    setLoading(true);
    let isEqual = JSON.stringify(dataConfirm) === JSON.stringify(formState);
    if (isEqual) {
      // console.log("No se realiza envio a API");
      setLoading(false);

      setMsgAlert({
        msgResp: true,
        msgText: "Error, no ha realizado ningun cambio!!",
        msgError: true,
      });
      setTimeout(() => {
        handleCloseSecond();
      }, 1200);
    } else {
      // console.log(formState.id);
      const dataUser = {
        email: formState.email,
        username: formState.email,
        nombre: formState.nombre,
        apellido: formState.apellido,
        idEmpresa: formState.codempresa,
        pais: formState.pais,
        password: "Trgns23&",
        rol: formState.rol,
      };
      axios
        .post(
          `https://trigonosapi.azurewebsites.net/api/Usuarios/actualizar/${formState.id}`,
          dataUser
        )
        .then((response) => {
          setLoading(false);
          setMsgAlert({
            msgResp: true,
            msgText: "Usuario modificado correctamente.",
            msgError: false,
          });
          setTimeout(() => {
            handleCloseSecond();
            handleClose();
          }, 2000);
        })
        .catch((error) => {
          setLoading(false);
          setMsgAlert({
            msgResp: true,
            msgText: "Error, no ha se ha modificado el usuario",
            msgError: true,
          });
          setTimeout(() => {
            handleCloseSecond();
          }, 2500);
        });
    }
  };

  const handleToggleAll = (items) => () => {
    setCheckeddos([]);
    if (checked.length != clientDisp.length) {
      setChecked(clientDisp);
    } else {
      setChecked([]);
    }
  };
  const handleToggleAlldos = (items) => () => {
    setChecked([]);
    if (checkeddos.length != clientAsig.length) {
      setCheckeddos(clientAsig);
    } else {
      setCheckeddos([]);
    }
  };
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  const handleToggledos = (value) => () => {
    const currentIndex = checkeddos.indexOf(value);
    const newChecked = [...checkeddos];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setCheckeddos(newChecked);
  };
  const handleCheckedRight = () => {
    //pasar lo que este en el array al otro
    const newChecked = [...checked];
    let ids = newChecked.map(function (el) {
      return el.id;
    });
    let newArray = clientDisp.filter((item) => !ids.includes(item.id));
    // console.log(newArray);
    setClientDisp(newArray);
    setClientAsig(clientAsig.concat(newChecked));
    setChecked([]);
  };
  const handleCheckedLeft = () => {
    //pasar lo que este en el array al otro
    const newChecked = [...checkeddos];
    let ids = newChecked.map(function (el) {
      return el.id;
    });
    let newArray = clientAsig.filter((item) => !ids.includes(item.id));
    // console.log(newArray);
    setClientAsig(newArray);
    setClientDisp(clientDisp.concat(newChecked));
    setCheckeddos([]);
  };
  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };
  const [open, setOpen] = useState(true);
  const handleChangee = (event) => {
    setFormState({
      ...formState,
      rol: event.target.value,
    });
    // setBankk(event.target.value);
  };
  const handleChangeempresa = (event) => {
    setFormState({
      ...formState,
      codempresa: event.target.value,
    });

    // setBankk(event.target.value);
  };
  const handleClose = () => {
    setOpen(false);
    setTable();
  };
  useEffect(() => {
    (async () => {
      const data_ = await CallApiEmpresas();
      setDataEmpresas(data_);
    })();
    (async () => {
      const data_ = await CallApiRole();
      setDataRole(data_);
    })();
  }, []);

  //mesirve
  useEffect(() => {
    // console.log(checked);
  }, [checked]);

  useEffect(() => {
    if (apiResponseProyects != undefined) {
      let res = apiResponseProyects
        .filter((item) => personName.includes(item.id))
        .map(function (el) {
          return {
            id: el.id,
            name: el.name,
          };
        });
      dataproject_ = res;
    }
  }, [personName]);

  useEffect(() => {
    countActive === 0 ? setActiveButton(false) : setActiveButton(true);
  }, [countActive]);

  const handleSetEmail = (event) => {
    const {
      target: { value },
    } = event;
    setEmailUser(value);
  };
  return (
    <>
      <Dialog
        open={open}
        // onClose={handleClose}
        fullWidth={true}
        scroll={"paper"}
        maxWidth={"lg"}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
          <div className="static ">
            <Typography className="text-2xl font-medium tracking-tight text-pantoneazul leading-6 truncate mt-[5px]">
              Edición de Usuario <BorderColorIcon />
            </Typography>

            <IconButton
              className="absolute top-0 right-0"
              onClick={handleClose}
              variant="contained"
              color="error"
            >
              <HighlightOffIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <div className="flex flex-col w-full">
            <div className="flex justify-between sdmmax:flex-col  w-full ">
              <div className="w-full mx-[20px] sdmmax:m-0">
                <div className="h-[20px]">
                  {nombre ? (
                    <>
                      <span className="text-red-500">
                        Recuerde aceptar o cancelar el cambio realizado
                      </span>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                <TextField
                  className=" w-full "
                  label="Nombre"
                  type="text"
                  defaultValue="Vacio"
                  onChange={onInputChange}
                  name="nombre"
                  disabled={nombre ? false : true}
                  value={formState.nombre}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {nombre ? (
                          <>
                            <CheckBoxIcon
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                setUpdate({
                                  ...update,
                                  nombre: false,
                                });
                                setCountActive(
                                  countActive > 0
                                    ? countActive - 1
                                    : countActive
                                );
                              }}
                            />
                            <DisabledByDefaultIcon
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                setFormState({
                                  ...formState,
                                  nombre: userData.nombre,
                                });
                                setUpdate({
                                  ...update,
                                  nombre: false,
                                });
                                setCountActive(
                                  countActive > 0
                                    ? countActive - 1
                                    : countActive
                                );
                              }}
                            />
                          </>
                        ) : (
                          <EditIcon
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              setUpdate({
                                ...update,
                                nombre: true,
                              });
                              setCountActive(countActive + 1);
                            }}
                          />
                        )}
                      </InputAdornment>
                    ),
                  }}
                  variant="filled"
                />
                <div className="h-[20px]">
                  {apellido ? (
                    <>
                      <span className=" text-red-500">
                        Recuerde aceptar o cancelar el cambio realizado
                      </span>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                <TextField
                  className=" w-full"
                  label="Apellido"
                  type="text"
                  defaultValue="Vacio"
                  onChange={onInputChange}
                  name="apellido"
                  disabled={apellido ? false : true}
                  value={formState.apellido}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {apellido ? (
                          <>
                            <CheckBoxIcon
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                setUpdate({
                                  ...update,
                                  apellido: false,
                                });
                                setCountActive(
                                  countActive > 0
                                    ? countActive - 1
                                    : countActive
                                );
                              }}
                            />
                            <DisabledByDefaultIcon
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                setFormState({
                                  ...formState,
                                  apellido: userData.apellido,
                                });
                                setUpdate({
                                  ...update,
                                  apellido: false,
                                });
                                setCountActive(
                                  countActive > 0
                                    ? countActive - 1
                                    : countActive
                                );
                              }}
                            />
                          </>
                        ) : (
                          <EditIcon
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              setUpdate({
                                ...update,
                                apellido: true,
                              });
                              setCountActive(countActive + 1);
                            }}
                          />
                        )}
                      </InputAdornment>
                    ),
                  }}
                  variant="filled"
                />
                <div className="h-[20px]">
                  {rol ? (
                    <>
                      <span className=" text-red-500">
                        Recuerde aceptar o cancelar el cambio realizado
                      </span>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                <TextField
                  // disabled={banksName1 ? false : true}
                  className="w-full "
                  id="standard-select-currency"
                  select
                  label="Rol"
                  value={formState.rol}
                  onChange={handleChangee}
                  variant="filled"
                  name="rol"
                  disabled={rol ? false : true}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {rol ? (
                          <>
                            <CheckBoxIcon
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                setUpdate({
                                  ...update,
                                  rol: false,
                                });

                                setCountActive(
                                  countActive > 0
                                    ? countActive - 1
                                    : countActive
                                );
                              }}
                            />
                            <DisabledByDefaultIcon
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                setFormState({
                                  ...formState,
                                  rol: userData.rol,
                                });

                                setUpdate({
                                  ...update,
                                  rol: false,
                                });
                                setCountActive(
                                  countActive > 0
                                    ? countActive - 1
                                    : countActive
                                );
                              }}
                            />
                          </>
                        ) : (
                          <EditIcon
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              setUpdate({
                                ...update,
                                rol: true,
                              });
                              setCountActive(countActive + 1);
                            }}
                          />
                        )}
                      </InputAdornment>
                    ),
                  }}
                >
                  {dataRole.map((data) => (
                    <MenuItem key={data.id} value={data.name}>
                      {data.name}
                    </MenuItem>
                  ))}
                </TextField>
                <div className="h-[20px]">
                  {pais ? (
                    <>
                      <span className=" text-red-500">
                        Recuerde aceptar o cancelar el cambio realizado
                      </span>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                <TextField
                  // disabled={banksName1 ? false : true}
                  className="w-full "
                  id="standard-select-currency"
                  select
                  label="País"
                  value={formState.pais}
                  onChange={handleChangee}
                  variant="filled"
                  name="pais"
                  disabled={pais ? false : true}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {pais ? (
                          <>
                            <CheckBoxIcon
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                setUpdate({
                                  ...update,
                                  pais: false,
                                });

                                setCountActive(
                                  countActive > 0
                                    ? countActive - 1
                                    : countActive
                                );
                              }}
                            />
                            <DisabledByDefaultIcon
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                setFormState({
                                  ...formState,
                                  pais: userData.pais,
                                });

                                setUpdate({
                                  ...update,
                                  pais: false,
                                });
                                setCountActive(
                                  countActive > 0
                                    ? countActive - 1
                                    : countActive
                                );
                              }}
                            />
                          </>
                        ) : (
                          <EditIcon
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              setUpdate({
                                ...update,
                                pais: true,
                              });
                              setCountActive(countActive + 1);
                            }}
                          />
                        )}
                      </InputAdornment>
                    ),
                  }}
                >
                  <MenuItem id={1} value={"Chile"}>
                    Chile
                  </MenuItem>
                </TextField>
              </div>
              <div className="w-full mx-[20px] sdmmax:m-0">
                <div className="h-[20px]">
                  {email ? (
                    <>
                      <span className="text-red-500">
                        Recuerde aceptar o cancelar el cambio realizado
                      </span>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                <TextField
                  className="w-full "
                  label="Email"
                  type="email"
                  defaultValue="Vacio"
                  onChange={(e) => {
                    onInputChange(e);
                    handleSetEmail(e);
                  }}
                  name="email"
                  disabled={email ? false : true}
                  value={formState.email}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {email ? (
                          <>
                            <CheckBoxIcon
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                setUpdate({
                                  ...update,
                                  email: false,
                                });
                                setCountActive(
                                  countActive > 0
                                    ? countActive - 1
                                    : countActive
                                );
                              }}
                            />
                            <DisabledByDefaultIcon
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                setFormState({
                                  ...formState,
                                  email: userData.email,
                                });
                                setUpdate({
                                  ...update,
                                  email: false,
                                });
                                setEmailUser(userData.email);
                                setCountActive(
                                  countActive > 0
                                    ? countActive - 1
                                    : countActive
                                );
                              }}
                            />
                          </>
                        ) : (
                          <EditIcon
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              setUpdate({
                                ...update,
                                email: true,
                              });
                              setCountActive(countActive + 1);
                            }}
                          />
                        )}
                      </InputAdornment>
                    ),
                  }}
                  variant="filled"
                />
                <div className="h-[20px]">
                  {usuario ? (
                    <>
                      <span className="text-red-500">
                        Recuerde aceptar o cancelar el cambio realizado
                      </span>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                <TextField
                  className=" w-full "
                  label="Usuario"
                  type="text"
                  defaultValue={formState.email}
                  // onChange={onInputChange}
                  name="usuario"
                  value={emailUser}
                  disabled
                  variant="filled"
                />
                <div className="h-[20px]">
                  {empresa ? (
                    <>
                      <span className="text-red-500">
                        Recuerde aceptar o cancelar el cambio realizado
                      </span>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                <TextField
                  // disabled={banksName1 ? false : true}
                  className="w-full "
                  id="standard-select-currency"
                  select
                  label="Empresa"
                  value={formState.codempresa}
                  onChange={handleChangeempresa}
                  variant="filled"
                  name="empresa"
                  disabled={empresa ? false : true}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {empresa ? (
                          <>
                            <CheckBoxIcon
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                setUpdate({
                                  ...update,
                                  empresa: false,
                                });

                                setCountActive(
                                  countActive > 0
                                    ? countActive - 1
                                    : countActive
                                );
                              }}
                            />
                            <DisabledByDefaultIcon
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                setFormState({
                                  ...formState,
                                  codempresa: userData.codempresa,
                                });

                                setUpdate({
                                  ...update,
                                  empresa: false,
                                });
                                setCountActive(
                                  countActive > 0
                                    ? countActive - 1
                                    : countActive
                                );
                              }}
                            />
                          </>
                        ) : (
                          <EditIcon
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              setUpdate({
                                ...update,
                                empresa: true,
                                // });
                                // setFormState({
                                //   ...formState,
                                //   bank: idBank,
                                //   banksName: bankk,
                                // });
                              });
                              setCountActive(countActive + 1);
                            }}
                          />
                        )}
                      </InputAdornment>
                    ),
                  }}
                >
                  {dataEmpresas.map((data) => (
                    <MenuItem key={data.id} value={data.id}>
                      {data.nombreEmpresa}
                    </MenuItem>
                  ))}
                </TextField>

                {/* <TableContainer component={Paper} className="max-h-[300px]">
                <Table  stickyHeader aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Id</TableCell>
                      <TableCell align="left">Nombre</TableCell>
                      
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {apiResponseProyects.map((row) => (
                      <TableRow
                        key={row.id}
                        sx={{  '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row" sx={{backgroundColor: 'pantoneazul'}}>
                          {row.id}
                        </TableCell>
                        <TableCell align="left">{row.business_Name}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
        </TableContainer>
        <TableContainer component={Paper} className="max-h-[300px]">
                <Table  stickyHeader aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Id</TableCell>
                      <TableCell align="left">Nombre</TableCell>
                      
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {participantData.map((row) => (
                      <TableRow
                        key={row.id}
                        sx={{  '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row" sx={{backgroundColor: 'pantoneazul'}}>
                          {row.id}
                        </TableCell>
                        <TableCell align="left">{row.name}</TableCell>
                        
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
        </TableContainer> */}

                {/* El estado lo dejo para el final que se ve medio enredado */}
                {/* <Box className="flex flex-col zerorange:w-[300px]  lg:w-[400px] w-[350px]   m-[20px]">
                  <Box className="flex flex-row">
                    <Typography
                      variant="subtitle1"
                      color="primary"
                      className="mb-[40px]"
                    >
                      Estado
                    </Typography>
                    <InputAdornment className="m-[10px]">
                      {estado ? (
                        <>
                          <CheckBoxIcon
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              setUpdate({
                                ...update,
                                estado: false,
                              });
                              // setCountActive(
                              //   countActive > 0
                              //     ? countActive - 1
                              //     : countActive
                              // );
                            }}
                          />
                          <DisabledByDefaultIcon
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              setUpdate({
                                ...update,
                                estado: false,
                              });
                              // setCountActive(
                              //   countActive > 0
                              //     ? countActive - 1
                              //     : countActive
                              // );
                            }}
                          />
                        </>
                      ) : (
                        <EditIcon
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            setUpdate({
                              ...update,
                              estado: true,
                            });
                            // setCountActive(countActive + 1);
                          }}
                        />
                      )}
                    </InputAdornment>
                  </Box>

                  <Box>
                    <Box>
                      <InputAdornment
                        disablePointerEvents={!estado}
                      >
                        <Box>
                          <Box>
                            <FormControlLabel
                              label="Activo"
                              control={
                                <Checkbox
                                  checked={checkedBlue}
                                  onChange={(event) => {
                                    setCheckedBlue(
                                      event.target.checked
                                    );
                                    setCheckedExt(false);
                                  }}
                                />
                              }
                            />
                          </Box>
                          <Box>
                            <FormControlLabel
                              label="Desactivado"
                              control={
                                <Checkbox
                                  checked={checkedExt}
                                  onChange={(event) => {
                                    setCheckedExt(event.target.checked);
                                    setCheckedBlue(false);
                                  }}
                                />
                              }
                            />
                          </Box>
                        </Box>
                      </InputAdornment>
                    </Box>
                  </Box>
                </Box> */}
              </div>
            </div>
            <Box className="flex flex-col zerorange:w-[300px]  lg:w-[400px] w-[350px]   m-[20px]">
              <Box className="flex flex-row">
                <Typography
                  variant="subtitle1"
                  color="primary"
                  className="mb-[40px]"
                >
                  Estado
                </Typography>
                <InputAdornment className="m-[10px]">
                  {participants ? (
                    <>
                      <CheckBoxIcon
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setUpdate({
                            ...update,
                            participants: false,
                          });
                          setCountActive(
                            countActive > 0 ? countActive - 1 : countActive
                          );
                        }}
                      />
                      <DisabledByDefaultIcon
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setUpdate({
                            ...update,
                            participants: false,
                          });
                          setCountActive(
                            countActive > 0 ? countActive - 1 : countActive
                          );
                        }}
                      />
                    </>
                  ) : (
                    <EditIcon
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setUpdate({
                          ...update,
                          participants: true,
                        });
                        setCountActive(countActive + 1);
                      }}
                    />
                  )}
                </InputAdornment>
              </Box>

              <Box>
                <Box>
                  <InputAdornment
                    disablePointerEvents={!participants}
                  ></InputAdornment>
                </Box>
              </Box>
            </Box>
            <div className="flex justify-center">
              <div className="h-[300px]">
                <Card>
                  <CardHeader
                    avatar={
                      <Checkbox
                        onClick={handleToggleAll(clientDisp)}
                        checked={
                          checked.length === clientDisp.length &&
                          checked.length !== 0
                        }
                        // onChange={(event) => {
                        //   setCheckedBlue(
                        //     event.target.checked
                        //   );
                        // }}

                        indeterminate={
                          checked.length !== clientDisp.length &&
                          checked.length !== 0
                        }
                        disabled={!checked.length === 0}
                        inputProps={{
                          "aria-label": "all items selected",
                        }}
                      />
                    }
                    title={"Clientes Disponibles"}
                    // subheader={`${numberOfChecked(items)}/${items.length} selected`}
                  />
                  <Divider />
                  <List
                    sx={{
                      height: "300px",
                      width: "100%",
                      maxWidth: 300,
                      bgcolor: "background.paper",
                      overflow: "auto",
                    }}
                  >
                    {clientDisp.map((value) => {
                      const labelId = `checkbox-list-label-${value.id}`;

                      return (
                        <ListItem
                          key={value.id}
                          secondaryAction={
                            <IconButton edge="end" aria-label="comments">
                              <CommentIcon />
                            </IconButton>
                          }
                          disablePadding
                        >
                          <ListItemButton
                            role={undefined}
                            onClick={handleToggle(value)}
                            dense
                          >
                            <ListItemIcon>
                              <Checkbox
                                edge="start"
                                checked={checked.indexOf(value) !== -1}
                                tabIndex={-1}
                                disableRipple
                                // inputProps={{ 'aria-labelledby': labelId }}
                              />
                            </ListItemIcon>
                            <ListItemText id={value.id} primary={value.name} />
                          </ListItemButton>
                        </ListItem>
                      );
                    })}
                  </List>
                </Card>
              </div>
              <div className="flex flex-col justify-center items-center">
                <IconButton
                  sx={{ "&:hover": { color: "#e4493f" } }}
                  key="close"
                  aria-label="Close"
                  color="primary"
                  onClick={handleCheckedRight}
                  disabled={checked.length === 0}
                  size="small"
                >
                  <NavigateNextIcon fontSize="large" />
                </IconButton>
                <IconButton
                  sx={{ "&:hover": { color: "#e4493f" } }}
                  key="close"
                  aria-label="Close"
                  color="primary"
                  onClick={handleCheckedLeft}
                  disabled={checkeddos.length === 0}
                  size="small"
                >
                  <NavigateBeforeIcon fontSize="large" />
                </IconButton>
              </div>
              <div className="max-h-[300px]">
                <Card>
                  <CardHeader
                    avatar={
                      <Checkbox
                        onClick={handleToggleAlldos(clientAsig)}
                        checked={
                          checkeddos.length === clientAsig.length &&
                          checkeddos.length !== 0
                        }
                        // onChange={(event) => {
                        //   setCheckedBlue(
                        //     event.target.checked
                        //   );
                        // }}

                        indeterminate={
                          checkeddos.length !== clientAsig.length &&
                          checkeddos.length !== 0
                        }
                        disabled={!checkeddos.length === 0}
                        inputProps={{
                          "aria-label": "all items selected",
                        }}
                      />
                    }
                    title={"Clientes Asignados"}
                    // subheader={`${numberOfChecked(items)}/${items.length} selected`}
                  />
                  <Divider />
                  <List
                    sx={{
                      height: "300px",
                      width: "100%",
                      maxWidth: 300,
                      bgcolor: "background.paper",
                      overflow: "auto",
                    }}
                  >
                    {clientAsig.map((value) => {
                      const labelId = `checkbox-list-label-${value.id}`;

                      return (
                        <ListItem
                          key={value.id}
                          secondaryAction={
                            <IconButton edge="end" aria-label="comments">
                              <CommentIcon />
                            </IconButton>
                          }
                          disablePadding
                        >
                          <ListItemButton
                            role={undefined}
                            onClick={handleToggledos(value)}
                            dense
                          >
                            <ListItemIcon>
                              <Checkbox
                                edge="start"
                                checked={checkeddos.indexOf(value) !== -1}
                                tabIndex={-1}
                                disableRipple
                                inputProps={{ "aria-labelledby": labelId }}
                              />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={value.name} />
                          </ListItemButton>
                        </ListItem>
                      );
                    })}
                  </List>
                </Card>
              </div>
              {/* <SelectClients participants={participantData}/> */}
              {/* {participantData} */}
              {/* <TransferSelectParticipants participants={participantData}/> */}
            </div>
          </div>
        </DialogContent>
        <DialogActions className="flex justify-center m-[20px]">
          <Button
            variant="contained"
            color="secondary"
            className=" h-[28px]  w-[100px] mr-[20px]"
            onClick={handleClose}
            size="small"
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className=" h-[28px]  w-[100px] mr-[20px]"
            disabled={activeButton}
            onClick={ApiPatch}
            size="small"
          >
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={secondDopen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        scroll={"paper"}
      >
        {loading ? (
          <div className="flex justify-center items-center h-[250px] w-[300px]">
            <CircularProgress color="secondary" />
          </div>
        ) : (
          <div>
            {msgResp && (
              <div className="flex justify-center items-center h-[250px] w-[300px]">
                {msgError ? (
                  <div className="flex justify-center items-center h-[250px] w-[300px]">
                    <WarningIcon className="w-[68px] h-[68px] text-red" />
                    <span className="absolute bottom-[70px] text-red">
                      {" "}
                      <b>{msgText}</b>
                    </span>
                  </div>
                ) : (
                  <div className="flex justify-center items-center h-[250px] w-[300px]">
                    <CheckCircleIcon className="w-[68px] h-[68px] text-green" />
                    <span className="absolute bottom-[70px] text-green">
                      {" "}
                      <b>{msgText}</b>
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </Dialog>
    </>
  );
}

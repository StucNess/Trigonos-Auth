
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
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import InputAdornment from "@mui/material/InputAdornment";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import EditIcon from "@mui/icons-material/Edit";
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
export default function ModalEditUser({
    setTable,
})
 {
  const [update, setUpdate] = useState({
    estado: false,
    nombre: false,
    apellido: false,
    email: false,
    pais: false,
    usuario: false,
  });
  const [checkedExt, setCheckedExt] = useState(false);
  const [checkedBlue, setCheckedBlue] = useState(false);
  const {
    estado,
    nombre,
    apellido,
    email,
    pais,
    usuario,

  } = update;
  const onInputChange = ({ target }) => {
    const { name, value } = target;
    
  };
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
            
            <div className="static  ml-[20px] mt-[20px] min-w-[400px]">
                <Typography className="text-2xl font-medium tracking-tight text-pantoneazul leading-6 truncate mt-[5px]">
                    Edición de Usuario  <PersonAddIcon/>
                </Typography>
               
                <IconButton className="absolute top-0 right-0" onClick={handleClose} variant="contained" color="error">
                    <HighlightOffIcon />
                </IconButton>
                <Typography className="text-lg font-medium tracking-tight text-pantoneazul leading-6 truncate mt-[5px]">
                    Usuario:  Elvis Olmedo
                </Typography>
            </div>
            
            
            <h1 className="border-b-[1px] border-b-pantoneazul w-full"></h1>
            
            <div className="overflow-y-scroll max-h-[70vh]">
            
            <TextField
                    className="m-[20px] "
                    label="Nombre"
                    type="text"
                    defaultValue="Vacio"
                    onChange={onInputChange}
                    name="nombre"
                    disabled={nombre ? false : true}
                    // value={formState.commercialBusiness}
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
                                  // setFormState({
                                  //   ...formState,
                                  //   commercialBusiness:
                                  //     props.dataParticipant
                                  //       .commercial_Business,
                                  // });
                                  setUpdate({
                                    ...update,
                                    nombre: false,
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
                                  nombre: true,
                                });
                                // setCountActive(countActive + 1);
                              }}
                            />
                          )}
                        </InputAdornment>
                      ),
                    }}
                    variant="filled"
                  />
                <TextField
                    className="zerorange:w-[300px]  lg:w-[400px] w-[350px]   m-[20px]"
                    label="Apellido"
                    type="text"
                    defaultValue="Vacio"
                    onChange={onInputChange}
                    name="apellido"
                    disabled={apellido ? false : true}
                    // value={formState.commercialBusiness}
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
                                  // setFormState({
                                  //   ...formState,
                                  //   commercialBusiness:
                                  //     props.dataParticipant
                                  //       .commercial_Business,
                                  // });
                                  setUpdate({
                                    ...update,
                                    apellido: false,
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
                                  apellido: true,
                                });
                                // setCountActive(countActive + 1);
                              }}
                            />
                          )}
                        </InputAdornment>
                      ),
                    }}
                    variant="filled"
                  />
                  <TextField
                    className="zerorange:w-[300px]  lg:w-[400px] w-[350px]   m-[20px] "
                    label="Email"
                    type="email"
                    defaultValue="Vacio"
                    onChange={onInputChange}
                    name="email"
                    disabled={email ? false : true}
                    // value={formState.commercialBusiness}
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
                                  // setFormState({
                                  //   ...formState,
                                  //   commercialBusiness:
                                  //     props.dataParticipant
                                  //       .commercial_Business,
                                  // });
                                  setUpdate({
                                    ...update,
                                    email: false,
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
                                  email: true,
                                });
                                // setCountActive(countActive + 1);
                              }}
                            />
                          )}
                        </InputAdornment>
                      ),
                    }}
                    variant="filled"
                  />
                  <TextField
                    className="zerorange:w-[300px]  lg:w-[400px] w-[350px]   m-[20px] "
                    label="Usuario"
                    type="text"
                    defaultValue="Vacio"
                    onChange={onInputChange}
                    name="usuario"
                    disabled={usuario ? false : true}
                    // value={formState.commercialBusiness}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          {usuario ? (
                            <>
                              <CheckBoxIcon
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  setUpdate({
                                    ...update,
                                    usuario: false,
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
                                  // setFormState({
                                  //   ...formState,
                                  //   commercialBusiness:
                                  //     props.dataParticipant
                                  //       .commercial_Business,
                                  // });
                                  setUpdate({
                                    ...update,
                                    usuario: false,
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
                                  usuario: true,
                                });
                                // setCountActive(countActive + 1);
                              }}
                            />
                          )}
                        </InputAdornment>
                      ),
                    }}
                    variant="filled"
                  />
                  
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
                        </Box>
                
              

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

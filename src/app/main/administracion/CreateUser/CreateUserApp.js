import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import * as yup from "yup";
import _ from "@lodash";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import OutlinedInput from "@mui/material/OutlinedInput";
// import jwtService from '../../auth/services/jwtService';
/*Importaciones mias*/
import FormLabel from "@mui/material/FormLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FusePageSimple from "@fuse/core/FusePageSimple";
import { CallApiParticipants } from "../store/CallApiParticipants";
const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

const schema = yup.object().shape({
  displayName: yup.string().required("Debe ingresar su nombre completo"),
  email: yup
    .string()
    .email("Debe ingresar un email correcto")
    .required("Debe completar este campo"),
  password: yup
    .string()
    .required("Por favor ingrese una contraseña")
    .min(8, "Contraseña demasiado corta - mínimo 8 caracteres."),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "Las contraseñas no coinciden"),
  acceptTermsConditions: yup
    .boolean()
    .oneOf([true], "Los terminos y condiciones deben ser aceptados"),
  project: yup
    .string()
    .required("Debe seleccionar un proyecto")
    .oneOf(["1", "2"], "No esta disponible ese proyecto"),
});

const defaultValues = {
  displayName: "",
  email: "",
  password: "",
  passwordConfirm: "",
  acceptTermsConditions: false,
  project: "",
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
  useEffect(() => {
    const fetchData = async () => {
      let prueba;
      // eslint-disable-next-line prefer-const
      prueba = await CallApiParticipants();
      return prueba;
    };
    fetchData().then((value) => {
      setApiResponseProyects(value);
    });
  }, []);

  const { control, formState, handleSubmit, reset } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });
  const [personName, setPersonName] = useState([]);
  const { isValid, dirtyFields, errors, setError } = formState;
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  return (
    <Root
      header={
        <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-1 min-w-0">
          <Paper className="h-full sm:h-auto md:flex md:items-center md:justify-end w-full sm:w-auto md:h-full md:w-1/2 py-8 px-16 sm:p-48 md:p-64 sm:rounded-2xl md:rounded-none sm:shadow md:shadow-none ltr:border-r-1 rtl:border-l-1">
            <div className="w-full max-w-320 sm:w-320 mx-auto sm:mx-0">
              <div className="divLogo_">
                <img
                  className="LogoTrgns"
                  src="assets/images/logo/logoTRGNS.png"
                />
              </div>
              <Typography className="mt-32 text-4xl font-extrabold tracking-tight leading-tight">
                Registrarse
              </Typography>
              <div className="flex items-baseline mt-2 font-medium">
                <Typography>Tienes una cuenta?</Typography>
                <Link className="ml-4" to="/sign-in">
                  Iniciar Sesión
                </Link>
              </div>

              <form
                name="registerForm"
                noValidate
                className="flex flex-col justify-center w-full mt-32"
                // onSubmit={handleSubmit(onSubmit)}
              >
                <Controller
                  name="displayName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="mb-24"
                      label="Nombre Completo"
                      autoFocus
                      type="name"
                      error={!!errors.displayName}
                      helperText={errors?.displayName?.message}
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
                    />
                  )}
                />

                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="mb-24"
                      label="Contraseña"
                      type="password"
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
                      type="password"
                      error={!!errors.passwordConfirm}
                      helperText={errors?.passwordConfirm?.message}
                      variant="outlined"
                      required
                      fullWidth
                    />
                  )}
                />
                <Controller
                  name="project"
                  control={control}
                  render={({ field }) => (
                    <FormControl
                      className="mb-24"
                      label="Proyecto"
                      // error={!!errors.project}
                      type="select"
                      required
                    >
                      {/* <FormLabel className="font-medium text-14" component="legend">
                    Proyecto
                  </FormLabel>
                  <Select {...field} variant="outlined" fullWidth>
                    <MenuItem value="1">Proyecto 1</MenuItem>
                    <MenuItem value="2">Proyecto 2</MenuItem>
                    <MenuItem value="3">Proyecto 6</MenuItem>
                  </Select>
                  <FormHelperText>{errors?.project?.message}</FormHelperText> */}
                      <Select
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        multiple
                        value={personName}
                        onChange={handleChange}
                        input={<OutlinedInput label="Name" />}
                        // MenuProps={MenuProps}
                      >
                        {apiResponseProyects.data != undefined ? (
                          apiResponseProyects.map((e) => (
                            <MenuItem
                              key={name.commercial_Businesse}
                              value={name.commercial_Businesse}
                              style={getStyles(
                                e.commercial_Business,
                                personName,
                                theme
                              )}
                            >
                              {e.commercial_Business}
                            </MenuItem>
                          ))
                        ) : (
                          <>
                            <MenuItem value="1">Proyecto 1</MenuItem>
                            <MenuItem value="2">Proyecto 2</MenuItem>
                            <MenuItem value="3">Proyecto 6</MenuItem>
                          </>
                        )}
                      </Select>
                    </FormControl>
                  )}
                />

                <Controller
                  name="acceptTermsConditions"
                  control={control}
                  render={({ field }) => (
                    <FormControl
                      className="items-center"
                      error={!!errors.acceptTermsConditions}
                    >
                      <FormControlLabel
                        label="Acepto los Términos de servicio y la Política de privacidad"
                        control={<Checkbox size="small" {...field} />}
                      />
                      <FormHelperText>
                        {errors?.acceptTermsConditions?.message}
                      </FormHelperText>
                    </FormControl>
                  )}
                />

                <Button
                  variant="contained"
                  color="secondary"
                  className="w-full mt-24"
                  aria-label="Register"
                  disabled={_.isEmpty(dirtyFields) || !isValid}
                  type="submit"
                  size="large"
                >
                  Crear cuenta
                </Button>
              </form>
            </div>
          </Paper>

          <Box
            className="relative hidden md:flex flex-auto items-center justify-center h-full p-64 lg:px-112 overflow-hidden"
            id="box_der"
            sx={{ backgroundColor: "secondary.main" }}
          ></Box>
        </div>
      }
      content={
        <div className="p-24">
          <h1>dsdfsdfsdf</h1>
          <br />
        </div>
      }
      scroll="content"
    />
  );
}

export default CreateUserApp;

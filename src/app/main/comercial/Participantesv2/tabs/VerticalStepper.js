//ORDENAR CODIGO

import * as React from "react";
import axios from "axios";
// import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
// import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import EditIcon from "@mui/icons-material/Edit";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Select from "@mui/material/Select";
// import TextField from "@mui/material/TextField";
import TablaUltimosCambios from "./widgets/TablaUltimosCambios";
import Paper from "@mui/material/Paper";
import { CallBanks } from "../store/CallBanks";
import { useEffect, useState } from "react";
import {
  Autocomplete,
  Stack,
  TextField,
  Button,
  Box,
  Alert,
} from "@mui/material";
import TablaHistorificacion from "./TablaHistorificacion";
import AlertCambios from "./widgets/AlertCambios";
import AdviceModule from "../../AdviceModule";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

//MODAL TABLA CAMBIOS
function createData(campo, antiguo, nuevo) {
  return { campo, antiguo, nuevo };
}

let rows = [];

const steps = [
  "Coordinado",
  "Datos de Contacto",
  "Datos Bancarios",
  "Gestión Trígonos",
  "Historificación",
];
const iconSteps = [
  <LockOpenIcon />,
  <ManageAccountsIcon />,
  <AssignmentIcon />,
  <AccountBalanceIcon />,
  <ManageHistoryIcon />,
];
let LabelSetep = "";
let dataBank;
let banks;

export default function HorizontalNonLinearStepper(props) {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const [activeLabel, setActiveLabel] = useState("");
  const [grupo, setGrupo] = useState("");
  const [erp, setErp] = useState("");
  const [bankk, setBankk] = useState("");

  const [formState, setFormState] = useState({
    id: props.dataParticipant.id,
    name: props.dataParticipant.name,
    rut: props.dataParticipant.rut,
    verificationCode: props.dataParticipant.verification_Code,
    businessName: props.dataParticipant.business_Name,
    commercialBusiness: props.dataParticipant.commercial_Business,
    email: props.dataParticipant.dte_Reception_Email,
    bankAccount: props.dataParticipant.bank_Account,
    bank: props.dataParticipant.bank,
    banksName: props.dataParticipant.banksName,
    commercialAddress: props.dataParticipant.commercial_address,
    postalAddress: props.dataParticipant.postal_address, //REVISAR
    manager: props.dataParticipant.manager,
    payContactFirstName: props.dataParticipant.pay_Contact_First_Name,
    payContactLastName: props.dataParticipant.pay_contact_last_name,
    payContactAddress: props.dataParticipant.pay_contact_address,
    payContactPhones: props.dataParticipant.pay_contact_phones,
    payContactEmail: props.dataParticipant.pay_contact_email,
    billsContactLastName: props.dataParticipant.bills_contact_last_name,
    billsContactFirstName: props.dataParticipant.bills_contact_first_name,
    billsContactAddress: props.dataParticipant.bills_contact_address,
    billsContactPhones: props.dataParticipant.bills_contact_phones,
    billsContactEmail: props.dataParticipant.bills_contact_email,
  });
  const [alertOk, setAlertOk] = useState(false);
  const [alertError, setAlertError] = useState(false);
  const [update, setUpdate] = useState({
    rut: false,
    name: false,
    businessName: false,
    commercialBusiness: false,
    email: false,
    bankAccount: false,
    banksName: false,
    commercialAddress: false,
    manager: false,
    payContactFirstName: false,
    payContactPhones: false,
    payContactEmail: false,
    billsContactFirstName: false,
    billsContactPhones: false,
    billsContactEmail: false,
    typeClient: false,
  });
  const [dataConfirm, setDataConfirm] = useState({
    id: props.dataParticipant.id,
    name: props.dataParticipant.name,
    rut: props.dataParticipant.rut,
    verificationCode: props.dataParticipant.verification_Code,
    businessName: props.dataParticipant.business_Name,
    commercialBusiness: props.dataParticipant.commercial_Business,
    email: props.dataParticipant.dte_Reception_Email,
    bankAccount: props.dataParticipant.bank_Account,
    bank: props.dataParticipant.bank,
    banksName: props.dataParticipant.banksName,
    commercialAddress: props.dataParticipant.commercial_address,
    postalAddress: props.dataParticipant.postal_address, //REVISAR
    manager: props.dataParticipant.manager,
    payContactFirstName: props.dataParticipant.pay_Contact_First_Name,
    payContactLastName: props.dataParticipant.pay_contact_last_name,
    payContactAddress: props.dataParticipant.pay_contact_address,
    payContactPhones: props.dataParticipant.pay_contact_phones,
    payContactEmail: props.dataParticipant.pay_contact_email,
    billsContactLastName: props.dataParticipant.bills_contact_last_name,
    billsContactFirstName: props.dataParticipant.bills_contact_first_name,
    billsContactAddress: props.dataParticipant.bills_contact_address,
    billsContactPhones: props.dataParticipant.bills_contact_phones,
    billsContactEmail: props.dataParticipant.bills_contact_email,
  });
  const [activeButton, setActiveButton] = useState(false);
  const [countActive, setCountActive] = useState(0);
  const [open, setOpen] = useState(false);

  const [checkedBlue, setCheckedBlue] = React.useState(false);
  const [checkedExt, setCheckedExt] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseAlert = () => {
    setOpen(false);
  };

  const handleCloseAlertSubmit = () => {
    ApiPatch();
    setOpen(false);
  };
  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  useEffect(() => {
    (async () => {
      dataBank = await CallBanks(props.dataParticipant.bank);
      setBankk(dataBank.name);
      setFormState({
        id: props.dataParticipant.id,
        name: props.dataParticipant.name,
        rut: props.dataParticipant.rut,
        verificationCode: props.dataParticipant.verification_Code,
        businessName: props.dataParticipant.business_Name,
        commercialBusiness: props.dataParticipant.commercial_Business,
        email: props.dataParticipant.dte_Reception_Email,
        bankAccount: props.dataParticipant.bank_Account,
        bank: props.dataParticipant.bank,
        banksName: props.dataParticipant.banksName,
        commercialAddress: props.dataParticipant.commercial_address,
        postalAddress: props.dataParticipant.postal_address, //REVISAR
        manager: props.dataParticipant.manager,
        payContactFirstName: props.dataParticipant.pay_Contact_First_Name,
        payContactLastName: props.dataParticipant.pay_contact_last_name,
        payContactAddress: props.dataParticipant.pay_contact_address,
        payContactPhones: props.dataParticipant.pay_contact_phones.replace(
          /["\[\]"]/g,
          ""
        ),
        payContactEmail: props.dataParticipant.pay_contact_email,
        billsContactLastName: props.dataParticipant.bills_contact_last_name,
        billsContactFirstName: props.dataParticipant.bills_contact_first_name,
        billsContactAddress: props.dataParticipant.bills_contact_address,
        billsContactPhones: props.dataParticipant.bills_contact_phones.replace(
          /["\[\]"]/g,
          ""
        ),
        billsContactEmail: props.dataParticipant.bills_contact_email,
      });
      setDataConfirm({
        id: props.dataParticipant.id,
        name: props.dataParticipant.name,
        rut: props.dataParticipant.rut,
        verificationCode: props.dataParticipant.verification_Code,
        businessName: props.dataParticipant.business_Name,
        commercialBusiness: props.dataParticipant.commercial_Business,
        email: props.dataParticipant.dte_Reception_Email,
        bankAccount: props.dataParticipant.bank_Account,
        bank: props.dataParticipant.bank,
        banksName: props.dataParticipant.banksName,
        commercialAddress: props.dataParticipant.commercial_address,
        postalAddress: props.dataParticipant.postal_address, //REVISAR
        manager: props.dataParticipant.manager,
        payContactFirstName: props.dataParticipant.pay_Contact_First_Name,
        payContactLastName: props.dataParticipant.pay_contact_last_name,
        payContactAddress: props.dataParticipant.pay_contact_address,
        payContactPhones: props.dataParticipant.pay_contact_phones.replace(
          /["\[\]"]/g,
          ""
        ),
        payContactEmail: props.dataParticipant.pay_contact_email,
        billsContactLastName: props.dataParticipant.bills_contact_last_name,
        billsContactFirstName: props.dataParticipant.bills_contact_first_name,
        billsContactAddress: props.dataParticipant.bills_contact_address,
        billsContactPhones: props.dataParticipant.bills_contact_phones.replace(
          /["\[\]"]/g,
          ""
        ),
        billsContactEmail: props.dataParticipant.bills_contact_email,
      });
    })();
  }, [props.dataParticipant.id, alertOk]);
  useEffect(() => {
    (async () => {
      banks = await CallBanks(1, 2);
    })();
  }, []);
  useEffect(() => {
    if (alertOk === true) {
      setActiveButton(true);
      setTimeout(() => {
        setAlertOk(false);
        setActiveButton(false);
      }, 1000);
    }
    if (alertError === true) {
      setTimeout(() => {
        setAlertError(false);
      }, 1000);
    }
  }, [alertOk, alertError]);

  const {
    rut,
    name,
    businessName,
    commercialBusiness,
    email,
    bankAccount,
    banksName,
    commercialAddress,
    manager,
    payContactFirstName,
    payContactPhones,
    payContactEmail,
    billsContactFirstName,
    billsContactPhones,
    billsContactEmail,
    typeClient,
  } = update;
  const handleChangeCheck = (event) => {
    setChecked(event.target.checked);
  };
  const handleChangee = (event: React.ChangeEvent<HTMLInputElement>) => {
    let idBank;
    banks.map((d) => {
      if (d.name === event.target.value) {
        idBank = d.id;
      }
    });

    setFormState({
      ...formState,
      banksName: event.target.value,
      bank: idBank,
    });
    setBankk(event.target.value);
    // console.log(formState.bank);
  };
  const handleChange = (event) => {
    etGrupo(event.target.value);
  };
  const handleChangeERP = (event) => {
    setErp(event.target.value);
  };

  //erp
  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };
  //step icon

  const handleIconStep = (step) => {
    if (step === 0) {
      LabelSetep = "Coordinado";
      return (
        <Box>
          <LockOpenIcon />
        </Box>
      );
    } else if (step === 1) {
      return <ManageAccountsIcon />;
    } else if (step === 2) {
      return <AssignmentIcon />;
    } else if (step === 3) {
      return <AccountBalanceIcon />;
    } else {
      return <ManageHistoryIcon />;
    }
  };
  {
    /* <Typography className="border-b-4 border-indigo-500"  color="primary">
                 
                 {label}
                </Typography> */
  }
  const FetchDatas = () => {
    let isEqual = JSON.stringify(dataConfirm) === JSON.stringify(formState);
    rows = [
      dataConfirm.name === formState.name
        ? undefined
        : createData("Nombre", dataConfirm.name, formState.name),
      dataConfirm.businessName === formState.businessName
        ? undefined
        : createData(
            "Razón Social",
            dataConfirm.businessName,
            formState.businessName
          ),
      dataConfirm.commercialBusiness === formState.commercialBusiness
        ? undefined
        : createData(
            "Giro",
            dataConfirm.commercialBusiness,
            formState.commercialBusiness
          ),
      dataConfirm.manager === formState.manager
        ? undefined
        : createData("Gerente general", dataConfirm.manager, formState.manager),
      dataConfirm.commercialAddress === formState.commercialAddress
        ? undefined
        : createData(
            "Dirección Comercial",
            dataConfirm.commercialAddress,
            formState.commercialAddress
          ),
      dataConfirm.email === formState.email
        ? undefined
        : createData("Email DTE", dataConfirm.email, formState.email),
      dataConfirm.payContactPhones === formState.payContactPhones
        ? undefined
        : createData(
            "Teléfono de Contacto Pago",
            dataConfirm.payContactPhones,
            formState.payContactPhones
          ),
      dataConfirm.billsContactPhones === formState.billsContactPhones
        ? undefined
        : createData(
            "Teléfono de Contacto Factura",
            dataConfirm.billsContactPhones,
            formState.billsContactPhones
          ),
      dataConfirm.banksName === formState.banksName
        ? undefined
        : createData("Banco", dataConfirm.banksName, formState.banksName),
      dataConfirm.bankAccount === formState.bankAccount
        ? undefined
        : createData(
            "Cuenta Corriente",
            dataConfirm.bankAccount,
            formState.bankAccount
          ),
    ];
    rows = rows.filter((x) => x !== undefined);
    if (isEqual) {
      return <div>No se han encontrado cambios</div>;
    } else {
      return (
        <TableContainer component={Paper} className="bg-grey-100">
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Nombre Campo</TableCell>
                <TableCell align="left">Atributo Antiguo</TableCell>
                <TableCell align="left">Atributo Nuevo</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.campo}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.campo}
                  </TableCell>
                  <TableCell align="left">{row.antiguo}</TableCell>
                  <TableCell align="left">{row.nuevo}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
    }
  };

  const ApiPatch = () => {
    let isEqual = JSON.stringify(dataConfirm) === JSON.stringify(formState);
    if (isEqual) {
      console.log("No se realiza envio a API");
      setAlertError(true);
    } else {
      let formatBillsContactPhones =
        '["' + formState.billsContactPhones.replace(/,/g, '","') + '"]';
      let formatpayContactPhones =
        '["' + formState.payContactPhones.replace(/,/g, '","') + '"]';

      const apiPatchParticipante =
        ` http://localhost:5205/api/Participantes?` +
        `id=${formState.id}&` +
        `Name=${formState.name}&` +
        `Rut=${formState.rut}&` +
        `Verification_Code=${formState.verificationCode}&` +
        `Business_Name=${formState.businessName}&` +
        `Commercial_Business=${formState.commercialBusiness}&` +
        `Dte_Reception_Email=${formState.email}&` +
        `Bank_Account=${formState.bankAccount}&` +
        `bank=${formState.bank}&` +
        `Commercial_address=${formState.commercialAddress}&` +
        `Postal_address=${formState.postalAddress}&` +
        `Manager=${formState.manager}&` +
        `Pay_Contact_First_Name=${formState.payContactFirstName}&` +
        `Pay_contact_last_name=${formState.payContactLastName}&` +
        `Pay_contact_address=${formState.payContactAddress}&` +
        `Pay_contact_phones=${formatpayContactPhones}&` +
        `Pay_contact_email=${formState.payContactEmail}&` +
        `Bills_contact_first_name=${formState.billsContactFirstName}&` +
        `Bills_contact_last_name=${formState.billsContactLastName}&` +
        `Bills_contact_address=${formState.billsContactAddress}&` +
        `Bills_contact_phones=${formatBillsContactPhones}&` +
        `Bills_contact_email=${formState.billsContactEmail}`;
      const res = axios
        .patch(apiPatchParticipante)
        .then((response) => {
          setAlertOk(true);
        })
        .catch((error) => {
          setAlertError(true);
        });
    }
  };
  useEffect(() => {
    countActive === 0 ? setActiveButton(false) : setActiveButton(true);
  }, [countActive]);

  useEffect(() => {
    props.sendChange(alertOk);

    props.sendIdParticipant(formState.id);
  }, [alertOk]);
  return (
    <Box className="w-full h-full">
      <Box className="flex w-full h-full" sx={{ width: "100%" }}>
        {/* SECCION VERTICAL IZQUIERDA */}

        <Box className="pr-[10px]  md:min-w-[300px] h-full">
          <Typography
            variant="h6"
            className="mb-4 flex flex-row"
            color="primary"
          >
            Gestión de Participantes
            <AdviceModule
              direction={"rtl"}
              textwidth={500}
              msg={
                'Al costado izquierdo podrá desplazarse en las distintas opciones para administrar la información asociada a un participante, al costado derecho podrá realizar uno o más cambios en un solo guardado presionando el icono de edición "Lapíz".'
              }
              className={"relative bottom-[8px]"}
              // classnamesegund={"absolute h-14 w-14 right-[230px] -bottom-[5px]"}
              classPopover={"ml-[20px] mr-[100px] mt-[-10px]"}
            />
          </Typography>

          <Stepper
            className="ml-[30px] mt-[30px]  mdmax:ml-[0px]"
            nonLinear
            activeStep={activeStep}
            orientation="vertical"
          >
            {steps.map((label, index) => (
              <Step
                key={label}
                completed={completed[index]}
                sx={{
                  "& .MuiStepLabel-root .Mui-completed": {
                    color: "secondary.light",
                  },
                  "& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel":
                    {
                      color: "secondary.light",
                    },
                  "& .MuiStepLabel-root .Mui-active": {
                    color: "secondary.main",
                  },
                  "& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel":
                    {
                      color: "common.black",
                    },
                  "& .MuiStepIcon": {
                    color: "blue",
                  },
                }}
              >
                <StepButton
                  focusRipple
                  className="hover:bg-blue-50"
                  icon={handleIconStep(index)}
                  onClick={handleStep(index)}
                >
                  {label}
                </StepButton>
              </Step>
            ))}
          </Stepper>
        </Box>
        {/* SECCION VERTICAL DERECHA */}
        <Box className="flex mt-[30px]  border-solid border-l-2 w-full h-full">
          {allStepsCompleted() ? (
            <Box className="w-full h-full">
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you&apos;re finished
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleReset}>Reset</Button>
              </Box>
            </Box>
          ) : (
            // <React.Fragment>

            // </React.Fragment>
            <Box className="ml-[10px]  h-full">
              <Box className=" w-full h-full ">
                {activeStep === 0 ? (
                  <Box className="w-full ">
                    <Typography variant="h6" className="mb-4" color="primary">
                      Coordinado
                    </Typography>

                    <Box className="flex flex-wrap justify-start zerorange:justify-center  ">
                      <Box className="flex flex-col">
                        <TextField
                          // id="outlined-required"
                          className="zerorange:w-[300px]  lg:w-[400px] w-[350px]  mdmax:m-[20px] m-[20px] zerorange:m-[10px] "
                          label="Nombre"
                          onChange={onInputChange}
                          type="text"
                          name="name"
                          defaultValue="Vacio"
                          disabled={name ? false : true}
                          value={formState.name}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                {name ? (
                                  <>
                                    <CheckBoxIcon
                                      style={{ cursor: "pointer" }}
                                      onClick={() => {
                                        setUpdate({
                                          ...update,
                                          name: false,
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
                                          name: props.dataParticipant.name,
                                        });
                                        setUpdate({
                                          ...update,
                                          name: false,
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
                                        name: true,
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
                        <div className="absolute ">
                          {name ? (
                            <>
                              <span className="ml-[20px] text-red-500">
                                Recuerde aceptar o cancelar el cambio realizado
                              </span>
                            </>
                          ) : (
                            <></>
                          )}
                        </div>
                      </Box>
                      <Box className="flex flex-col">
                        <TextField
                          className="zerorange:w-[300px]  lg:w-[400px] w-[350px]  mdmax:m-[20px] m-[20px] zerorange:m-[10px] "
                          label="Razón Social"
                          disabled={businessName ? false : true}
                          type="text"
                          name="businessName"
                          onChange={onInputChange}
                          defaultValue="Vacio"
                          value={formState.businessName}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                {businessName ? (
                                  <>
                                    <CheckBoxIcon
                                      style={{ cursor: "pointer" }}
                                      onClick={() => {
                                        setUpdate({
                                          ...update,
                                          businessName: false,
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
                                          businessName:
                                            props.dataParticipant.business_Name,
                                        });
                                        setUpdate({
                                          ...update,
                                          businessName: false,
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
                                        businessName: true,
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
                        <div className="absolute ">
                          {businessName ? (
                            <>
                              <span className="ml-[20px] text-red-500">
                                Recuerde aceptar o cancelar el cambio realizado
                              </span>
                            </>
                          ) : (
                            <></>
                          )}
                        </div>
                      </Box>

                      <Box className="flex flex-col">
                        <TextField
                          className="zerorange:w-[300px]  lg:w-[400px] w-[350px]  mdmax:m-[20px] m-[20px] zerorange:m-[10px] "
                          label="Giro"
                          type="text"
                          defaultValue="Vacio"
                          onChange={onInputChange}
                          name="commercialBusiness"
                          disabled={commercialBusiness ? false : true}
                          value={formState.commercialBusiness}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                {commercialBusiness ? (
                                  <>
                                    <CheckBoxIcon
                                      style={{ cursor: "pointer" }}
                                      onClick={() => {
                                        setUpdate({
                                          ...update,
                                          commercialBusiness: false,
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
                                          commercialBusiness:
                                            props.dataParticipant
                                              .commercial_Business,
                                        });
                                        setUpdate({
                                          ...update,
                                          commercialBusiness: false,
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
                                        commercialBusiness: true,
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
                        <div className="absolute ">
                          {commercialBusiness ? (
                            <>
                              <span className="ml-[20px] text-red-500">
                                Recuerde aceptar o cancelar el cambio realizado
                              </span>
                            </>
                          ) : (
                            <></>
                          )}
                        </div>
                      </Box>

                      <TextField
                        className="zerorange:w-[300px]  lg:w-[400px] w-[350px]  mdmax:m-[20px] m-[20px] zerorange:m-[10px] "
                        label="Rut"
                        type="text"
                        defaultValue="Vacio"
                        onChange={onInputChange}
                        name="rut"
                        disabled
                        value={formState.rut}
                        // InputProps={{
                        //   startAdornment: (
                        //     <InputAdornment position="start">
                        //       {rut ? (
                        //         <>
                        //           <CheckBoxIcon
                        //             style={{ cursor: 'pointer' }}
                        //             onClick={() => {
                        //               setUpdate({
                        //                 ...update,
                        //                 rut: false,
                        //               });
                        //               setCountActive(countActive>0?countActive-1:countActive);
                        //             }}
                        //           />
                        //           <DisabledByDefaultIcon
                        //             style={{ cursor: 'pointer' }}
                        //             onClick={() => {
                        //               setFormState({
                        //                 ...formState,
                        //                 rut: props.dataParticipant.rut,
                        //               });
                        //               setUpdate({
                        //                 ...update,
                        //                 rut: false,
                        //               });
                        //               setCountActive(countActive>0?countActive-1:countActive);
                        //             }}
                        //           />
                        //         </>
                        //       ) : (
                        //         <EditIcon
                        //           style={{ cursor: 'pointer' }}
                        //           onClick={() => {
                        //             setUpdate({
                        //               ...update,
                        //               rut: true,
                        //             });
                        //             setCountActive(countActive+1);
                        //           }}
                        //         />
                        //       )}
                        //     </InputAdornment>
                        //   ),
                        // }}
                        variant="filled"
                      />
                      <Box className="flex flex-col">
                        <TextField
                          className="zerorange:w-[300px]  lg:w-[400px] w-[350px]  mdmax:m-[20px] m-[20px] zerorange:m-[10px] "
                          label="Gerente General"
                          type="text"
                          defaultValue="Vacio"
                          onChange={onInputChange}
                          name="manager"
                          disabled={manager ? false : true}
                          value={formState.manager}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                {manager ? (
                                  <>
                                    <CheckBoxIcon
                                      style={{ cursor: "pointer" }}
                                      onClick={() => {
                                        setUpdate({
                                          ...update,
                                          manager: false,
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
                                          manager:
                                            props.dataParticipant.manager,
                                        });
                                        setUpdate({
                                          ...update,
                                          manager: false,
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
                                        manager: true,
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
                        <div className="absolute ">
                          {manager ? (
                            <>
                              <span className="ml-[20px] text-red-500">
                                Recuerde aceptar o cancelar el cambio realizado
                              </span>
                            </>
                          ) : (
                            <></>
                          )}
                        </div>
                      </Box>
                    </Box>
                  </Box>
                ) : activeStep === 1 ? (
                  <Box className="w-full">
                    <Typography variant="h6" className="mb-4" color="primary">
                      Datos de Contacto
                    </Typography>
                    <Box className="flex flex-wrap justify-start  zerorange:justify-center ml-[0 auto]">
                      <Box className="flex flex-col">
                        <TextField
                          className="zerorange:w-[250px]  lg:w-[400px] w-[300px]  mdmax:m-[20px] m-[20px] zerorange:m-[10px] "
                          label="Dirección Comercial"
                          type="text"
                          name="commercialAddress"
                          disabled={commercialAddress ? false : true}
                          defaultValue="Vacio"
                          value={formState.commercialAddress}
                          onChange={onInputChange}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                {commercialAddress ? (
                                  <>
                                    <CheckBoxIcon
                                      style={{ cursor: "pointer" }}
                                      onClick={() => {
                                        setUpdate({
                                          ...update,
                                          commercialAddress: false,
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
                                          commercialAddress:
                                            props.dataParticipant
                                              .commercial_address,
                                        });
                                        setUpdate({
                                          ...update,
                                          commercialAddress: false,
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
                                        commercialAddress: true,
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
                        <div className="absolute ">
                          {commercialAddress ? (
                            <>
                              <span className="ml-[20px] text-red-500">
                                Recuerde aceptar o cancelar el cambio realizado
                              </span>
                            </>
                          ) : (
                            <></>
                          )}
                        </div>
                      </Box>

                      {/* <TextField
                        className="zerorange:w-[250px]  lg:w-[400px] w-[300px]  mdmax:m-[20px] m-[20px] zerorange:m-[10px] "
                        label="Comuna"
                        type="text"
                        value={"Vacio"}
                        defaultValue="Vacio"
                        variant="filled"
                      /> */}
                      {/* <TextField
                        className="zerorange:w-[250px]  lg:w-[400px] w-[300px]  mdmax:m-[20px] m-[20px] zerorange:m-[10px] "
                        label="Ciudad"
                        type="text"
                        value={"Vacio"}
                        defaultValue="Vacio"
                        variant="filled"
                      /> */}

                      <Box className="flex flex-col">
                        <TextField
                          className="zerorange:w-[250px]  lg:w-[400px] w-[300px]  mdmax:m-[20px] m-[20px] zerorange:m-[10px] "
                          label="Email DTE"
                          type="email"
                          defaultValue="Vacio"
                          name="email"
                          disabled={email ? false : true}
                          value={formState.email}
                          onChange={onInputChange}
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
                                          email:
                                            props.dataParticipant
                                              .dte_Reception_Email,
                                        });
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
                        <div className="absolute ">
                          {email ? (
                            <>
                              <span className="ml-[20px] text-red-500">
                                Recuerde aceptar o cancelar el cambio realizado
                              </span>
                            </>
                          ) : (
                            <></>
                          )}
                        </div>
                      </Box>

                      <Box className="flex flex-col">
                        <TextField
                          className="zerorange:w-[250px]  lg:w-[400px] w-[300px]  mdmax:m-[20px] m-[20px] zerorange:m-[10px] "
                          label="Teléfono de Contacto Pago"
                          type="text"
                          defaultValue="Vacio"
                          name="payContactPhones"
                          disabled={payContactPhones ? false : true}
                          value={formState.payContactPhones}
                          onChange={onInputChange}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                {payContactPhones ? (
                                  <>
                                    <CheckBoxIcon
                                      style={{ cursor: "pointer" }}
                                      onClick={() => {
                                        setUpdate({
                                          ...update,
                                          payContactPhones: false,
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
                                          payContactPhones:
                                            props.dataParticipant.pay_contact_phones.replace(
                                              /["\[\]"]/g,
                                              ""
                                            ),
                                        });
                                        setUpdate({
                                          ...update,
                                          payContactPhones: false,
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
                                        payContactPhones: true,
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
                        <div className="absolute ">
                          {payContactPhones ? (
                            <>
                              <span className="ml-[20px] text-red-500">
                                Recuerde aceptar o cancelar el cambio realizado
                              </span>
                            </>
                          ) : (
                            <></>
                          )}
                        </div>
                      </Box>
                      <Box className="flex flex-col">
                        <TextField
                          className="zerorange:w-[250px]  lg:w-[400px] w-[300px]  mdmax:m-[20px] m-[20px] zerorange:m-[10px] "
                          label="Teléfono de Contacto Factura"
                          type="text"
                          defaultValue="Vacio"
                          name="billsContactPhones"
                          disabled={billsContactPhones ? false : true}
                          value={formState.billsContactPhones}
                          onChange={onInputChange}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                {billsContactPhones ? (
                                  <>
                                    <CheckBoxIcon
                                      style={{ cursor: "pointer" }}
                                      onClick={() => {
                                        setUpdate({
                                          ...update,
                                          billsContactPhones: false,
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
                                          billsContactPhones:
                                            props.dataParticipant.bills_contact_phones.replace(
                                              /["\[\]"]/g,
                                              ""
                                            ),
                                        });
                                        setUpdate({
                                          ...update,
                                          billsContactPhones: false,
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
                                        billsContactPhones: true,
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
                        <div className="absolute ">
                          {billsContactPhones ? (
                            <>
                              <span className="ml-[20px] text-red-500">
                                Recuerde aceptar o cancelar el cambio realizado
                              </span>
                            </>
                          ) : (
                            <></>
                          )}
                        </div>
                      </Box>

                      {/* <TextField
                        className="zerorange:w-[250px]  lg:w-[400px] w-[300px]  mdmax:m-[20px] m-[20px] zerorange:m-[10px] "
                        label="Nómina ID"
                        type="text"
                        defaultValue="Vacio"
                        value={"Vacio"}
                        variant="filled"
                      /> */}
                    </Box>
                  </Box>
                ) : activeStep === 2 ? (
                  <Box className="w-full">
                    <Typography variant="h6" className="mb-4" color="primary">
                      Datos Bancarios
                    </Typography>
                    <Box className="flex flex-wrap justify-start  zerorange:justify-center ml-[0 auto]">
                      {/* <TextField
                        className="zerorange:w-[250px]  lg:w-[400px] w-[300px]  mdmax:m-[20px] m-[20px] zerorange:m-[10px] "
                        label="Banco"
                        type="text"
                        value={dataBank.name}
                        defaultValue="Vacio"
                        variant="filled"
                      /> */}
                      <Box className="flex flex-col">
                        <TextField
                          // disabled={banksName1 ? false : true}
                          className="zerorange:w-[250px]  lg:w-[400px] w-[300px]  mdmax:m-[20px] m-[20px] zerorange:m-[10px] "
                          id="standard-select-currency"
                          select
                          label="Banco"
                          value={formState.banksName}
                          onChange={handleChangee}
                          variant="filled"
                          name="banksName"
                          disabled={banksName ? false : true}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                {banksName ? (
                                  <>
                                    <CheckBoxIcon
                                      style={{ cursor: "pointer" }}
                                      onClick={() => {
                                        setUpdate({
                                          ...update,
                                          banksName: false,
                                        });
                                        // setFormState({
                                        //   ...formState,
                                        //   banksName:
                                        //     props.dataParticipant.banksName,
                                        //   bank: props.dataParticipant.bank,
                                        // });
                                        // setBankk(props.dataParticipant.banksName);
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
                                        // setFormState({
                                        //   ...formState,
                                        //   email:
                                        //     props.dataParticipant
                                        //       .dte_Reception_Email,
                                        // });
                                        setFormState({
                                          ...formState,
                                          banksName:
                                            props.dataParticipant.banksName,
                                          bank: props.dataParticipant.bank,
                                        });
                                        setBankk(
                                          props.dataParticipant.banksName
                                        );
                                        setUpdate({
                                          ...update,
                                          banksName: false,
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
                                        banksName: true,
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
                          {banks.map((data) => (
                            <MenuItem key={data.id} value={data.name}>
                              {data.name}
                            </MenuItem>
                          ))}
                        </TextField>
                        <div className="absolute ">
                          {banksName ? (
                            <>
                              <span className="ml-[20px] text-red-500">
                                Recuerde aceptar o cancelar el cambio realizado
                              </span>
                            </>
                          ) : (
                            <></>
                          )}
                        </div>
                      </Box>
                      <Box className="flex flex-col">
                        <TextField
                          className="zerorange:w-[250px]  lg:w-[400px] w-[300px]  mdmax:m-[20px] m-[20px] zerorange:m-[10px] "
                          label="RUT Cuenta Corriente"
                          type="text"
                          value={formState.rut}
                          onChange={onInputChange}
                          name="rut"
                          disabled={rut ? false : true}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                {rut ? (
                                  <>
                                    <CheckBoxIcon
                                      style={{ cursor: "pointer" }}
                                      onClick={() => {
                                        setUpdate({
                                          ...update,
                                          rut: false,
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
                                        // setFormState({
                                        //   ...formState,
                                        //   email:
                                        //     props.dataParticipant
                                        //       .dte_Reception_Email,
                                        // });
                                        setFormState({
                                          ...formState,
                                          rut: props.dataParticipant.rut,
                                        });
                                        setUpdate({
                                          ...update,
                                          rut: false,
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
                                        rut: true,
                                      });
                                      setCountActive(countActive + 1);
                                    }}
                                  />
                                )}
                              </InputAdornment>
                            ),
                          }}
                          defaultValue="Vacio"
                          variant="filled"
                        />
                        <div className="absolute ">
                          {rut ? (
                            <>
                              <span className="ml-[20px] text-red-500">
                                Recuerde aceptar o cancelar el cambio realizado
                              </span>
                            </>
                          ) : (
                            <></>
                          )}
                        </div>
                      </Box>
                      <Box className="flex flex-col">
                        <TextField
                          className="zerorange:w-[250px]  lg:w-[400px] w-[300px]  mdmax:m-[20px] m-[20px] zerorange:m-[10px] "
                          label="Cuenta Corriente"
                          type="text"
                          value={formState.bankAccount}
                          onChange={onInputChange}
                          name="bankAccount"
                          disabled={bankAccount ? false : true}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                {bankAccount ? (
                                  <>
                                    <CheckBoxIcon
                                      style={{ cursor: "pointer" }}
                                      onClick={() => {
                                        setUpdate({
                                          ...update,
                                          bankAccount: false,
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
                                        // setFormState({
                                        //   ...formState,
                                        //   email:
                                        //     props.dataParticipant
                                        //       .dte_Reception_Email,
                                        // });
                                        setFormState({
                                          ...formState,
                                          bankAccount:
                                            props.dataParticipant.bank_Account,
                                        });
                                        setUpdate({
                                          ...update,
                                          bankAccount: false,
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
                                        bankAccount: true,
                                      });
                                      setCountActive(countActive + 1);
                                    }}
                                  />
                                )}
                              </InputAdornment>
                            ),
                          }}
                          defaultValue="Vacio"
                          variant="filled"
                        />
                        <div className="absolute ">
                          {bankAccount ? (
                            <>
                              <span className="ml-[20px] text-red-500">
                                Recuerde aceptar o cancelar el cambio realizado
                              </span>
                            </>
                          ) : (
                            <></>
                          )}
                        </div>
                      </Box>

                      <TextField
                        // disabled={banksName1 ? false : true}
                        className="zerorange:w-[250px]  lg:w-[400px] w-[300px]  mdmax:m-[20px] m-[20px] zerorange:m-[10px] "
                        id="standard-select-currency"
                        select
                        label="Nomina de Pago"
                        value="Sin Nomina"
                        //onChange={handleChangee}
                        variant="filled"
                        name="nominaName"
                        disabled={true}
                        // InputProps={{
                        //   startAdornment: (
                        //     <InputAdornment position="start">
                        //       {banksName ? (
                        //         <>
                        //           <CheckBoxIcon
                        //             onClick={() => {
                        //               setUpdate({
                        //                 ...update,
                        //                 banksName: false,
                        //               });
                        //               setFormState({
                        //                 ...formState,
                        //                 banksName:
                        //                   props.dataParticipant.banksName,
                        //                 bank: props.dataParticipant.bank,
                        //               });
                        //               setBankk(props.dataParticipant.banksName);
                        //             }}
                        //           />
                        //           <DisabledByDefaultIcon
                        //             onClick={() => {
                        //               // setFormState({
                        //               //   ...formState,
                        //               //   email:
                        //               //     props.dataParticipant
                        //               //       .dte_Reception_Email,
                        //               // });
                        //               setFormState({
                        //                 ...formState,
                        //                 banksName:
                        //                   props.dataParticipant.banksName,
                        //                 bank: props.dataParticipant.bank,
                        //               });
                        //               setBankk(props.dataParticipant.banksName);
                        //               setUpdate({
                        //                 ...update,
                        //                 banksName: false,
                        //               });
                        //             }}
                        //           />
                        //         </>
                        //       ) : (
                        //         <EditIcon
                        //           onClick={() => {
                        //             setUpdate({
                        //               ...update,
                        //               banksName: true,
                        //               // });
                        //               // setFormState({
                        //               //   ...formState,
                        //               //   bank: idBank,
                        //               //   banksName: bankk,
                        //               // });

                        //             });
                        //           }}
                        //         />
                        //       )}
                        //     </InputAdornment>
                        //   ),
                        // }}
                      >
                        {banks.map((data) => (
                          <MenuItem key={data.id} value={data.name}>
                            {data.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Box>
                  </Box>
                ) : activeStep === 3 ? (
                  <Box className=" w-full h-full">
                    <Typography variant="h6" className="mb-4" color="primary">
                      Gestión Trígonos
                    </Typography>

                    <Box className="flex flex-wrap justify-between  zerorange:justify-center ml-[0 auto] ">
                      <Box className="flex flex-col">
                        <Box className="flex flex-col zerorange:w-[250px]  lg:w-[400px] w-[300px]  mdmax:m-[20px] m-[20px] zerorange:m-[10px]">
                          <Box className="flex flex-row">
                            <Typography
                              variant="subtitle1"
                              color="primary"
                              className="mb-[40px]"
                            >
                              Tipo de cliente
                            </Typography>
                            <InputAdornment className="m-[10px]">
                              {typeClient ? (
                                <>
                                  <CheckBoxIcon
                                    style={{ cursor: "pointer" }}
                                    onClick={() => {
                                      setUpdate({
                                        ...update,
                                        typeClient: false,
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
                                      setUpdate({
                                        ...update,
                                        typeClient: false,
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
                                      typeClient: true,
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
                                disablePointerEvents={!typeClient}
                              >
                                <Box>
                                  <Box>
                                    <FormControlLabel
                                      label="Bluetree"
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
                                      label="Externo"
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
                        <div className="absolute ">
                          {typeClient ? (
                            <>
                              <span className="ml-[20px] text-red-500">
                                Recuerde aceptar o cancelar el cambio realizado
                              </span>
                            </>
                          ) : (
                            <></>
                          )}
                        </div>
                      </Box>

                      <TextField
                        className="zerorange:w-[200px]  lg:w-[400px] w-[350px]  mdmax:m-[20px] m-[20px] zerorange:m-[10px] "
                        label="Token"
                        type="text"
                        value={"Vacio"}
                        defaultValue="Vacio"
                        variant="filled"
                      />
                    </Box>
                  </Box>
                ) : (
                  //HACER LA HISTORIFICACION TERMINARLA ANTES DE LAS 4
                  <Box>
                    <Box className="Flex flex-col w-full h-full">
                      <Typography variant="h6" className="mb-4" color="primary">
                        Historificación
                      </Typography>
                    </Box>

                    {/* <Typography variant="h6" className="mb-4 ml-4">
                        Cambios realizados 
                    </Typography> */}

                    <Paper>
                      {/* Debo ingresar a la bd y consultar estos campos uwu */}
                      {/* PAPER PARA FIULTROS */}
                      {/* <TablaUltimosCambios
                        idParticipant={props.dataParticipant.id}
                      /> */}

                      <TablaHistorificacion
                        idParticipant={props.dataParticipant.id}
                      />
                    </Paper>
                  </Box>
                )}
              </Box>
            </Box>
          )}
        </Box>
      </Box>
      {/* SECCION BOTONES OCUPA TODO EL LARGO  */}
      <Box className=" flex justify-end w-full m-[20px]">
        {alertOk && (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert severity="success">
              Se actualizo la instrucción correctamente..
            </Alert>
          </Stack>
        )}
        {alertError && (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert severity="warning">
              Error!! debe modificar uno o más campos para guardar..
            </Alert>
          </Stack>
        )}
        <Button
          className="w-[100px]"
          variant="contained"
          color="secondary"
          // startIcon={<SearchIcon />}
          disabled={activeStep === 0}
          onClick={handleBack}
        >
          Atrás
        </Button>

        <Button
          className="w-[100px] ml-[10px] mr-[10px]"
          variant="contained"
          color="secondary"
          // startIcon={<SearchIcon />}
          onClick={handleNext}
        >
          Siguiente
        </Button>
        <Button
          disabled={activeButton}
          className="w-[100px] mr-[10px]"
          variant="contained"
          color="primary"
          // startIcon={<SearchIcon />}
          // disabled={activeStep === 0}
          onClick={handleClickOpen}
        >
          Guardar
        </Button>

        <Dialog
          open={open}
          onClose={handleCloseAlert}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"¿Estas seguro de guardar estos cambios?"}
          </DialogTitle>
          <DialogContent>
            <Box>{FetchDatas()}</Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAlert}>Cancelar</Button>
            <Button onClick={handleCloseAlertSubmit} autoFocus>
              Guardar
            </Button>
          </DialogActions>
        </Dialog>
        {/* {activeStep !== steps.length &&
          (completed[activeStep] ? (
            <Typography variant="caption" sx={{ display: "inline-block" }}>
              Confirmado
            </Typography>
          ) : (
            <Button onClick={handleComplete}>
              {completedSteps() === totalSteps() - 1
                ? "Finalizar"
                : "completar"}
            </Button>
          ))} */}
      </Box>
    </Box>
  );
}

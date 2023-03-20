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
    postalAddress: props.dataParticipant.commercial_address, //REVISAR
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
  });
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
        postalAddress: props.dataParticipant.commercial_address, //REVISAR
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
    })();
  }, [props.dataParticipant.id]);
  useEffect(() => {
    (async () => {
      banks = await CallBanks(1, 2);
    })();
  }, []);
  useEffect(() => {
    if (alertOk === true) {
      setTimeout(() => {
        setAlertOk(false);
      }, 5000);
    }
    if (alertError === true) {
      setTimeout(() => {
        setAlertError(false);
      }, 5000);
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
  } = update;
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
  const ApiPatch = () => {
    console.log(formState);
    const apiPatchParticipante =
      `http://164.77.112.10:99/api/Participantes?` +
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
      `Pay_contact_phones=${formState.payContactPhones}&` +
      `Pay_contact_email=${formState.payContactEmail}&` +
      `Bills_contact_first_name=${formState.billsContactFirstName}&` +
      `Bills_contact_last_name=${formState.billsContactLastName}&` +
      `Bills_contact_address=${formState.billsContactAddress}&` +
      `Bills_contact_phones=${formState.billsContactPhones}&` +
      `Bills_contact_email=${formState.billsContactEmail}`;
    const res = axios
      .patch(apiPatchParticipante)
      .then((response) => {
        setAlertOk(true);
      })
      .catch((error) => {
        setAlertError(true);
      });
    //
  };
  return (
    <Box className="w-full h-full">
      <Box className="flex w-full h-full" sx={{ width: "100%" }}>
        {/* SECCION VERTICAL IZQUIERDA */}
        <Box className="pr-[10px]  md:min-w-[300px] h-full">
          <Typography variant="h6" className="mb-4" color="primary">
            Gestión de Participantes
          </Typography>

          <Stepper
            className="ml-[30px] mt-[30px] "
            nonLinear
            activeStep={activeStep}
            orientation="vertical">
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
                }}>
                <StepButton
                  focusRipple
                  className="hover:bg-blue-50"
                  icon={handleIconStep(index)}
                  onClick={handleStep(index)}>
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

                    <Box className="flex flex-wrap justify-between zerorange:justify-center  ">
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
                                    onClick={() => {
                                      setUpdate({
                                        ...update,
                                        name: false,
                                      });
                                    }}
                                  />
                                  <DisabledByDefaultIcon
                                    onClick={() => {
                                      setFormState({
                                        ...formState,
                                        name: props.dataParticipant.name,
                                      });
                                      setUpdate({
                                        ...update,
                                        name: false,
                                      });
                                    }}
                                  />
                                </>
                              ) : (
                                <EditIcon
                                  onClick={() => {
                                    setUpdate({
                                      ...update,
                                      name: true,
                                    });
                                  }}
                                />
                              )}
                            </InputAdornment>
                          ),
                        }}
                        variant="filled"
                      />
                      <TextField
                        className="zerorange:w-[300px]  lg:w-[400px] w-[350px]  mdmax:m-[20px] m-[20px] zerorange:m-[10px] "
                        label="Nombre Comercial"
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
                                    onClick={() => {
                                      setUpdate({
                                        ...update,
                                        businessName: false,
                                      });
                                    }}
                                  />
                                  <DisabledByDefaultIcon
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
                                    }}
                                  />
                                </>
                              ) : (
                                <EditIcon
                                  onClick={() => {
                                    setUpdate({
                                      ...update,
                                      businessName: true,
                                    });
                                  }}
                                />
                              )}
                            </InputAdornment>
                          ),
                        }}
                        variant="filled"
                      />
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
                                    onClick={() => {
                                      setUpdate({
                                        ...update,
                                        commercialBusiness: false,
                                      });
                                    }}
                                  />
                                  <DisabledByDefaultIcon
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
                                    }}
                                  />
                                </>
                              ) : (
                                <EditIcon
                                  onClick={() => {
                                    setUpdate({
                                      ...update,
                                      commercialBusiness: true,
                                    });
                                  }}
                                />
                              )}
                            </InputAdornment>
                          ),
                        }}
                        variant="filled"
                      />
                      {/* <FormControl
                        variant="filled"
                        className="zerorange:w-[300px]  lg:w-[400px] w-[350px]  mdmax:m-[20px] m-[20px] zerorange:m-[10px] "
                      >
                        <InputLabel id="demo-simple-select-filled-label">
                          Grupo Coordinado
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-filled-label"
                          id="demo-simple-select-filled"
                          value={grupo}
                          onChange={handleChange}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          <MenuItem value={10}>Ten</MenuItem>
                          <MenuItem value={20}>Twenty</MenuItem>
                          <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                      </FormControl> */}
                      <TextField
                        className="zerorange:w-[300px]  lg:w-[400px] w-[350px]  mdmax:m-[20px] m-[20px] zerorange:m-[10px] "
                        label="Rut"
                        type="text"
                        defaultValue="Vacio"
                        onChange={onInputChange}
                        name="rut"
                        disabled={rut ? false : true}
                        value={formState.rut}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              {rut ? (
                                <>
                                  <CheckBoxIcon
                                    onClick={() => {
                                      setUpdate({
                                        ...update,
                                        rut: false,
                                      });
                                    }}
                                  />
                                  <DisabledByDefaultIcon
                                    onClick={() => {
                                      setFormState({
                                        ...formState,
                                        rut: props.dataParticipant.rut,
                                      });
                                      setUpdate({
                                        ...update,
                                        rut: false,
                                      });
                                    }}
                                  />
                                </>
                              ) : (
                                <EditIcon
                                  onClick={() => {
                                    setUpdate({
                                      ...update,
                                      rut: true,
                                    });
                                  }}
                                />
                              )}
                            </InputAdornment>
                          ),
                        }}
                        variant="filled"
                      />
                    </Box>
                  </Box>
                ) : activeStep === 1 ? (
                  <Box className="w-full">
                    <Typography variant="h6" className="mb-4" color="primary">
                      Datos de Contacto
                    </Typography>
                    <Box className="flex flex-wrap justify-between zerorange:justify-center ml-[0 auto]">
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
                                    onClick={() => {
                                      setUpdate({
                                        ...update,
                                        commercialAddress: false,
                                      });
                                    }}
                                  />
                                  <DisabledByDefaultIcon
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
                                    }}
                                  />
                                </>
                              ) : (
                                <EditIcon
                                  onClick={() => {
                                    setUpdate({
                                      ...update,
                                      commercialAddress: true,
                                    });
                                  }}
                                />
                              )}
                            </InputAdornment>
                          ),
                        }}
                        variant="filled"
                      />
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
                                    onClick={() => {
                                      setUpdate({
                                        ...update,
                                        email: false,
                                      });
                                    }}
                                  />
                                  <DisabledByDefaultIcon
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
                                    }}
                                  />
                                </>
                              ) : (
                                <EditIcon
                                  onClick={() => {
                                    setUpdate({
                                      ...update,
                                      email: true,
                                    });
                                  }}
                                />
                              )}
                            </InputAdornment>
                          ),
                        }}
                        variant="filled"
                      />
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
                    <Box className="flex flex-wrap justify-between zerorange:justify-center ml-[0 auto]">
                      {/* <TextField
                        className="zerorange:w-[250px]  lg:w-[400px] w-[300px]  mdmax:m-[20px] m-[20px] zerorange:m-[10px] "
                        label="Banco"
                        type="text"
                        value={dataBank.name}
                        defaultValue="Vacio"
                        variant="filled"
                      /> */}
                      <TextField
                        // disabled={banksName1 ? false : true}
                        id="standard-select-currency"
                        select
                        label="Banco"
                        value={formState.banksName}
                        onChange={handleChangee}
                        variant="standard"
                        name="banksName"
                        disabled={banksName ? false : true}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              {banksName ? (
                                <>
                                  <CheckBoxIcon
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
                                    }}
                                  />
                                  <DisabledByDefaultIcon
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
                                      setBankk(props.dataParticipant.banksName);
                                      setUpdate({
                                        ...update,
                                        banksName: false,
                                      });
                                    }}
                                  />
                                </>
                              ) : (
                                <EditIcon
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
                                      // console.log(formState);
                                    });
                                  }}
                                />
                              )}
                            </InputAdornment>
                          ),
                        }}
                        sx={{ marginRight: 5, width: 250 }}>
                        {banks.map((data) => (
                          <MenuItem key={data.id} value={data.name}>
                            {data.name}
                          </MenuItem>
                        ))}
                      </TextField>
                      <TextField
                        className="zerorange:w-[250px]  lg:w-[400px] w-[300px]  mdmax:m-[20px] m-[20px] zerorange:m-[10px] "
                        label="RUT Cuenta Corriente"
                        type="text"
                        value={formState.rut}
                        onChange={onInputChange}
                        variant="standard"
                        name="rut"
                        disabled={rut ? false : true}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              {rut ? (
                                <>
                                  <CheckBoxIcon
                                    onClick={() => {
                                      setUpdate({
                                        ...update,
                                        rut: false,
                                      });
                                    }}
                                  />
                                  <DisabledByDefaultIcon
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
                                    }}
                                  />
                                </>
                              ) : (
                                <EditIcon
                                  onClick={() => {
                                    setUpdate({
                                      ...update,
                                      rut: true,
                                    });
                                  }}
                                />
                              )}
                            </InputAdornment>
                          ),
                        }}
                        defaultValue="Vacio"
                        variant="filled"
                      />
                      <TextField
                        className="zerorange:w-[250px]  lg:w-[400px] w-[300px]  mdmax:m-[20px] m-[20px] zerorange:m-[10px] "
                        label="Cuenta Corriente"
                        type="text"
                        value={formState.bankAccount}
                        onChange={onInputChange}
                        variant="standard"
                        name="bankAccount"
                        disabled={bankAccount ? false : true}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              {bankAccount ? (
                                <>
                                  <CheckBoxIcon
                                    onClick={() => {
                                      setUpdate({
                                        ...update,
                                        bankAccount: false,
                                      });
                                    }}
                                  />
                                  <DisabledByDefaultIcon
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
                                    }}
                                  />
                                </>
                              ) : (
                                <EditIcon
                                  onClick={() => {
                                    setUpdate({
                                      ...update,
                                      bankAccount: true,
                                    });
                                  }}
                                />
                              )}
                            </InputAdornment>
                          ),
                        }}
                        defaultValue="Vacio"
                        defaultValue="Vacio"
                        variant="filled"
                      />
                    </Box>
                  </Box>
                ) : activeStep === 3 ? (
                  <Box className=" w-full h-full">
                    <Typography variant="h6" className="mb-4" color="primary">
                      Gestión Trígonos
                    </Typography>

                    <Box className="flex flex-wrap justify-between zerorange:justify-center ml-[0 auto]">
                      <TextField
                        className="zerorange:w-[200px]  lg:w-[400px] w-[350px]  mdmax:m-[20px] m-[20px] zerorange:m-[10px] "
                        label="Token"
                        type="text"
                        value={"Vacio"}
                        defaultValue="Vacio"
                        variant="filled"
                      />

                      {/* <FormControl
                        variant="filled"
                        className="zerorange:w-[200px]  lg:w-[400px] w-[350px]  mdmax:m-[20px] m-[20px] zerorange:m-[10px] "
                      >
                        <InputLabel id="demo-simple-select-filled-label">
                          ERP
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-filled-label"
                          id="demo-simple-select-filled"
                          value={erp}
                          onChange={handleChangeERP}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          <MenuItem value={10}>Ten</MenuItem>
                          <MenuItem value={20}>Twenty</MenuItem>
                          <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                      </FormControl> */}
                    </Box>
                  </Box>
                ) : (
                  //HACER LA HISTORIFICACION TERMINARLA ANTES DE LAS 4
                  <Box className="Flex flex-col w-full h-full">
                    <Typography variant="h6" className="mb-4" color="primary">
                      Historificación
                    </Typography>
                    {/* <Typography variant="h6" className="mb-4 ml-4">
                        Cambios realizados 
                    </Typography> */}

                    <Paper className=" w-auto w-[40%] md:mr-[20%] md:w-[70%] lg:w-[90%]  tvxl:w-auto">
                      {/* Debo ingresar a la bd y consultar estos campos uwu */}
                      {/* PAPER PARA FIULTROS */}
                      <TablaUltimosCambios
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
              Se actualizo la instruccion correctamente
            </Alert>
          </Stack>
        )}
        {alertError && (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert severity="warning">
              Error!! No se actualizo la instruccion
            </Alert>
          </Stack>
        )}
        <Button
          className="w-[100px]"
          variant="contained"
          color="secondary"
          // startIcon={<SearchIcon />}
          disabled={activeStep === 0}
          onClick={handleBack}>
          Atrás
        </Button>

        <Button
          className="w-[100px] ml-[10px] mr-[10px]"
          variant="contained"
          color="secondary"
          // startIcon={<SearchIcon />}
          onClick={handleNext}>
          Siguiente
        </Button>
        <Button
          className="w-[100px] mr-[10px]"
          variant="contained"
          color="primary"
          // startIcon={<SearchIcon />}
          // disabled={activeStep === 0}
          onClick={ApiPatch}>
          Guardar
        </Button>
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

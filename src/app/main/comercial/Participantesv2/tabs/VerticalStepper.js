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
import {
  useGetProyectoByIdMutation,
  usePatchPartcipantMutation,
  usePostActualizarProyectoMutation,
} from "app/store/participantesApi/participantesApi";
import {
  usePostFacturaAgregarMutation,
  useGetFacturaByIdMutation,
  usePostFacturaActualizarMutation,
} from "app/store/facturacionClApi/facturacionClApi";
import WarningIcon from "@mui/icons-material/Warning";
import CircularProgress from "@mui/material/CircularProgress";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
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
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [MsgAlert, setMsgAlert] = useState({
    msgResp: false,
    msgText: "",
    msgError: false,
  });
  const { msgResp, msgText, msgError } = MsgAlert;
 
  const [postActProyect, dataActProyect] = usePostActualizarProyectoMutation();
  const [postAddFactCl, dataAddFactCl] = usePostFacturaAgregarMutation();
  const [postActFactCl, dataActFactCl] = usePostFacturaActualizarMutation();
  const [patchActPart, dataActPart] = usePatchPartcipantMutation();
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const [activeLabel, setActiveLabel] = useState("");
  const [grupo, setGrupo] = useState("");

  const [bankk, setBankk] = useState("");
  const [checkPrueba, setCheckPrueba] = useState(false); //este proviene de una prop pHabilitado
  const [checkProduccion, setCheckProduccion] = useState(false); //este proviene de una prop pHabilitado
  //formStateProjects es para actualizar datos de la tabla de proyectos tiene su data confirm
  const [formStateFactCl, setformStateFactCl] = useState({
    fact_pHabilitado:
      props.fullData.dataFactCl !== {}
        ? props.fullData.dataFactCl.phabilitado
        : undefined,
    fact_userProduccion: props.fullData.dataFactCl.usuario64
      ? props.fullData.dataFactCl.usuario64
      : undefined,
    fact_claveProduccion: props.fullData.dataFactCl.clave64
      ? props.fullData.dataFactCl.clave64
      : undefined,
    fact_rutProduccion: props.fullData.dataFactCl.ruT64
      ? props.fullData.dataFactCl.ruT64
      : undefined,
    fact_userPruebas: props.fullData.dataFactCl.usuarioTest
      ? props.fullData.dataFactCl.usuarioTest
      : undefined,
    fact_clavePruebas: props.fullData.dataFactCl.claveTest
      ? props.fullData.dataFactCl.claveTest
      : undefined,
    fact_rutPruebas: props.fullData.dataFactCl.rutTest
      ? props.fullData.dataFactCl.rutTest
      : undefined,
  });
  const [dataconfirmFactCl, setDataconfirmFactCl] = useState({
    fact_pHabilitado:
      props.fullData.dataFactCl !== {}
        ? props.fullData.dataFactCl.phabilitado
        : undefined,
    fact_userProduccion: props.fullData.dataFactCl.usuario64
      ? props.fullData.dataFactCl.usuario64
      : undefined,
    fact_claveProduccion: props.fullData.dataFactCl.clave64
      ? props.fullData.dataFactCl.clave64
      : undefined,
    fact_rutProduccion: props.fullData.dataFactCl.ruT64
      ? props.fullData.dataFactCl.ruT64
      : undefined,
    fact_userPruebas: props.fullData.dataFactCl.usuarioTest
      ? props.fullData.dataFactCl.usuarioTest
      : undefined,
    fact_clavePruebas: props.fullData.dataFactCl.claveTest
      ? props.fullData.dataFactCl.claveTest
      : undefined,
    fact_rutPruebas: props.fullData.dataFactCl.rutTest
      ? props.fullData.dataFactCl.rutTest
      : undefined,
  });
  //formStateFactCl es para actualizar datos de la tabla de [REACT_TRGNS_FACTCLDATA]
  const [formStateProjects, setformStateProjects] = useState({
    erp: props.fullData.dataProject.erp,
    id_nomina_pago: props.fullData.dataProject.id_nomina_pago,
    isclient: props.fullData.dataProject.vHabilitado,
  });
  const [dataconfirmProjects, setDataconfirmProjects] = useState({
    erp: props.fullData.dataProject.erp,
    id_nomina_pago: props.fullData.dataProject.id_nomina_pago,
    isclient: props.fullData.dataProject.vHabilitado,
  });
  //formState es para actualizar datos de la tabla de participantes
  const [formState, setFormState] = useState({
    id: props.fullData.dataParticipant.id,
    name: props.fullData.dataParticipant.name,
    rut: props.fullData.dataParticipant.rut,
    verificationCode: props.fullData.dataParticipant.verification_Code,
    businessName: props.fullData.dataParticipant.business_Name,
    commercialBusiness: props.fullData.dataParticipant.commercial_Business,
    email: props.fullData.dataParticipant.dte_Reception_Email,
    bankAccount: props.fullData.dataParticipant.bank_Account,
    bank: props.fullData.dataParticipant.bank,
    banksName: props.fullData.dataParticipant.banksName,
    commercialAddress: props.fullData.dataParticipant.commercial_address,
    postalAddress: props.fullData.dataParticipant.postal_address, //REVISAR
    manager: props.fullData.dataParticipant.manager,
    payContactFirstName: props.fullData.dataParticipant.pay_Contact_First_Name,
    payContactLastName: props.fullData.dataParticipant.pay_contact_last_name,
    payContactAddress: props.fullData.dataParticipant.pay_contact_address,
    payContactPhones: props.fullData.dataParticipant.pay_contact_phones,
    payContactEmail: props.fullData.dataParticipant.pay_contact_email,
    billsContactLastName:
      props.fullData.dataParticipant.bills_contact_last_name,
    billsContactFirstName:
      props.fullData.dataParticipant.bills_contact_first_name,
    billsContactAddress: props.fullData.dataParticipant.bills_contact_address,
    billsContactPhones: props.fullData.dataParticipant.bills_contact_phones,
    billsContactEmail: props.fullData.dataParticipant.bills_contact_email,
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
    erp: false,
    id_nomina_pago: false,
    typeClient: false,
    facturacioncl: false,
    fact_pHabilitado: false, //esta variable luego debe provenir del
    fact_userProduccion: false,
    fact_claveProduccion: false,
    fact_rutProduccion: false,
    fact_userPruebas: false,
    fact_clavePruebas: false,
    fact_rutPruebas: false,
  });
  const [dataConfirm, setDataConfirm] = useState({
    id: props.fullData.dataParticipant.id,
    name: props.fullData.dataParticipant.name,
    rut: props.fullData.dataParticipant.rut,
    verificationCode: props.fullData.dataParticipant.verification_Code,
    businessName: props.fullData.dataParticipant.business_Name,
    commercialBusiness: props.fullData.dataParticipant.commercial_Business,
    email: props.fullData.dataParticipant.dte_Reception_Email,
    bankAccount: props.fullData.dataParticipant.bank_Account,
    bank: props.fullData.dataParticipant.bank,
    banksName: props.fullData.dataParticipant.banksName,
    commercialAddress: props.fullData.dataParticipant.commercial_address,
    postalAddress: props.fullData.dataParticipant.postal_address, //REVISAR
    manager: props.fullData.dataParticipant.manager,
    payContactFirstName: props.fullData.dataParticipant.pay_Contact_First_Name,
    payContactLastName: props.fullData.dataParticipant.pay_contact_last_name,
    payContactAddress: props.fullData.dataParticipant.pay_contact_address,
    payContactPhones: props.fullData.dataParticipant.pay_contact_phones,
    payContactEmail: props.fullData.dataParticipant.pay_contact_email,
    billsContactLastName:
      props.fullData.dataParticipant.bills_contact_last_name,
    billsContactFirstName:
      props.fullData.dataParticipant.bills_contact_first_name,
    billsContactAddress: props.fullData.dataParticipant.bills_contact_address,
    billsContactPhones: props.fullData.dataParticipant.bills_contact_phones,
    billsContactEmail: props.fullData.dataParticipant.bills_contact_email,
  });
  const [activeButton, setActiveButton] = useState(false);
  const [countActive, setCountActive] = useState(0);
  const [open, setOpen] = useState(false);

  const [checkedBlue, setCheckedBlue] = React.useState(false);
  const [checkedExt, setCheckedExt] = React.useState(false);
  const handleClickOpen = () => {
    //condiciones antes de enviar algo
    if((formStateProjects.erp === 5) &&  JSON.stringify(dataconfirmFactCl) === JSON.stringify(formStateFactCl)){
      
      setOpenDialog(true);
      setMsgAlert({
        msgResp: true,
        msgText: "Debe completar Facturación.CL",
        msgError: true,
      });
      setTimeout(() => {
        setMsgAlert({
          msgResp: undefined,
          msgText: "",
          msgError: undefined,
        });
        setOpenDialog(false);
      }, 1500);

    }else{
      setOpen(true);
    }

   
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
  const onInputChangeFact = ({ target }) => {
    const { name, value } = target;
    setformStateFactCl({
      ...formStateFactCl,
      [name]: value,
    });
  };
  function isOurClient(number) {
    if (number === 0) {
      setCheckedExt(true);
      setCheckedBlue(false);
    } else {
      setCheckedExt(false);
      setCheckedBlue(true);
    }
  }
  function haveFactCl(bool) {
    // console.log(bool)
    if (bool != undefined) {
      if (bool) {
        setCheckProduccion(true);
        setCheckPrueba(false);
      } else {
        setCheckProduccion(false);

        setCheckPrueba(true);
      }
    } else {
      setCheckProduccion(false);
      setCheckPrueba(false);
    }
  }

  useEffect(() => {
    (async () => {
      dataBank = await CallBanks(props.fullData.dataParticipant.bank);
      setBankk(dataBank.name);
      isOurClient(props.fullData.dataProject.vHabilitado);
      haveFactCl(props.fullData.dataFactCl.phabilitado);
      // console.log(props.fullData.dataFactCl.usuario64?props.fullData.dataFactCl.usuario64:"vacio" )
      setFormState({
        id: props.fullData.dataParticipant.id,
        name: props.fullData.dataParticipant.name,
        rut: props.fullData.dataParticipant.rut,
        verificationCode: props.fullData.dataParticipant.verification_Code,
        businessName: props.fullData.dataParticipant.business_Name,
        commercialBusiness: props.fullData.dataParticipant.commercial_Business,
        email: props.fullData.dataParticipant.dte_Reception_Email,
        bankAccount: props.fullData.dataParticipant.bank_Account,
        bank: props.fullData.dataParticipant.bank,
        banksName: props.fullData.dataParticipant.banksName,
        commercialAddress: props.fullData.dataParticipant.commercial_address,
        postalAddress: props.fullData.dataParticipant.postal_address, //REVISAR
        manager: props.fullData.dataParticipant.manager,
        payContactFirstName:
          props.fullData.dataParticipant.pay_Contact_First_Name,
        payContactLastName:
          props.fullData.dataParticipant.pay_contact_last_name,
        payContactAddress: props.fullData.dataParticipant.pay_contact_address,
        payContactPhones:
          props.fullData.dataParticipant.pay_contact_phones.replace(
            /["\[\]"]/g,
            ""
          ),
        payContactEmail: props.fullData.dataParticipant.pay_contact_email,
        billsContactLastName:
          props.fullData.dataParticipant.bills_contact_last_name,
        billsContactFirstName:
          props.fullData.dataParticipant.bills_contact_first_name,
        billsContactAddress:
          props.fullData.dataParticipant.bills_contact_address,
        billsContactPhones:
          props.fullData.dataParticipant.bills_contact_phones.replace(
            /["\[\]"]/g,
            ""
          ),
        billsContactEmail: props.fullData.dataParticipant.bills_contact_email,
      });
      setDataConfirm({
        id: props.fullData.dataParticipant.id,
        name: props.fullData.dataParticipant.name,
        rut: props.fullData.dataParticipant.rut,
        verificationCode: props.fullData.dataParticipant.verification_Code,
        businessName: props.fullData.dataParticipant.business_Name,
        commercialBusiness: props.fullData.dataParticipant.commercial_Business,
        email: props.fullData.dataParticipant.dte_Reception_Email,
        bankAccount: props.fullData.dataParticipant.bank_Account,
        bank: props.fullData.dataParticipant.bank,
        banksName: props.fullData.dataParticipant.banksName,
        commercialAddress: props.fullData.dataParticipant.commercial_address,
        postalAddress: props.fullData.dataParticipant.postal_address, //REVISAR
        manager: props.fullData.dataParticipant.manager,
        payContactFirstName:
          props.fullData.dataParticipant.pay_Contact_First_Name,
        payContactLastName:
          props.fullData.dataParticipant.pay_contact_last_name,
        payContactAddress: props.fullData.dataParticipant.pay_contact_address,
        payContactPhones:
          props.fullData.dataParticipant.pay_contact_phones.replace(
            /["\[\]"]/g,
            ""
          ),
        payContactEmail: props.fullData.dataParticipant.pay_contact_email,
        billsContactLastName:
          props.fullData.dataParticipant.bills_contact_last_name,
        billsContactFirstName:
          props.fullData.dataParticipant.bills_contact_first_name,
        billsContactAddress:
          props.fullData.dataParticipant.bills_contact_address,
        billsContactPhones:
          props.fullData.dataParticipant.bills_contact_phones.replace(
            /["\[\]"]/g,
            ""
          ),
        billsContactEmail: props.fullData.dataParticipant.bills_contact_email,
      });

      setformStateFactCl({
        fact_pHabilitado:
          props.fullData.dataFactCl !== {}
            ? props.fullData.dataFactCl.phabilitado
            : "Vacio",
        fact_userProduccion: props.fullData.dataFactCl.usuario64
          ? props.fullData.dataFactCl.usuario64
          : "Vacio",
        fact_claveProduccion: props.fullData.dataFactCl.clave64
          ? props.fullData.dataFactCl.clave64
          : "Vacio",
        fact_rutProduccion: props.fullData.dataFactCl.ruT64
          ? props.fullData.dataFactCl.ruT64
          : "Vacio",
        fact_userPruebas: props.fullData.dataFactCl.usuarioTest
          ? props.fullData.dataFactCl.usuarioTest
          : "Vacio",
        fact_clavePruebas: props.fullData.dataFactCl.claveTest
          ? props.fullData.dataFactCl.claveTest
          : "Vacio",
        fact_rutPruebas: props.fullData.dataFactCl.rutTest
          ? props.fullData.dataFactCl.rutTest
          : "Vacio",
      });
      setDataconfirmFactCl({
        fact_pHabilitado:
          props.fullData.dataFactCl !== {}
            ? props.fullData.dataFactCl.phabilitado
            : "Vacio",
        fact_userProduccion: props.fullData.dataFactCl.usuario64
          ? props.fullData.dataFactCl.usuario64
          : "Vacio",
        fact_claveProduccion: props.fullData.dataFactCl.clave64
          ? props.fullData.dataFactCl.clave64
          : "Vacio",
        fact_rutProduccion: props.fullData.dataFactCl.ruT64
          ? props.fullData.dataFactCl.ruT64
          : "Vacio",
        fact_userPruebas: props.fullData.dataFactCl.usuarioTest
          ? props.fullData.dataFactCl.usuarioTest
          : "Vacio",
        fact_clavePruebas: props.fullData.dataFactCl.claveTest
          ? props.fullData.dataFactCl.claveTest
          : "Vacio",
        fact_rutPruebas: props.fullData.dataFactCl.rutTest
          ? props.fullData.dataFactCl.rutTest
          : "Vacio",
      });

      setformStateProjects({
        erp: props.fullData.dataProject.erp,
        id_nomina_pago: props.fullData.dataProject.id_nomina_pago,
        isclient: props.fullData.dataProject.vHabilitado,
      });
      setDataconfirmProjects({
        erp: props.fullData.dataProject.erp,
        id_nomina_pago: props.fullData.dataProject.id_nomina_pago,
        isclient: props.fullData.dataProject.vHabilitado,
      });
    })();
  }, [props.fullData.dataParticipant.id, alertOk]);
  useEffect(() => {
    (async () => {
      banks = await CallBanks(1, 2);
    })();
    isOurClient(props.fullData.dataProject.vHabilitado);
    haveFactCl(props.fullData.dataFactCl.phabilitado);
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
    facturacioncl,
    fact_userProduccion,
    fact_claveProduccion,
    fact_rutProduccion,
    fact_userPruebas,
    fact_clavePruebas,
    fact_rutPruebas,
    erp,
    id_nomina_pago,
  } = update;
  const handleChangeCheck = (event) => {
    setChecked(event.target.checked);
  };
  const handleChangee = (event) => {
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
  };
  const handleChangeNomina = (event) => {
    setformStateProjects({
      ...formStateProjects,
      id_nomina_pago: event.target.value,
    });
  };
  const handleChangeERP = (event) => {
    setformStateProjects({
      ...formStateProjects,
      erp: event.target.value,
    });

    if (event.target.value != 5) {
      haveFactCl(props.fullData.dataFactCl.phabilitado);
      setUpdate({
        ...update,
        facturacioncl: false,
        fact_userProduccion: false,
        fact_claveProduccion: false,
        fact_rutProduccion: false,
        fact_userPruebas: false,
        fact_clavePruebas: false,
        fact_rutPruebas: false,
      });
      setformStateFactCl({
        ...formStateFactCl,
        fact_userProduccion: dataconfirmFactCl.fact_userProduccion,
        fact_claveProduccion: dataconfirmFactCl.fact_claveProduccion,
        fact_rutProduccion: dataconfirmFactCl.fact_rutProduccion,
        fact_userPruebas: dataconfirmFactCl.fact_userPruebas,
        fact_clavePruebas: dataconfirmFactCl.fact_clavePruebas,
        fact_rutPruebas: dataconfirmFactCl.fact_rutPruebas,
      });
    }
    // setErp(event.target.value);
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
    let isEqualdos =
      JSON.stringify(dataconfirmFactCl) === JSON.stringify(formStateFactCl);
    let isEqualtres =
      JSON.stringify(dataconfirmProjects) === JSON.stringify(formStateProjects);

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
      dataconfirmProjects.isclient === formStateProjects.isclient
        ? undefined
        : createData(
            "Tipo de Cliente",
            dataconfirmProjects.isclient === 0 ? "Externo" : "Bluetree",
            formStateProjects.isclient === 0 ? "Externo" : "Bluetree"
          ),
      dataconfirmProjects.erp === formStateProjects.erp
        ? undefined
        : createData(
            "Tipo de Facturador",
            props.facturadorErp.filter(
              (data) => data.id === dataconfirmProjects.erp
            )[0].nombreErp,
            props.facturadorErp.filter(
              (data) => data.id === formStateProjects.erp
            )[0].nombreErp
          ),
      dataconfirmProjects.id_nomina_pago === formStateProjects.id_nomina_pago
        ? undefined
        : createData(
            "Tipo de Nomina",
            props.nominaPago.filter(
              (data) => data.id === dataconfirmProjects.id_nomina_pago
            )[0].nombreBanco,
            props.nominaPago.filter(
              (data) => data.id === formStateProjects.id_nomina_pago
            )[0].nombreBanco
          ),
      dataconfirmFactCl.fact_userProduccion ===
      formStateFactCl.fact_userProduccion
        ? undefined
        : createData(
            "Usuario de Producción",
            dataconfirmFactCl.fact_userProduccion,
            formStateFactCl.fact_userProduccion
          ),
      dataconfirmFactCl.fact_rutProduccion ===
      formStateFactCl.fact_rutProduccion
        ? undefined
        : createData(
            "Rut de Producción",
            dataconfirmFactCl.fact_rutProduccion,
            formStateFactCl.fact_rutProduccion
          ),
      dataconfirmFactCl.fact_claveProduccion ===
      formStateFactCl.fact_claveProduccion
        ? undefined
        : createData(
            "Clave de Producción",
            dataconfirmFactCl.fact_claveProduccion,
            formStateFactCl.fact_claveProduccion
          ),
      dataconfirmFactCl.fact_userPruebas === formStateFactCl.fact_userPruebas
        ? undefined
        : createData(
            "Usuario de Pruebas",
            dataconfirmFactCl.fact_userPruebas,
            formStateFactCl.fact_userPruebas
          ),
      dataconfirmFactCl.fact_rutPruebas === formStateFactCl.fact_rutPruebas
        ? undefined
        : createData(
            "Rut de Pruebas",
            dataconfirmFactCl.fact_rutPruebas,
            formStateFactCl.fact_rutPruebas
          ),
      dataconfirmFactCl.fact_clavePruebas === formStateFactCl.fact_clavePruebas
        ? undefined
        : createData(
            "Clave de Pruebas",
            dataconfirmFactCl.fact_clavePruebas,
            formStateFactCl.fact_clavePruebas
          ),
    ];
    console.log(props.fullData.dataFactCl.phabilitado);
    rows = rows.filter((x) => x !== undefined);
    if (isEqual && isEqualdos && isEqualtres) {
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
 
  
  function verificarLista(list) {
    if(list.every((valor) => valor === false)) {
      return true;
    } else {
     
      return false;
      
      
    }
  }
  
  useEffect(() => {
    let ver = verificarLista([dataActFactCl.isLoading,dataActProyect.isLoading,dataActPart.isLoading])
    if(ver){
      setOpenDialog(false);
      setLoading(false);
    }

  }, [dataActFactCl.isLoading,dataActProyect.isLoading,dataActPart.isLoading])
  console.log(dataActProyect.isLoading)

  function SubmitActProject(isEqual){
    if (!isEqual) {
      postActProyect({
        id_participants: props.fullData.dataParticipant.id,
        erp:
          formStateProjects.erp != dataconfirmProjects.erp
            ? formStateProjects.erp
            : null,
        vHabilitado:
          formStateProjects.isclient != dataconfirmProjects.isclient
            ? formStateProjects.isclient
            : null,
        id_nomina_pago:
          formStateProjects.id_nomina_pago != dataconfirmProjects.id_nomina_pago
            ? formStateProjects.id_nomina_pago
            : null,
      }).then((response) => {
        
      });
    }else{
     
    }
  }
  function SubmitFactCl(isEqual){
    if (props.fullData.dataFactCl.phabilitado != undefined) {
      //ejecuta el post de actualizar
      

      if (!isEqual) {
        postActFactCl({
          idParticipante: props.fullData.dataParticipant.id,
          usuario64:
            formStateFactCl.fact_userProduccion.trim() !=
            dataconfirmFactCl.fact_userProduccion.trim()
              ? formStateFactCl.fact_userProduccion
              : null,
          ruT64:
            formStateFactCl.fact_rutProduccion.trim() !=
            dataconfirmFactCl.fact_rutProduccion.trim()
              ? formStateFactCl.fact_rutProduccion
              : null,
          clave64:
            formStateFactCl.fact_claveProduccion.trim() !=
            dataconfirmFactCl.fact_claveProduccion.trim()
              ? formStateFactCl.fact_claveProduccion
              : null,
          puerto64: null,
          incluyeLink64: null,
          usuarioTest:
            formStateFactCl.fact_userPruebas.trim() !=
            dataconfirmFactCl.fact_userPruebas.trim()
              ? formStateFactCl.fact_userPruebas
              : null,
          claveTest:
            formStateFactCl.fact_clavePruebas.trim() !=
            dataconfirmFactCl.fact_clavePruebas.trim()
              ? formStateFactCl.fact_clavePruebas
              : null,
          rutTest:
            formStateFactCl.fact_rutPruebas.trim() !=
            dataconfirmFactCl.fact_rutPruebas.trim()
              ? formStateFactCl.fact_rutPruebas
              : null,
          phabilitado:
            formStateFactCl.fact_pHabilitado !=
            dataconfirmFactCl.fact_pHabilitado
              ? formStateFactCl.fact_pHabilitado
              : dataconfirmFactCl.fact_pHabilitado,
        }).then((response) => {

         
        });;
      }
    } else {
      //ejecuta el post de agregar
      if (checkProduccion || checkPrueba) {
        if (!isEqual) {
          postAddFactCl({
            idParticipante: props.fullData.dataParticipant.id,
            usuario64:
              formStateFactCl.fact_userProduccion.trim() !=
              dataconfirmFactCl.fact_userProduccion.trim()
                ? formStateFactCl.fact_userProduccion
                : null,
            ruT64:
              formStateFactCl.fact_rutProduccion.trim() !=
              dataconfirmFactCl.fact_rutProduccion.trim()
                ? formStateFactCl.fact_rutProduccion
                : null,
            clave64:
              formStateFactCl.fact_claveProduccion.trim() !=
              dataconfirmFactCl.fact_claveProduccion.trim()
                ? formStateFactCl.fact_claveProduccion
                : null,
            puerto64: null,
            incluyeLink64: null,
            usuarioTest:
              formStateFactCl.fact_userPruebas.trim() !=
              dataconfirmFactCl.fact_userPruebas.trim()
                ? formStateFactCl.fact_userPruebas
                : null,
            claveTest:
              formStateFactCl.fact_clavePruebas.trim() !=
              dataconfirmFactCl.fact_clavePruebas.trim()
                ? formStateFactCl.fact_clavePruebas
                : null,
            rutTest:
              formStateFactCl.fact_rutPruebas.trim() !=
              dataconfirmFactCl.fact_rutPruebas.trim()
                ? formStateFactCl.fact_rutPruebas
                : null,
            phabilitado: formStateFactCl.fact_pHabilitado,
          }).then((response) => {

          });;
        }
      }
    }
  }
  function SubmitActParticipant(isEqual){
    if (isEqual) {
      // console.log("No se realiza envio a API");
     
    } else {
      let formatBillsContactPhones =
        '["' + formState.billsContactPhones.replace(/,/g, '","') + '"]';
      let formatpayContactPhones =
        '["' + formState.payContactPhones.replace(/,/g, '","') + '"]';

      patchActPart({
        id: formState.id,
        name:formState.name,
        rut:formState.rut,
        verificationCode:formState.verificationCode,
        businessName:formState.businessName,
        commercialBusiness:formState.commercialBusiness,
        email:formState.email,
        bankAccount:formState.bankAccount,
        bank:formState.bank,
        commercialAddress:formState.commercialAddress,
        postalAddress:formState.postalAddress,
        manager:formState.manager,
        payContactFirstName:formState.payContactFirstName,
        payContactLastName:formState.payContactLastName,
        payContactAddress:formState.payContactAddress,
        formatpayContactPhones:formatpayContactPhones,
        payContactEmail:formState.payContactEmail,
        billsContactFirstName:formState.billsContactFirstName,
        billsContactLastName:formState.billsContactLastName,
        billsContactAddress:formState.billsContactAddress,
        formatBillsContactPhones:formatBillsContactPhones,
        billsContactEmail:formState.billsContactEmail
      }).then((response)=>{

      }).catch((error)=>{

      })
      // const apiPatchParticipante =
      //   ` https://trigonosapi.azurewebsites.net/api/Participantes?` +
      //   `id=${formState.id}&` +
      //   `Name=${formState.name}&` +
      //   `Rut=${formState.rut}&` +
      //   `Verification_Code=${formState.verificationCode}&` +
      //   `Business_Name=${formState.businessName}&` +
      //   `Commercial_Business=${formState.commercialBusiness}&` +
      //   `Dte_Reception_Email=${formState.email}&` +
      //   `Bank_Account=${formState.bankAccount}&` +
      //   `bank=${formState.bank}&` +
      //   `Commercial_address=${formState.commercialAddress}&` +
      //   `Postal_address=${formState.postalAddress}&` +
      //   `Manager=${formState.manager}&` +
      //   `Pay_Contact_First_Name=${formState.payContactFirstName}&` +
      //   `Pay_contact_last_name=${formState.payContactLastName}&` +
      //   `Pay_contact_address=${formState.payContactAddress}&` +
      //   `Pay_contact_phones=${formatpayContactPhones}&` +
      //   `Pay_contact_email=${formState.payContactEmail}&` +
      //   `Bills_contact_first_name=${formState.billsContactFirstName}&` +
      //   `Bills_contact_last_name=${formState.billsContactLastName}&` +
      //   `Bills_contact_address=${formState.billsContactAddress}&` +
      //   `Bills_contact_phones=${formatBillsContactPhones}&` +
      //   `Bills_contact_email=${formState.billsContactEmail}`;
      // const res = axios
      //   .patch(apiPatchParticipante)
      //   .then((response) => {
          
      //   })
      //   .catch((error) => {
         
      //   });
    }
  }
  
  
  const ApiPatch = () => {
    let isEqual = JSON.stringify(dataConfirm) === JSON.stringify(formState);
    let isEqualdos = JSON.stringify(dataconfirmFactCl) === JSON.stringify(formStateFactCl);
    let isEqualtres = JSON.stringify(dataconfirmProjects) === JSON.stringify(formStateProjects);
    
    setOpenDialog(true);
    setLoading(true);
    SubmitActProject(isEqualtres);
    SubmitFactCl(isEqualdos);
    SubmitActParticipant(isEqual);

   
   
   
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
                                          name: props.fullData.dataParticipant
                                            .name,
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
                                            props.fullData.dataParticipant
                                              .business_Name,
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
                                            props.fullData.dataParticipant
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
                        //                 rut: props.fullData.dataParticipant.rut,
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
                                            props.fullData.dataParticipant
                                              .manager,
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
                                            props.fullData.dataParticipant
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
                                            props.fullData.dataParticipant
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
                                            props.fullData.dataParticipant.pay_contact_phones.replace(
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
                                            props.fullData.dataParticipant.bills_contact_phones.replace(
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
                                        //     props.fullData.dataParticipant.banksName,
                                        //   bank: props.fullData.dataParticipant.bank,
                                        // });
                                        // setBankk(props.fullData.dataParticipant.banksName);
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
                                        //     props.fullData.dataParticipant
                                        //       .dte_Reception_Email,
                                        // });
                                        setFormState({
                                          ...formState,
                                          banksName:
                                            props.fullData.dataParticipant
                                              .banksName,
                                          bank: props.fullData.dataParticipant
                                            .bank,
                                        });
                                        setBankk(
                                          props.fullData.dataParticipant
                                            .banksName
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
                                        //     props.fullData.dataParticipant
                                        //       .dte_Reception_Email,
                                        // });
                                        setFormState({
                                          ...formState,
                                          rut: props.fullData.dataParticipant
                                            .rut,
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
                                        //     props.fullData.dataParticipant
                                        //       .dte_Reception_Email,
                                        // });
                                        setFormState({
                                          ...formState,
                                          bankAccount:
                                            props.fullData.dataParticipant
                                              .bank_Account,
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
                    </Box>
                  </Box>
                ) : activeStep === 3 ? (
                  <Box className=" w-full h-full">
                    <Typography variant="h6" className="mb-4" color="primary">
                      Gestión Trígonos
                    </Typography>
                    {/* Tipo usuario */}
                    <Box className="flex flex-wrap">
                      <Box>
                        <Box className="flex flex-col  w-full p-[10px] ">
                          <Box className="flex flex-row">
                            <Typography
                              variant="subtitle1"
                              color="primary"
                              className=""
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
                                      setformStateProjects({
                                        ...formStateProjects,
                                        isclient: dataconfirmProjects.isclient,
                                      });
                                      isOurClient(dataconfirmProjects.isclient);
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
                            <div className=" ">
                              {typeClient ? (
                                <>
                                  <span className="ml-[20px] text-red-500">
                                    Recuerde aceptar o cancelar el cambio
                                    realizado
                                  </span>
                                </>
                              ) : (
                                <></>
                              )}
                            </div>
                          </Box>
                          <div
                            className={`relative flex justify-stretch w-full h-full pointer-events-${
                              typeClient ? "auto" : "none"
                            } select-${typeClient ? "auto" : "none"}`}
                          >
                            <Box className="flex flex-wrap  ml-[10px]">
                              <Box>
                                <Box>
                                  <FormControlLabel
                                    label="Bluetree"
                                    control={
                                      <Checkbox
                                        checked={checkedBlue}
                                        onClick={() => {
                                          setCheckedBlue(true);
                                          setCheckedExt(false);
                                          setformStateProjects({
                                            ...formStateProjects,
                                            isclient: 1,
                                          });
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
                                        onClick={() => {
                                          setCheckedExt(true);
                                          setCheckedBlue(false);
                                          setformStateProjects({
                                            ...formStateProjects,
                                            isclient: 0,
                                          });
                                        }}
                                      />
                                    }
                                  />
                                </Box>
                              </Box>
                              <TextField
                                className="zerorange:w-[200px]  lg:w-[400px] w-[350px]  mdmax:m-[20px] m-[20px] zerorange:m-[10px] "
                                label="Token"
                                type="text"
                                value={"Vacio"}
                                variant="filled"
                              />
                            </Box>

                            {!typeClient ? (
                              <div className="absolute inset-0 bg-[#f0f0f0] opacity-50 rounded-lg  "></div>
                            ) : (
                              <></>
                            )}
                          </div>
                        </Box>
                        {/* Facturación cl */}

                        <Box className="flex flex-col  w-full p-[10px]   ">
                          <Box className="flex flex-row">
                            <Typography
                              variant="subtitle1"
                              color="primary"
                              className=""
                            >
                              Facturación.CL
                            </Typography>

                            {formStateProjects.erp === 5 && erp === false ? (
                              <>
                                <InputAdornment className="m-[10px]">
                                  {facturacioncl ? (
                                    <>
                                      <CheckBoxIcon
                                        style={{ cursor: "pointer" }}
                                        onClick={() => {
                                          setUpdate({
                                            ...update,
                                            facturacioncl: false,
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
                                            facturacioncl: false,
                                            fact_userProduccion: false,
                                            fact_claveProduccion: false,
                                            fact_rutProduccion: false,
                                            fact_userPruebas: false,
                                            fact_clavePruebas: false,
                                            fact_rutPruebas: false,
                                          });
                                          setformStateFactCl({
                                            ...formStateFactCl,
                                            fact_userProduccion:
                                              dataconfirmFactCl.fact_userProduccion,
                                            fact_claveProduccion:
                                              dataconfirmFactCl.fact_claveProduccion,
                                            fact_rutProduccion:
                                              dataconfirmFactCl.fact_rutProduccion,
                                            fact_userPruebas:
                                              dataconfirmFactCl.fact_userPruebas,
                                            fact_clavePruebas:
                                              dataconfirmFactCl.fact_clavePruebas,
                                            fact_rutPruebas:
                                              dataconfirmFactCl.fact_rutPruebas,
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
                                          facturacioncl: true,
                                        });
                                        setCountActive(countActive + 1);
                                      }}
                                    />
                                  )}
                                </InputAdornment>
                                <div className=" ">
                                  {facturacioncl ? (
                                    <>
                                      <span className="ml-[20px] text-red-500">
                                        Recuerde aceptar o cancelar el cambio
                                        realizado
                                      </span>
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                </div>
                              </>
                            ) : (
                              <></>
                            )}
                          </Box>
                          <div
                            className={`relative flex justify-stretch w-full h-full pointer-events-${
                              facturacioncl ? "auto" : "none"
                            } select-${facturacioncl ? "auto" : "none"}`}
                          >
                            <Box className="flex flex-col w-full h-full p-[10px]  ">
                              <Typography
                                variant="subtitle1"
                                color="primary"
                                className="flex justify-center w-ful"
                              >
                                Producción
                              </Typography>
                              <div className="flex justify-center w-full ">
                                <Checkbox
                                  checked={checkProduccion}
                                  // onChange={(event) => {

                                  // }}
                                  onClick={() => {
                                    setCheckProduccion(true);
                                    setCheckPrueba(false);
                                    setformStateFactCl({
                                      ...formStateFactCl,
                                      fact_pHabilitado: true,
                                    });
                                  }}
                                />
                              </div>
                              <TextField
                                className="w-full mb-[10px]"
                                label="Usuario de Producción"
                                type="text"
                                value={formStateFactCl.fact_userProduccion}
                                onChange={onInputChangeFact}
                                name="fact_userProduccion"
                                disabled={fact_userProduccion ? false : true}
                                InputProps={{
                                  defaultValue:
                                    formStateFactCl.fact_userProduccion,
                                  startAdornment: checkProduccion ? (
                                    <InputAdornment position="start">
                                      {fact_userProduccion ? (
                                        <>
                                          <CheckBoxIcon
                                            style={{ cursor: "pointer" }}
                                            onClick={() => {
                                              setUpdate({
                                                ...update,
                                                fact_userProduccion: false,
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
                                              setformStateFactCl({
                                                ...formStateFactCl,
                                                fact_userProduccion:
                                                  dataconfirmFactCl.fact_userProduccion,
                                              });
                                              setUpdate({
                                                ...update,
                                                fact_userProduccion: false,
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
                                              fact_userProduccion: true,
                                            });
                                            setCountActive(countActive + 1);
                                          }}
                                        />
                                      )}
                                    </InputAdornment>
                                  ) : (
                                    <></>
                                  ),
                                }}
                                defaultValue="Vacio"
                                variant="filled"
                              />
                              <TextField
                                className="w-full mb-[10px]"
                                label="Clave de Producción"
                                type="text"
                                value={formStateFactCl.fact_claveProduccion}
                                onChange={onInputChangeFact}
                                name="fact_claveProduccion"
                                disabled={fact_claveProduccion ? false : true}
                                InputProps={{
                                  defaultValue:
                                    formStateFactCl.fact_claveProduccion,
                                  startAdornment: checkProduccion ? (
                                    <InputAdornment position="start">
                                      {fact_claveProduccion ? (
                                        <>
                                          <CheckBoxIcon
                                            style={{ cursor: "pointer" }}
                                            onClick={() => {
                                              setUpdate({
                                                ...update,
                                                fact_claveProduccion: false,
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
                                              setformStateFactCl({
                                                ...formStateFactCl,
                                                fact_claveProduccion:
                                                  dataconfirmFactCl.fact_claveProduccion,
                                              });
                                              setUpdate({
                                                ...update,
                                                fact_claveProduccion: false,
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
                                              fact_claveProduccion: true,
                                            });
                                            setCountActive(countActive + 1);
                                          }}
                                        />
                                      )}
                                    </InputAdornment>
                                  ) : (
                                    <></>
                                  ),
                                }}
                                defaultValue="Vacio"
                                variant="filled"
                              />
                              <TextField
                                className="w-full"
                                label="Rut de Producción"
                                type="text"
                                value={formStateFactCl.fact_rutProduccion}
                                onChange={onInputChangeFact}
                                name="fact_rutProduccion"
                                disabled={fact_rutProduccion ? false : true}
                                InputProps={{
                                  defaultValue:
                                    formStateFactCl.fact_rutProduccion,
                                  startAdornment: checkProduccion ? (
                                    <InputAdornment position="start">
                                      {fact_rutProduccion ? (
                                        <>
                                          <CheckBoxIcon
                                            style={{ cursor: "pointer" }}
                                            onClick={() => {
                                              setUpdate({
                                                ...update,
                                                fact_rutProduccion: false,
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
                                              setformStateFactCl({
                                                ...formStateFactCl,
                                                fact_rutProduccion:
                                                  dataconfirmFactCl.fact_rutProduccion,
                                              });
                                              setUpdate({
                                                ...update,
                                                fact_rutProduccion: false,
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
                                              fact_rutProduccion: true,
                                            });
                                            setCountActive(countActive + 1);
                                          }}
                                        />
                                      )}
                                    </InputAdornment>
                                  ) : (
                                    <></>
                                  ),
                                }}
                                variant="filled"
                              />
                            </Box>

                            <Box className="flex flex-col w-full h-full  p-[10px] ">
                              <Typography
                                variant="subtitle1"
                                color="primary"
                                className="flex justify-center w-ful"
                              >
                                Testing
                              </Typography>
                              <div className="flex justify-center w-full">
                                <Checkbox
                                  checked={checkPrueba}
                                  // onChange={(event) => {
                                  //   setCheckPrueba(true);
                                  //   setCheckProduccion(false);
                                  // }}
                                  onClick={() => {
                                    setCheckPrueba(true);
                                    setCheckProduccion(false);
                                    setformStateFactCl({
                                      ...formStateFactCl,
                                      fact_pHabilitado: false,
                                    });
                                  }}
                                />
                              </div>
                              <TextField
                                className="w-full mb-[10px] "
                                label="Usuario de Pruebas"
                                type="text"
                                value={formStateFactCl.fact_userPruebas}
                                onChange={onInputChangeFact}
                                name="fact_userPruebas"
                                disabled={fact_userPruebas ? false : true}
                                InputProps={{
                                  defaultValue:
                                    formStateFactCl.fact_userPruebas,
                                  startAdornment: checkPrueba ? (
                                    <InputAdornment position="start">
                                      {fact_userPruebas ? (
                                        <>
                                          <CheckBoxIcon
                                            style={{ cursor: "pointer" }}
                                            onClick={() => {
                                              setUpdate({
                                                ...update,
                                                fact_userPruebas: false,
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
                                              setformStateFactCl({
                                                ...formStateFactCl,
                                                fact_userPruebas:
                                                  dataconfirmFactCl.fact_userPruebas,
                                              });
                                              setUpdate({
                                                ...update,
                                                fact_userPruebas: false,
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
                                              fact_userPruebas: true,
                                            });
                                            setCountActive(countActive + 1);
                                          }}
                                        />
                                      )}
                                    </InputAdornment>
                                  ) : (
                                    <></>
                                  ),
                                }}
                                defaultValue="Vacio"
                                variant="filled"
                              />
                              <TextField
                                className="w-full mb-[10px] "
                                label="Clave de Pruebas"
                                type="text"
                                value={formStateFactCl.fact_clavePruebas}
                                onChange={onInputChangeFact}
                                name="fact_clavePruebas"
                                disabled={fact_clavePruebas ? false : true}
                                InputProps={{
                                  defaultValue:
                                    formStateFactCl.fact_clavePruebas,
                                  startAdornment: checkPrueba ? (
                                    <InputAdornment position="start">
                                      {fact_clavePruebas ? (
                                        <>
                                          <CheckBoxIcon
                                            style={{ cursor: "pointer" }}
                                            onClick={() => {
                                              setUpdate({
                                                ...update,
                                                fact_clavePruebas: false,
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
                                              setformStateFactCl({
                                                ...formStateFactCl,
                                                fact_clavePruebas:
                                                  dataconfirmFactCl.fact_clavePruebas,
                                              });
                                              setUpdate({
                                                ...update,
                                                fact_clavePruebas: false,
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
                                              fact_clavePruebas: true,
                                            });
                                            setCountActive(countActive + 1);
                                          }}
                                        />
                                      )}
                                    </InputAdornment>
                                  ) : (
                                    <></>
                                  ),
                                }}
                                variant="filled"
                              />
                              <TextField
                                className="w-full "
                                label="Rut de Pruebas"
                                type="text"
                                value={formStateFactCl.fact_rutPruebas}
                                onChange={onInputChangeFact}
                                name="fact_rutPruebas"
                                disabled={fact_rutPruebas ? false : true}
                                InputProps={{
                                  defaultValue: formStateFactCl.fact_rutPruebas,
                                  startAdornment: checkPrueba ? (
                                    <InputAdornment position="start">
                                      {fact_rutPruebas ? (
                                        <>
                                          <CheckBoxIcon
                                            style={{ cursor: "pointer" }}
                                            onClick={() => {
                                              setUpdate({
                                                ...update,
                                                fact_rutPruebas: false,
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
                                              setformStateFactCl({
                                                ...formStateFactCl,
                                                fact_rutPruebas:
                                                  dataconfirmFactCl.fact_rutPruebas,
                                              });
                                              setUpdate({
                                                ...update,
                                                fact_rutPruebas: false,
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
                                              fact_rutPruebas: true,
                                            });
                                            setCountActive(countActive + 1);
                                          }}
                                        />
                                      )}
                                    </InputAdornment>
                                  ) : (
                                    <></>
                                  ),
                                }}
                                variant="filled"
                              />
                            </Box>

                            {!facturacioncl ? (
                              <div className="absolute inset-0 bg-[#f0f0f0] opacity-50 rounded-lg  "></div>
                            ) : (
                              <></>
                            )}
                          </div>
                        </Box>
                      </Box>
                      <Box>
                        <Box className="flex flex-col  w-full p-[10px]  ">
                          <div
                            className={`relative flex justify-stretch w-full h-full `}
                          >
                            {/* pointer-events-${facturacioncl?"auto":"none"} select-${facturacioncl?"auto":"none"} */}

                            <Box className="flex flex-col w-full h-full mr-[10px]">
                              <Typography
                                variant="subtitle1"
                                color="primary"
                                // className="flex justify-center w-ful"
                              >
                                Facturador ERP
                              </Typography>
                              <TextField
                                // disabled={banksName1 ? false : true}
                                className="min-w-[250px]"
                                id="standard-select-currency"
                                select
                                label="Facturador"
                                value={formStateProjects.erp}
                                onChange={handleChangeERP}
                                variant="filled"
                                name="erp"
                                disabled={erp ? false : true}
                                InputProps={{
                                  startAdornment:!facturacioncl?(
                                 
                                    <InputAdornment position="start">
                                      {erp ? (
                                        <>
                                          <CheckBoxIcon
                                            style={{ cursor: "pointer" }}
                                            onClick={() => {
                                              setUpdate({
                                                ...update,
                                                erp: false,
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
                                              setformStateProjects({
                                                ...formStateProjects,
                                                erp: props.fullData.dataProject
                                                  .erp,
                                              });

                                              setUpdate({
                                                ...update,
                                                erp: false,
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
                                              erp: true,
                                            });
                                            setCountActive(countActive + 1);
                                          }}
                                        />
                                      )}
                                    </InputAdornment>
                                  ):(<></>),
                                }}
                              >
                                {props.facturadorErp.map((data) => (
                                  <MenuItem key={data.id} value={data.id}>
                                    {data.nombreErp}
                                  </MenuItem>
                                ))}
                              </TextField>
                            </Box>

                            <Box className="flex flex-col w-full h-full">
                              <Typography
                                variant="subtitle1"
                                color="primary"
                                // className="flex justify-center w-ful"
                              >
                                Nomina de Pago
                              </Typography>

                              <TextField
                                // disabled={banksName1 ? false : true}
                                className="min-w-[250px]"
                                id="standard-select-currency"
                                select
                                label="Nomina de Pago"
                                value={formStateProjects.id_nomina_pago}
                                onChange={handleChangeNomina}
                                variant="filled"
                                name="nominaPago"
                                disabled={id_nomina_pago ? false : true}
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      {id_nomina_pago ? (
                                        <>
                                          <CheckBoxIcon
                                            style={{ cursor: "pointer" }}
                                            onClick={() => {
                                              setUpdate({
                                                ...update,
                                                id_nomina_pago: false,
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
                                              setformStateProjects({
                                                ...formStateProjects,
                                                id_nomina_pago:
                                                  props.fullData.dataProject
                                                    .id_nomina_pago,
                                              });

                                              setUpdate({
                                                ...update,
                                                id_nomina_pago: false,
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
                                              id_nomina_pago: true,
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
                                {props.nominaPago.map((data) => (
                                  <MenuItem key={data.id} value={data.id}>
                                    {data.nombreBanco}
                                  </MenuItem>
                                ))}
                              </TextField>
                            </Box>

                            {/* {!facturacioncl ? ( <div className="absolute inset-0 bg-[#f0f0f0] opacity-50 rounded-lg  ">
                            </div>):<></>} */}
                          </div>
                        </Box>
                      </Box>
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
                        idParticipant={props.fullData.dataParticipant.id}
                      /> */}

                      <TablaHistorificacion
                        idParticipant={props.fullData.dataParticipant.id}
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
          <Dialog
     
     open={openDialog}
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
      </Box>
    </Box>
  );
}

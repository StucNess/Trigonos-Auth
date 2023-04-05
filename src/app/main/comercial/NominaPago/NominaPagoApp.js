import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import withReducer from "app/store/withReducer";
import FusePageSimple from "@fuse/core/FusePageSimple";
import NominaPagoAppHeader from "./NominaPagoAppHeader";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import { motion } from "framer-motion";
import axios from "axios";
import SortingSelectingTable from "./tabs/SortingSelectingTable";
import SelectClient from "./tabs/SelectClient";
import UploadFile from "./tabs/UploadFile";
import ErrorOutlinedIcon from "@mui/icons-material/ErrorOutlined";
import TablaNominaBCI from "./tabs/widgets/TablaNominaBCI";
import TablaNominaSantander from "./tabs/widgets/TablaNominaSantander";
import TablaNominaSecurity from "./tabs/widgets/TablaNominaSecurity";

const Root = styled(FusePageSimple)(({ theme }) => ({
  "& .FusePageSimple-header": {
    backgroundColor: theme.palette.background.paper,
    boxShadow: `inset 0 0 0 1px  ${theme.palette.divider}`,
  },
}));
let changeDisc;
let ldata;
const NominaPagoApp = () => {
  let tablaSelect = 1;

  const [clientData, setClienteData] = useState([]);
  const [payRollData, setPayRollData] = useState([]);
  const [disc, setDisc] = useState(false);
  // useEffect(() => {
  // }, []);
  const getClientData = (data) => {
    setClienteData(data);
    callApiPayroll(data.id);
    ldata = data;
  };
  const getDiscData = (data) => {
    setDisc(data);

    getClientData(ldata);
  };
  const callApiPayroll = (id, pageSize = 100) => {
    let prueba;
    if (disc == false) {
      axios
        .get(
          `http://164.77.112.10:99/api/Nominas?id=${id}&PageSize=${pageSize}`
        )
        .then((response) => {
          setPayRollData(response.data.data);
        });
    } else {
      axios
        .get(
          `http://164.77.112.10:99/api/Nominas?id=${id}&PageSize=${pageSize}&Disc=si`
        )
        .then((response) => {
          setPayRollData(response.data.data);
        });
    }
  };
  const getChangeDisc = (param) => {
    changeDisc = param;

    disc ? setDisc(false) : setDisc(true);
  };
  return (
    <Root
      // header={<NominaPagoAppHeader />}
      content={
        <div className="w-full">
          <motion.div
            className="grid auto-cols-auto smmax:grid-cols-2 sm:grid-cols-12 gap-2 w-full min-w-0 p-20 "
            initial="hidden"
            animate="show"
          >
            <motion.div className="  col-span-12 mb-[20px]">
              <Box className="  bg-white rounded-sm p-[10px] ">
                <h1 className="ml-[5px]">Nominas de Pago &#40;Deudor&#41;</h1>
                <h1 className="border border-b-pantoneazul"></h1>
                <Box className="flex flex-auto bg-white rounded-sm bg-grey-300 m-[10px] p-[10px]">
                  <div>
                    <ErrorOutlinedIcon className="text-pantonerojo mr-[20px]" />
                  </div>
                  <div>
                    <span className="text-grey-700">
                      Selecciona tu <b>Cliente</b>, descarga y edita los datos
                      de las <b>Fechas de Pago</b>
                    </span>
                  </div>
                </Box>
              </Box>
            </motion.div>
            <motion.div className=" mdmax:col-span-12  md:col-span-6">
              <SelectClient
                sendClientData={getClientData}
                disc={disc}
                changeDisc={getChangeDisc}
              />
            </motion.div>

            <motion.div className=" mdmax:col-span-12  md:col-span-6">
              {/*
            Cargar la diversificacion de las tablas aca
            */}
              <UploadFile />

              {/*
            HAY QUE DIFERENCIAR CUAL TABLA LE PERTENECE AL CLIENTE
            */}
            </motion.div>

            {clientData.bank == 4 && (
              <motion.div className="  col-span-12 ">
                <TablaNominaBCI
                  payRollData={payRollData}
                  sendDiscData={getDiscData}
                  changedDisc={changeDisc}
                />
              </motion.div>
            )}
            {clientData.bank == 9 && (
              <motion.div className="  col-span-12 ">
                <TablaNominaSecurity payRollData={payRollData} />
              </motion.div>
            )}
            {clientData.bank == 7 && (
              <motion.div className="  col-span-12 ">
                <TablaNominaSantander payRollData={payRollData} />
              </motion.div>
            )}
          </motion.div>
        </div>
      }
      scroll="content"
    />
  );
};

export default NominaPagoApp;

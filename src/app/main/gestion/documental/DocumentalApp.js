import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { styled, useTheme } from "@mui/material/styles";
import FusePageSimple from "@fuse/core/FusePageSimple";
import { Box, Tab, Tabs } from "@mui/material";
import {
  createTheme,
  ThemeProvider,
  responsiveFontSizes,
} from "@mui/material/styles";
import { esES } from "@mui/material/locale";
import { useState } from "react";
import { useGetParticipantesByIdMutation } from "app/store/participantesApi/participantesApi";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "app/store/userSlice";
import {
  useGetParticipantesById_Query,
  useGetExcelById_Query,
} from "app/store/participantesApi/participantesApi";
import { useEffect } from "react";
import Acreedor from "./tabs/Acreedor";
import Deudor from "./tabs/Deudor";
import Facturacion from "./tabs/Facturacion";
import NominaPago from "./tabs/NominaPago";

let theme = createTheme(esES);

theme = responsiveFontSizes(theme);
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

function DocumentalApp(props) {
  const [tabValue, setTabValue] = useState(0);
  const user = useSelector(selectUser);
  const [client, setClient] = useState({ id: 141 });
  const { data: getData, isFetching: fetching } = useGetParticipantesById_Query(
    user.idUser
  );
  const { data: getDataExcels, isFetching: fetchingExcels } =
    useGetExcelById_Query(client.id);

  useEffect(() => {
    if (getData != undefined) {
      setClient(getData.data[0]);
    }
  }, [fetching]);

  function handleChangeTab(event, value) {
    setTabValue(value);
  }
  console.log(client);
  return fetching || fetchingExcels ? (
    <Paper className="w-full p-[20px] mb-[20px]">
      <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
        <LinearProgress color="primary" />
      </Stack>
    </Paper>
  ) : (
    <Root
      header={
        <div className="w-full">
          <Autocomplete
            id="size-small-filled"
            size="small"
            className="w-1/4 pl-[20px] pt-[10px]"
            disablePortal
            options={getData.data}
            value={client || getData.data[0]}
            onChange={(event, newValue) =>
              newValue != undefined && setClient(newValue)
            }
            getOptionLabel={(option) => option.business_Name}
            renderInput={(params) => (
              <TextField {...params} variant="filled" label="Clientes" />
            )}
          />
        </div>
      }
      content={
        <div className="w-full  pt-16 sm:pt-24 lg:pt-24 md:pt-24 lg:ltr:pr-0 lg:rtl:pl-0">
          <Tabs
            value={tabValue}
            onChange={handleChangeTab}
            indicatorColor="secondary"
            textColor="inherit"
            variant="scrollable"
            scrollButtons={false}
            className="w-full px-24 -mx-4 min-h-40"
            classes={{
              indicator: "flex justify-center bg-transparent w-full h-full",
            }}
            TabIndicatorProps={{
              children: (
                <Box
                  sx={{ bgcolor: "text.disabled" }}
                  className="w-full h-full rounded-full opacity-20"
                />
              ),
            }}
          >
            <Tab
              className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12"
              disableRipple
              label="Acreedor"
            />
            <Tab
              className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12"
              disableRipple
              label="Deudor"
            />
            <Tab
              className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12"
              disableRipple
              label="Facturación"
            />
            <Tab
              className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12"
              disableRipple
              label="Nominas de pago"
            />
          </Tabs>
          {tabValue === 0 && (
            <Acreedor
              dataExcel={getDataExcels}
              fetchingExcels={fetchingExcels}
            />
          )}
          {tabValue === 1 && (
            <Deudor dataExcel={getDataExcels} fetchingExcels={fetchingExcels} />
          )}
          {tabValue === 2 && (
            <Facturacion
              dataExcel={getDataExcels}
              fetchingExcels={fetchingExcels}
              idParticipant={client.id}
            />
          )}
          {tabValue === 3 && (
            <NominaPago
              dataExcel={getDataExcels}
              fetchingExcels={fetchingExcels}
            />
          )}
        </div>
      }
      scroll="content"
    />
  );
}
export default DocumentalApp;

import "@mock-api";
import BrowserRouter from "@fuse/core/BrowserRouter";
import FuseLayout from "@fuse/core/FuseLayout";
import FuseTheme from "@fuse/core/FuseTheme";
import { SnackbarProvider } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import rtlPlugin from "stylis-plugin-rtl";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { selectCurrentLanguageDirection } from "app/store/i18nSlice";
import { selectUser } from "app/store/userSlice";
import themeLayouts from "app/theme-layouts/themeLayouts";
import { selectMainTheme } from "app/store/fuse/settingsSlice";
import FuseAuthorization from "@fuse/core/FuseAuthorization";
import settingsConfig from "app/configs/settingsConfig";
// import withAppProviders from "./withAppProviders";
import { AuthProvider } from "./auth/AuthContext";
import { getRole } from "./store/Role";

import Provider from "react-redux/es/components/Provider";
import axios from "axios";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StyledEngineProvider } from "@mui/material/styles";
import routes from "./configs/routesConfig";
import store from "./store";
import AppContext from "./AppContext";

import React, { createContext, useEffect, useState, useContext } from 'react';
// import App from './App';



const emotionCacheOptions = {
    rtl: {
      key: "muirtl",
      stylisPlugins: [rtlPlugin],
      insertionPoint: document.getElementById("emotion-insertion-point"),
    },
    ltr: {
      key: "muiltr",
      stylisPlugins: [],
      insertionPoint: document.getElementById("emotion-insertion-point"),
    },
  };
// Crear el contexto
export const AppContextRoutes = createContext();

// Componente que contiene el Provider
const AppContextProvider = ({ children }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Función asincrónica para obtener los datos
    const fetchData = async () => {
      try {
        const response = await fetch('https://trigonosapi.azurewebsites.net/api/Rol/listarRolPagina');
        const result = await response.json();
        setData(result);
        console.log(result)
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <AppContextRoutes.Provider value={data}>
      
       <AppContext.Provider value={{ routes }}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Provider store={store}>
          <StyledEngineProvider injectFirst>
           { children}
          </StyledEngineProvider>
        </Provider>
      </LocalizationProvider>
    </AppContext.Provider>

    </AppContextRoutes.Provider>
  );
};

// Uso del contexto en un componente hijo directo del Provider
const ChildComponent = () => {
  const data = useContext(AppContextRoutes);

  // Renderizar el componente utilizando los datos del contexto
  return (
    <div>
      <h1>{data}</h1>
    </div>
  );
};

// En el componente raíz de la aplicación, envolver los componentes con el Provider
const AppAsync = () => {
  const data = useContext(AppContextRoutes);
  return (
    <AppContextProvider>
      <App />
    </AppContextProvider>
  );
};



const App = () => {
    const dispatch = useDispatch();
    // useEffect(()=>{
  
    // },[])
    const user = useSelector(selectUser);
    const langDirection = useSelector(selectCurrentLanguageDirection);
    const mainTheme = useSelector(selectMainTheme);
  
    const { isloading, role } = useSelector((state) => state.fuse.roleSlice);
  
    useEffect(() => {
      dispatch(getRole());
    }, []);
  
    return (
      <CacheProvider value={createCache(emotionCacheOptions[langDirection])}>
        <FuseTheme theme={mainTheme} direction={langDirection}>
          <AuthProvider>
            <BrowserRouter>
              <FuseAuthorization
                userRole={user.role}
                loginRedirectUrl={settingsConfig.loginRedirectUrl}
              >
                <SnackbarProvider
                  maxSnack={5}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  classes={{
                    containerRoot:
                      "bottom-0 right-0 mb-52 md:mb-68 mr-8 lg:mr-80 z-99",
                  }}
                >
                  <FuseLayout layouts={themeLayouts} />
                </SnackbarProvider>
              </FuseAuthorization>
            </BrowserRouter>
          </AuthProvider>
        </FuseTheme>
      </CacheProvider>
    );
  };
export default AppAsync
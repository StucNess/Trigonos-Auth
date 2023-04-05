import { lazy } from "react";

const EstadoFacturacionApp = lazy(() => import("./EstadoFacturacionApp"));

const EstadoFacturacionAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "comercial/estadoFacturacion",
      element: <EstadoFacturacionApp />,
    },
  ],
};

export default EstadoFacturacionAppConfig;

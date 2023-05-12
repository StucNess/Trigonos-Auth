import axios from "axios";
import { useEffect } from "react";
import { lazy } from "react";
// useEffect(() => {
//   console.log("aqui");
// });
const EditUserApp = lazy(() => import("./EditUserApp"));
// let array = [];
console.log(window.localStorage.getItem("pagina"));
console.log("aquiasdasd");

let EditUserAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth:
    window.localStorage.getItem("pagina") == "Facturacion"
      ? ["Administrador"]
      : ["Nada"],
  routes: [
    {
      path: "administracion/EditUserApp",
      element: <EditUserApp />,
    },
  ],
};

export default EditUserAppConfig;

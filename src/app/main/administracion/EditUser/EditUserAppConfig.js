import axios from "axios";
import { useEffect } from "react";
import { lazy } from "react";
import { useSelector } from "react-redux";
// useEffect(() => {
//   console.log("aqui");
// });
// export function prueba (){
//   const { isloading, role } = useSelector((state) => state.fuse.roleSlice);
//   console.log(role)
// }


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
  auth:["Administrador"],
    // window.localStorage.getItem("pagina") == "Facturacion"
    //   ? ["Administrador"]
    //   : ["Nada"],
  routes: [
    {
      path: "administracion/EditUserApp",
      element: <EditUserApp />,
    },
  ],
};

export default EditUserAppConfig;

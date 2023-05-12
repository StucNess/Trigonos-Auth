import axios from "axios";
import { useEffect } from "react";
import { lazy } from "react";
// import { role,nose } from "../../../auth/authRolescarga";

// import AcuseteApp from "./AcuseteApp";
// axios
// .get("https://trigonosapi.azurewebsites.net/api/Rol/listarRolPagina")
// .then((response) => {
//   console.log(response.data[0].nombreRol);


// })
// .catch((error) => {
  
// });


console.log()

const EditUserApp = lazy(() => import("./EditUserApp"));

// function EditUserAppConfigComponent (){


  
//   return{
//       settings: {
//         layout: {
//           config: {},
//         },
//       },

//       auth:"Administrador",
//       routes: [
//         {
//           path: "administracion/EditUserApp",
//           element: <EditUserApp />,
//         },
//       ],
    
//   }
// }


const EditUserAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth:["Administrador"],
  routes: [
    {
      path: "administracion/EditUserApp",
      element: <EditUserApp />,
    },
  ],
};

export default EditUserAppConfig;









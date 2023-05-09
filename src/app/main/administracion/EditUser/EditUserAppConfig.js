import { lazy } from "react";
import { authRoles } from "src/app/auth";
// import AcuseteApp from "./AcuseteApp";
const EditUserApp = lazy(() => import("./EditUserApp"));

const EditUserAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.admin,
  routes: [
    {
      path: "administracion/EditUserApp",
      element: <EditUserApp />,
    },
  ],
};

export default EditUserAppConfig;

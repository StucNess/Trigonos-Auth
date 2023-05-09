import { lazy } from "react";
import { authRoles } from "src/app/auth";
// import AcuseteApp from "./AcuseteApp";
const CreateUserApp = lazy(() => import("./CreateUserApp"));

const CreateUserAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.admin,
  routes: [
    {
      path: "administracion/CreateUser",
      element: <CreateUserApp />,
    },
  ],
};

export default CreateUserAppConfig;

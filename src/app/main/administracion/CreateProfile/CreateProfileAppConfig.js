import { lazy } from "react";
import { authRoles } from "src/app/auth";
// import AcuseteApp from "./AcuseteApp";
const CreateProfileApp = lazy(() => import("./CreateProfileApp"));

const CreateProfileAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.admin,
  routes: [
    {
      path: "administracion/CreateProfile",
      element: <CreateProfileApp />,
    },
  ],
};

export default CreateProfileAppConfig;

import { lazy } from "react";
// import AcuseteApp from "./AcuseteApp";
const CreateUserApp = lazy(() => import("./CreateUserApp"));

const CreateUserAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "administracion/CreateUser",
      element: <CreateUserApp />,
    },
  ],
};

export default CreateUserAppConfig;

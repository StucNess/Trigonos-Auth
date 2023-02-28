import { lazy } from "react";
// import AcuseteApp from "./AcuseteApp";
const EditUserApp = lazy(() => import("./EditUserApp"));

const EditUserAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "administracion/EditUserApp",
      element: <EditUserApp />,
    },
  ],
};

export default EditUserAppConfig;

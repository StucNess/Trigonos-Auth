import { lazy } from "react";
// import AcuseteApp from "./AcuseteApp";
const CreateProfileApp = lazy(() => import("./CreateProfileApp"));

const CreateProfileAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "administracion/CreateProfile",
      element: <CreateProfileApp />,
    },
  ],
};

export default CreateProfileAppConfig;

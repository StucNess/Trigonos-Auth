
import NominaPagoApp from './NominaPagoApp';


const  NominaPagoAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'comercial/nominaPago',
      element: <NominaPagoApp />,
    },
  ],
};

export default NominaPagoAppConfig;


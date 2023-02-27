
import FacturacionMasivaApp from './FacturacionMasivaApp';


const  FacturacionMasivaAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'comercial/FacturacionMasiva',
      element: <FacturacionMasivaApp />,
    },
  ],
};

export default FacturacionMasivaAppConfig;


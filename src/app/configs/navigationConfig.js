import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
  {
    id: "dashboards",
    title: "Dashboards",
    subtitle: "Trigonos Energy",
    type: "group",
    icon: "heroicons-outline:home",
    translate: "DASHBOARDS",
    children: [
      {
        id: "dashboards.Analitica",
        title: "Analisis",
        type: "item",
        icon: "heroicons-outline:clipboard-check",
        url: "/analisis/Acusete",
      },
    ],
  },
  {
    
    
    id: "c1",
    title: "COMERCIAL",
    subtitle: "Modulo de Gestion Comercial",
    type: "group",
    icon: "heroicons-outline:home",
    children: [
      {
        id: "c1.EstadoFacturacion",
        title: "Estado Facturación",
        type: "item",
        icon: "heroicons-outline:clipboard-check",
        url: "/comercial/estadoFacturacion",
      },
      {
        id: "c1.Participantes",
        title: "Participantes",
        type: "item",
        icon: "heroicons-outline:clipboard-check",
        url: "/comercial/Participantes",
      },
      {
        id: "example-component",
        title: "Example",
        translate: "EXAMPLE",
        type: "item",
        icon: "heroicons-outline:star",
        url: "example",
      },
    ],
  },
];

export default navigationConfig;

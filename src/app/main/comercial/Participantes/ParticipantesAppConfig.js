import { lazy } from 'react';

const ParticipantesApp = lazy(() => import('./ParticipantesApp'));

const ParticipantesAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'comercial/Participantes',
      element: <ParticipantesApp />,
    },
  ],
};

export default ParticipantesAppConfig;

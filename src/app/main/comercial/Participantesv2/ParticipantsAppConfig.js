
import ParticipantsApp from './ParticipantsApp';


const  ParticipantsAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'comercial/Participantesv2',
      element: <ParticipantsApp />,
    },
  ],
};

export default ParticipantsAppConfig;


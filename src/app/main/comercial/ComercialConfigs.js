import EstadoFacturacionAppConfig from './estadoFacturacion/EstadoFacturacionAppConfig';
// import CobranzaConfig from './cobranzas/CobranzasAppConfigs'
import ParticipantesAppConfig from './Participantes/ParticipantesAppConfig';
import NominaPagoAppConfig from './NominaPago/NominaPagoAppConfig';
import FacturacionMasivaAppConfig from './FacturacionMasiva/FacturacionMasivaAppConfig';

const ComercialConfig = [
    EstadoFacturacionAppConfig,
    ParticipantesAppConfig,
    NominaPagoAppConfig,
    FacturacionMasivaAppConfig,
];

export default ComercialConfig;
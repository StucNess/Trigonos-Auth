import { useGetEstadoPagoQuery } from "app/store/metricsApi/metricsApi";
import GraficoTorta from "./GraficoTorta";

export default function Estadisticas(props){
    const { participantId } = props
    const { data: getData, isFetching: fetching } = useGetEstadoPagoQuery(participantId);
    return (
        <div>
            {fetching? <p>Cargando...</p>:
            <GraficoTorta dataGrafic ={getData} idpart = {participantId} />
            }
            
        </div>

    );
}
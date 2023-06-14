import { useGetEstadoFacturacionQuery, useGetEstadoPagoQuery, useGetEstadoRecepcionadoQuery } from "app/store/metricsApi/metricsApi";
import GraficoTorta from "./GraficoTorta";
import { useEffect, useState } from "react";

export default function Estadisticas(props){
    const { participantId } = props
    const { data: getDataPago, isFetching: fetching, refetch: refetchEstPago} = useGetEstadoPagoQuery(participantId);
    const { data: getDataRecep, isFetching: fetchingRecepcionado, refetch: refetchEstRecep } = useGetEstadoRecepcionadoQuery(participantId);
    const { data: getDataFact, isFetching: fetchingFacturado, refetch : refetchEstFact} = useGetEstadoFacturacionQuery(participantId);
    const [carga, setCarga] = useState(true)
    useEffect(() => {
 
        function verificacarga() {
          if ([fetchingRecepcionado,fetching,fetchingFacturado].every((valor) => valor === false)) {
            return false;
          } else {
            return true;     
          }
        }
      setCarga(verificacarga() )
  
    }, [fetchingRecepcionado,fetching,fetchingFacturado])
    useEffect(() => {
      refetchEstPago()
      refetchEstRecep()
      refetchEstFact()
    }, [participantId])
    return (
        <div>
            {carga ? <p>Cargando...</p>:
            <GraficoTorta 
                dataEstPago={getDataPago} 
                dataEstRecept={getDataRecep} 
                dataEstFact={getDataFact} 
                idpart = {participantId} />
            }
            
        </div>

    );
}
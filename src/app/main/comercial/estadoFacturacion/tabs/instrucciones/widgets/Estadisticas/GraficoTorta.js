import { useState } from 'react';
import Chart from 'react-apexcharts';

function GraficoTorta(props){

    const { dataGrafic } = props;
    console.log(dataGrafic)
    const [state, setState] = useState({
        options: {
            labels: ['Pagado', 'No pagado', 'Atrasado']
        },
        series : [dataGrafic.totalPagado,dataGrafic.totalNoPagado, dataGrafic.totalAtrasado]

    });


    return (
        <div className="donut">
            <Chart options={state.options} series={state.series} type="donut" width="380"/>
        </div>
    );
}

export default GraficoTorta;
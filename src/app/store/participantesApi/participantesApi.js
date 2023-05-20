import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';


export const participantesApi = createApi({
    reducerPath:'participantes',
    baseQuery: fetchBaseQuery({
        baseUrl:'http://localhost:5205/'
    }),
    endpoints:(builder)=>({
       
        getParticipantes: builder.query({
            query:()=>'/api/Participantes'
        }),
        //Revisar como utilizar el patch si no cambialo por post en .net
        getBusinessName: builder.query({
            query:()=>'/BusinessName'
        }),
        getRut: builder.query({
            query:()=>'/Rut'
        }),
        getParticipantesSpec: builder.query({ 
            query:(parameters)=>`/api/Participantes/${parameters.id}?business_name=${parameters.business_name}?rut=${parameters.rut}` //pasale un objecto {id:0, business_name:"", rut:"" } aun asi no se si esta bien quizas debas usar un mutation
        }),
        getHistorificacion: builder.query({
            query:(id)=>`/Historificacion?${id}`
        }),
        
      
       
    })
})
export const { useGetParticipantesQuery,useGetBusinessNameQuery,useGetRutQuery,useGetParticipantesSpecQuery,useGetHistorificacionQuery }= participantesApi;
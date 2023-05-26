import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const participantesApi = createApi({
  reducerPath: "participantes",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5205/",
  }),
  endpoints: (builder) => ({
    getParticipantes: builder.query({
      query: () => "/api/Participantes",
    }),
    getParticipantesById_: builder.query({
      query: (id) => `/api/Participantes?id=${id}`,
    }),

    getParticipantesById: builder.mutation({
      //  Objeto del body {email:"",username:"",nombre:"",apellido:"",idEmpresa:0,pais:"",password:"",rol:""}
      query: (id) => ({
        headers: {
          "Content-type": "application/json",
        },
        url: `/api/Participantes?id=${id}`,
        method: "GET",
      }),
    }),
    //Revisar como utilizar el patch si no cambialo por post en .net
    getBusinessName: builder.query({
      query: () => "/BusinessName",
    }),
    getRut: builder.query({
      query: () => "/Rut",
    }),
    getParticipantesSpec: builder.query({
      query: (parameters) =>
        `/api/Participantes/${parameters.id}?business_name=${parameters.business_name}?rut=${parameters.rut}`, //pasale un objecto {id:0, business_name:"", rut:"" } aun asi no se si esta bien quizas debas usar un mutation
    }),
    getHistorificacion: builder.query({
      query: (id) => `/Historificacion?${id}`,
    }),
  }),
});
export const {
  useGetParticipantesQuery,
  useGetParticipantesById_Query,
  useGetParticipantesByIdMutation,
  useGetBusinessNameQuery,
  useGetRutQuery,
  useGetParticipantesSpecQuery,
  useGetHistorificacionQuery,
} = participantesApi;

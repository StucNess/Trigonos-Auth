import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const participantesApi = createApi({
  reducerPath: "participantes",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://trigonosapi.azurewebsites.net/",
  }),
  endpoints: (builder) => ({
    getParticipantes: builder.query({
      query: () => "/api/Participantes",
    }),
    getParticipantesById_: builder.query({
      query: (id) => `/api/Participantes?id=${id}`,
    }),
    getProyectoAll: builder.mutation({
      //  Objeto del body {email:"",username:"",nombre:"",apellido:"",idEmpresa:0,pais:"",password:"",rol:""}
      query: (spec) => ({
        headers: {
          "Content-type": "application/json",
        },
        url: `/api/Participantes?All=s&PageIndex=${spec.PageIndex}&PageSize=${spec.PageSize}`,
        method: "GET",
      }),
    }),
    getProyectoById: builder.mutation({
      //  Objeto del body {email:"",username:"",nombre:"",apellido:"",idEmpresa:0,pais:"",password:"",rol:""}
      query: (id) => ({
        headers: {
          "Content-type": "application/json",
        },
        url: `/api/Participantes/ProyectosBy/${id}`,
        method: "GET",
      }),
    }),
    postActualizarTipoCliente: builder.mutation({
      //  Objeto del body {email:"",username:"",nombre:"",apellido:"",idEmpresa:0,pais:"",password:"",rol:""}
      query: (id) => ({
        headers: {
          "Content-type": "application/json",
        },
        url: `api/Participantes/ActualizarTipoCliente/${id}`,
        method: "POST",
      }),
    }),
    postActivarProyecto: builder.mutation({
      //  Objeto del body {email:"",username:"",nombre:"",apellido:"",idEmpresa:0,pais:"",password:"",rol:""}
      query: (id) => ({
        headers: {
          "Content-type": "application/json",
        },
        url: `/api/Participantes/ActHabilitadoProyect/id=${id}`,
        method: "POST",
      }),
    }),
    postDesactivarProyecto: builder.mutation({
      //  Objeto del body {email:"",username:"",nombre:"",apellido:"",idEmpresa:0,pais:"",password:"",rol:""}
      query: (id) => ({
        headers: {
          "Content-type": "application/json",
        },
        url: `/api/Participantes/DesacHabilitadoProyect/id=${id}`,
        method: "POST",
      }),
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
  useGetProyectoAllMutation,
  useGetProyectoByIdMutation,
  usePostActualizarTipoClienteMutation,
  usePostActivarProyectoMutation,
  usePostDesactivarProyectoMutation,
  useGetParticipantesByIdMutation,
  useGetBusinessNameQuery,
  useGetRutQuery,
  useGetParticipantesSpecQuery,
  useGetHistorificacionQuery,
} = participantesApi;

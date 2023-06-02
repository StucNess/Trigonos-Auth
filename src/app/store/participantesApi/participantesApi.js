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
    getParticipantell: builder.mutation({
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
    getProyectoAll: builder.mutation({
      //  Objeto del body {email:"",username:"",nombre:"",apellido:"",idEmpresa:0,pais:"",password:"",rol:""}
      query: (spec) => ({
        headers: {
          "Content-type": "application/json",
        },
        url: `/api/Participantes/PaginationProyectos?PageIndex=${spec.PageIndex}&PageSize=${spec.PageSize}`,
        method: "GET",
      }),
    }),
    postActualizarProyecto: builder.mutation({
      //  Objeto del body {email:"",username:"",nombre:"",apellido:"",idEmpresa:0,pais:"",password:"",rol:""}
      query: (spec) => ({
        headers: {
          "Content-type": "application/json",
        },
        url: "/api/Participantes/ActualizarProyecto",
        method: "POST",
        body: spec,
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

    //Optimos
    getPartAll: builder.query({
      query: (spec) =>
        `/api/Participantes?All=s&PageIndex=${spec.PageIndex}&PageSize=${spec.PageSize}`,
    }),
    getProyAll: builder.query({
      query: (spec) =>
        `/api/Participantes/PaginationProyectos?PageIndex=${spec.PageIndex}&PageSize=${spec.PageSize}`,
    }),
  }),
});
export const {
  useGetParticipantesQuery,
  useGetParticipantesById_Query,
  useGetParticipantellMutation,
  useGetProyectoByIdMutation,
  useGetProyectoAllMutation,
  usePostActualizarProyectoMutation,

  useGetParticipantesByIdMutation,
  useGetBusinessNameQuery,
  useGetRutQuery,
  useGetParticipantesSpecQuery,
  useGetHistorificacionQuery,

  useGetPartAllQuery,
  useGetProyAllQuery,
} = participantesApi;

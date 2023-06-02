import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const facturacionClApi = createApi({
  reducerPath: "facturacionesCl",
  tagTypes: ["FacturacionesCl"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://trigonosapi.azurewebsites.net/api/FacturacionCl/",
  }),
  endpoints: (builder) => ({
    getFacturaById: builder.mutation({
      //  Objeto del body {email:"",username:"",nombre:"",apellido:"",idEmpresa:0,pais:"",password:"",rol:""}
      query: (id) => ({
        headers: {
          "Content-type": "application/json",
        },
        url: `/FacturacionBy/${id}`,
        method: "GET",
      }),
    }),
    getFactCLAll: builder.query({
      //  Objeto del body {email:"",username:"",nombre:"",apellido:"",idEmpresa:0,pais:"",password:"",rol:""}
      query: () => `/NpaginationDecode`,
      providesTags: ["FacturacionesCl"],
    }),
    postFacturaAgregar: builder.mutation({
      //  Objeto del body {idUser:"", newData:{email:"",username:"",nombre:"",apellido:"",idEmpresa:0,pais:"",password:"",rolIdAnterior:"",rolIdNuevo:""}}
      query: (data) => ({
        headers: {
          "Content-type": "application/json",
        },
        url: `/Agregar/`,
        method: "POST",
        body: data,
      }),
      // invalidatesTags: ["usuarios", "usuariosroles", "empresas"],
    }),
    postFacturaActualizar: builder.mutation({
      //  Objeto del body {idUser:"", newData:{email:"",username:"",nombre:"",apellido:"",idEmpresa:0,pais:"",password:"",rolIdAnterior:"",rolIdNuevo:""}}
      query: (data) => ({
        headers: {
          "Content-type": "application/json",
        },
        url: `/Actualizar/`,
        method: "POST",
        body: data,
      }),
      // invalidatesTags: ["usuarios", "usuariosroles", "empresas"],
    }),
  }),
});
export const {
  usePostFacturaAgregarMutation,
  usePostFacturaActualizarMutation,
  useGetFacturaByIdMutation,
  useGetFactCLAllQuery,
} = facturacionClApi;

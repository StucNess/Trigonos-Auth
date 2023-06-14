import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const metricsApi = createApi({
  reducerPath: "metrics",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://trigonosapi.azurewebsites.net/api/Metrics/",
  }),
  endpoints: (builder) => ({
    getEstadoPago: builder.query({
      query: (id) => `/EstadoDePago/${id}`,
    }),
    getEstadoRecepcionado: builder.query({
      query: (id) => `/EstadoDeRecepcion/${id}`,
    }),
    getEstadoFacturacion: builder.query({
      query: (id) => `/EstadoDeFacturacion/${id}`,
    }),
  }),
});
export const { useGetEstadoPagoQuery , useGetEstadoRecepcionadoQuery, useGetEstadoFacturacionQuery} = metricsApi;

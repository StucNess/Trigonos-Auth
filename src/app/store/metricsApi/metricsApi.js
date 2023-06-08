import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const metricsApi = createApi({
  reducerPath: "metrics",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5205/api/Metrics/",
  }),
  endpoints: (builder) => ({
    getEstadoPago: builder.query({
      query: (id) => `/EstadoDePago/${id}`,
    }),

    // getInstrucciones: builder.mutation({
    //     query: (id) => ({
    //         headers:{
    //             'Content-type': 'application/json'
    //         },
    //         url: `/desactivarRolPagina/${id}?parametros=`,
    //         method: 'POST',

    //     }),
    // }),
  }),
});
export const { useGetEstadoPagoQuery } = metricsApi;

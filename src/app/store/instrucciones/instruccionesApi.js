import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const instruccionesApi = createApi({
  reducerPath: "instrucciones",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5205/",
  }),
  endpoints: (builder) => ({
    getGlosa: builder.query({
      query: () => "/Glosa",
    }),
    getInstrucciones: builder.query({
      query: (id) => `/api/Instrucciones/${id}?Folio=0`,
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
export const { useGetGlosaQuery, useGetInstruccionesQuery } = instruccionesApi;

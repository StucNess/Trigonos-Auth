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
      query: (id) =>
        `/api/Instrucciones/InstruccionesDef/${id}?Folio=0&Acreedor=${id}&MontoNeto=10&EstadoEmision=No Facturado`,
    }),
    getDeudorDocument: builder.query({
      query: (id) =>
        `/api/Instrucciones/InstruccionesDef/${id}?Deudor=${id}&MontoNeto=10&Folio=0&PageIndex=1&PageSize=5000`,
    }),
    getAcreedorDocument: builder.query({
      query: (id) =>
        `/api/Instrucciones/InstruccionesDef/${id}?Acreedor=${id}&MontoNeto=10&EstadoPago=No Pagado&conFolio=si&PageIndex=1&PageSize=5000`,
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
export const {
  useGetGlosaQuery,
  useGetInstruccionesQuery,
  useGetDeudorDocumentQuery,
  useGetAcreedorDocumentQuery,
} = instruccionesApi;

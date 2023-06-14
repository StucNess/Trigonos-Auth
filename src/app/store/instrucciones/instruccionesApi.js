import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const instruccionesApi = createApi({
  reducerPath: "instrucciones",
  tagTypes : ["instruccionesDef"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://trigonosapi.azurewebsites.net/",
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
    getInstruccionesSpec: builder.query({
      query: (data) => ({
        url: data.spec
          ? `/api/Instrucciones/InstruccionesDef/${data.id}?PageIndex=${data.PageIndex}&PageSize=${data.PageSize}` +
            (data.spec.FechaEmision != undefined ? `&FechaEmision=${data.spec.FechaEmision}` : "")+
            (data.spec.FechaRecepcion != undefined ? `&FechaRecepcion=${data.spec.FechaRecepcion}` : "")+
            (data.spec.FechaPago != undefined ? `&FechaPago=${data.spec.FechaPago}` : "")+
            (data.spec.FechaAceptacion != undefined ? `&FechaAceptacion=${data.spec.FechaAceptacion}` : "")+
            (data.spec.Glosa != undefined ? `&Glosa=${data.spec.Glosa}` : "")+
            (data.spec.Concepto != undefined ? `&Concepto=${data.spec.Concepto}` : "")+
            (data.spec.EstadoAceptacion != undefined ? `&EstadoAceptacion=${data.spec.EstadoAceptacion}` : "")+
            (data.spec.EstadoRecepcion != undefined ? `&EstadoRecepcion=${data.spec.EstadoRecepcion}` : "")+
            (data.spec.Acreedor != undefined ? `&Acreedor=${data.spec.Acreedor}` : "")+
            (data.spec.Deudor != undefined ? `&Deudor=${data.spec.Deudor}` : "")+
            (data.spec.MontoNeto != undefined ? `&MontoNeto=${data.spec.MontoNeto}` : "")+
            (data.spec.MontoBruto != undefined ? `&MontoBruto=${data.spec.MontoBruto}` : "")+
            (data.spec.EstadoEmision != undefined ? `&EstadoEmision=${data.spec.EstadoEmision}` : "")+
            (data.spec.EstadoPago != undefined ? `&EstadoPago=${data.spec.EstadoPago}` : "")+
            (data.spec.RutAcreedor != undefined ? `&RutAcreedor=${data.spec.RutAcreedor}` : "")+
            (data.spec.RutDeudor != undefined ? `&RutDeudor=${data.spec.RutDeudor}` : "")+
            (data.spec.Folio != undefined ? `&Folio=${data.spec.Folio}` : "")+
            (data.spec.NombreAcreedor != undefined ? `&NombreAcreedor=${data.spec.NombreAcreedor}` : "")+
            (data.spec.NombreDeudor != undefined ? `&NombreDeudor=${data.spec.NombreDeudor}` : "")+
            (data.spec.InicioPeriodo != undefined ? `&InicioPeriodo=${data.spec.InicioPeriodo}` : "")+
            (data.spec.TerminoPeriodo != undefined ? `&TerminoPeriodo=${data.spec.TerminoPeriodo}` : "")+
            (data.spec.Carta != undefined ? `&Carta=${data.spec.Carta}` : "")+
            (data.spec.CodigoRef != undefined ? `&CodigoRef=${data.spec.CodigoRef}` : "")+
            (data.spec.OrderByNeto != undefined ? `&OrderByNeto=${data.spec.OrderByNeto}` : "")+
            (data.spec.OrderByBruto != undefined ? `&OrderByBruto=${data.spec.OrderByBruto}`:"")+
            (data.spec.OrderByFechaEmision != undefined ? `&OrderByFechaEmision=${data.spec.OrderByFechaEmision}`:"")+
            (data.spec.OrderByFechaPago != undefined ? `&OrderByFechaPago=${data.spec.OrderByFechaPago}`:"")+
            (data.spec.OrderByFechaCarta != undefined ? `&OrderByFechaCarta=${data.spec.OrderByFechaCarta}`:"")+
            (data.spec.OrderByFolio != undefined ? `&OrderByFolio=${data.spec.OrderByFolio}`:"")
          : `/api/Instrucciones/InstruccionesDef/${data.id}?PageIndex=${data.PageIndex}&PageSize=${data.PageSize}`,
        method: "GET",
      }),
      providesTags: ["instruccionesDef"],
    }),
    getConcepto: builder.query({
      query: (data) => ({
        url: data.spec
          ? `/ssFiltros?id=${data.id}` +
            (spec.FechaEmision != undefined ? `?FechaEmision=${spec.FechaEmision}` : "")+
            (spec.FechaRecepcion != undefined ? `?FechaRecepcion=${spec.FechaRecepcion}` : "")+
            (spec.FechaPago != undefined ? `?FechaPago=${spec.FechaPago}` : "")+
            (spec.FechaAceptacion != undefined ? `?FechaAceptacion=${spec.FechaAceptacion}` : "")+
            (spec.Glosa != undefined ? `?Glosa=${spec.Glosa}` : "")+
            (spec.Concepto != undefined ? `?Concepto=${spec.Concepto}` : "")+
            (spec.EstadoAceptacion != undefined ? `?EstadoAceptacion=${spec.EstadoAceptacion}` : "")+
            (spec.EstadoRecepcion != undefined ? `?EstadoRecepcion=${spec.EstadoRecepcion}` : "")+
            (spec.Acreedor != undefined ? `?Acreedor=${spec.Acreedor}` : "")+
            (spec.Deudor != undefined ? `?Deudor=${spec.Deudor}` : "")+
            (spec.MontoNeto != undefined ? `?MontoNeto=${spec.MontoNeto}` : "")+
            (spec.MontoBruto != undefined ? `?MontoBruto=${spec.MontoBruto}` : "")+
            (spec.EstadoEmision != undefined ? `?EstadoEmision=${spec.EstadoEmision}` : "")+
            (spec.EstadoPago != undefined ? `?EstadoPago=${spec.EstadoPago}` : "")+
            (spec.RutAcreedor != undefined ? `?RutAcreedor=${spec.RutAcreedor}` : "")+
            (spec.RutDeudor != undefined ? `?RutDeudor=${spec.RutDeudor}` : "")+
            (spec.Folio != undefined ? `?Folio=${spec.Folio}` : "")+
            (spec.NombreAcreedor != undefined ? `?NombreAcreedor=${spec.NombreAcreedor}` : "")+
            (spec.NombreDeudor != undefined ? `?NombreDeudor=${spec.NombreDeudor}` : "")
          : `/ssFiltros?id=${data.id}`,
        method: "GET",
      }),
      providesTags: ["concepto"],
    }),
    getNombreAcreedor: builder.query({
      query: (data) => ({
        url: data.spec
          ? `/sFiltrosNameCreditor?id=${data.id}` +
            (data.spec.FechaEmision != undefined ? `&FechaEmision=${data.spec.FechaEmision}` : "")+
            (data.spec.FechaRecepcion != undefined ? `&FechaRecepcion=${data.spec.FechaRecepcion}` : "")+
            (data.spec.FechaPago != undefined ? `&FechaPago=${data.spec.FechaPago}` : "")+
            (data.spec.FechaAceptacion != undefined ? `&FechaAceptacion=${data.spec.FechaAceptacion}` : "")+
            (data.spec.Glosa != undefined ? `&Glosa=${data.spec.Glosa}` : "")+
            (data.spec.Concepto != undefined ? `&Concepto=${data.spec.Concepto}` : "")+
            (data.spec.EstadoAceptacion != undefined ? `&EstadoAceptacion=${data.spec.EstadoAceptacion}` : "")+
            (data.spec.EstadoRecepcion != undefined ? `&EstadoRecepcion=${data.spec.EstadoRecepcion}` : "")+
            (data.spec.Acreedor != undefined ? `&Acreedor=${data.spec.Acreedor}` : "")+
            (data.spec.Deudor != undefined ? `&Deudor=${data.spec.Deudor}` : "")+
            (data.spec.MontoNeto != undefined ? `&MontoNeto=${data.spec.MontoNeto}` : "")+
            (data.spec.MontoBruto != undefined ? `&MontoBruto=${data.spec.MontoBruto}` : "")+
            (data.spec.EstadoEmision != undefined ? `&EstadoEmision=${data.spec.EstadoEmision}` : "")+
            (data.spec.EstadoPago != undefined ? `&EstadoPago=${data.spec.EstadoPago}` : "")+
            (data.spec.RutAcreedor != undefined ? `&RutAcreedor=${data.spec.RutAcreedor}` : "")+
            (data.spec.RutDeudor != undefined ? `&RutDeudor=${data.spec.RutDeudor}` : "")+
            (data.spec.Folio != undefined ? `&Folio=${data.spec.Folio}` : "")+
            (data.spec.NombreAcreedor != undefined ? `&NombreAcreedor=${data.spec.NombreAcreedor}` : "")+
            (data.spec.NombreDeudor != undefined ? `&NombreDeudor=${data.spec.NombreDeudor}` : "")
          : `/sFiltrosNameCreditor?id=${data.id}`,
        method: "GET",
      }),
      providesTags: ["nombreAcreedor"],
    }),
    getRutAcreedor: builder.query({
      query: (data) => ({
        url: data.spec
          ? `/sFiltrosRutCreditor?id=${data.id}` +
            (data.spec.FechaEmision != undefined ? `&FechaEmision=${data.spec.FechaEmision}` : "")+
            (data.spec.FechaRecepcion != undefined ? `&FechaRecepcion=${data.spec.FechaRecepcion}` : "")+
            (data.spec.FechaPago != undefined ? `&FechaPago=${data.spec.FechaPago}` : "")+
            (data.spec.FechaAceptacion != undefined ? `&FechaAceptacion=${data.spec.FechaAceptacion}` : "")+
            (data.spec.Glosa != undefined ? `&Glosa=${data.spec.Glosa}` : "")+
            (data.spec.Concepto != undefined ? `&Concepto=${data.spec.Concepto}` : "")+
            (data.spec.EstadoAceptacion != undefined ? `&EstadoAceptacion=${data.spec.EstadoAceptacion}` : "")+
            (data.spec.EstadoRecepcion != undefined ? `&EstadoRecepcion=${data.spec.EstadoRecepcion}` : "")+
            (data.spec.Acreedor != undefined ? `&Acreedor=${data.spec.Acreedor}` : "")+
            (data.spec.Deudor != undefined ? `&Deudor=${data.spec.Deudor}` : "")+
            (data.spec.MontoNeto != undefined ? `&MontoNeto=${data.spec.MontoNeto}` : "")+
            (data.spec.MontoBruto != undefined ? `&MontoBruto=${data.spec.MontoBruto}` : "")+
            (data.spec.EstadoEmision != undefined ? `&EstadoEmision=${data.spec.EstadoEmision}` : "")+
            (data.spec.EstadoPago != undefined ? `&EstadoPago=${data.spec.EstadoPago}` : "")+
            (data.spec.RutAcreedor != undefined ? `&RutAcreedor=${data.spec.RutAcreedor}` : "")+
            (data.spec.RutDeudor != undefined ? `&RutDeudor=${data.spec.RutDeudor}` : "")+
            (data.spec.Folio != undefined ? `&Folio=${data.spec.Folio}` : "")+
            (data.spec.NombreAcreedor != undefined ? `&NombreAcreedor=${data.spec.NombreAcreedor}` : "")+
            (data.spec.NombreDeudor != undefined ? `&NombreDeudor=${data.spec.NombreDeudor}` : "")
          : `/sFiltrosRutCreditor?id=${data.id}`,
        method: "GET",
      
      }),
      providesTags: ["rutAcreedor"],

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

    }),
    getNameDeudor: builder.query({
      query: (data) => ({
        url: data.spec
          ? `/sFiltrosNameDebtor?id=${data.id}` +
            (data.spec.FechaEmision != undefined ? `&FechaEmision=${data.spec.FechaEmision}` : "")+
            (data.spec.FechaRecepcion != undefined ? `&FechaRecepcion=${data.spec.FechaRecepcion}` : "")+
            (data.spec.FechaPago != undefined ? `&FechaPago=${data.spec.FechaPago}` : "")+
            (data.spec.FechaAceptacion != undefined ? `&FechaAceptacion=${data.spec.FechaAceptacion}` : "")+
            (data.spec.Glosa != undefined ? `&Glosa=${data.spec.Glosa}` : "")+
            (data.spec.Concepto != undefined ? `&Concepto=${data.spec.Concepto}` : "")+
            (data.spec.EstadoAceptacion != undefined ? `&EstadoAceptacion=${data.spec.EstadoAceptacion}` : "")+
            (data.spec.EstadoRecepcion != undefined ? `&EstadoRecepcion=${data.spec.EstadoRecepcion}` : "")+
            (data.spec.Acreedor != undefined ? `&Acreedor=${data.spec.Acreedor}` : "")+
            (data.spec.Deudor != undefined ? `&Deudor=${data.spec.Deudor}` : "")+
            (data.spec.MontoNeto != undefined ? `&MontoNeto=${data.spec.MontoNeto}` : "")+
            (data.spec.MontoBruto != undefined ? `&MontoBruto=${data.spec.MontoBruto}` : "")+
            (data.spec.EstadoEmision != undefined ? `&EstadoEmision=${data.spec.EstadoEmision}` : "")+
            (data.spec.EstadoPago != undefined ? `&EstadoPago=${data.spec.EstadoPago}` : "")+
            (data.spec.RutAcreedor != undefined ? `&RutAcreedor=${data.spec.RutAcreedor}` : "")+
            (data.spec.RutDeudor != undefined ? `&RutDeudor=${data.spec.RutDeudor}` : "")+
            (data.spec.Folio != undefined ? `&Folio=${data.spec.Folio}` : "")+
            (data.spec.NombreAcreedor != undefined ? `&NombreAcreedor=${data.spec.NombreAcreedor}` : "")+
            (data.spec.NombreDeudor != undefined ? `&NombreDeudor=${data.spec.NombreDeudor}` : "")
          : `/sFiltrosNameDebtor?id=${data.id}`,
        method: "GET",
      }),
      providesTags: ["nombreDeudor"],
    }),
    getRutDeudor: builder.query({
      query: (data) => ({
        url: data.spec
          ? `/sFiltrosRutDeudor?id=${data.id}` +
            (data.spec.FechaEmision != undefined ? `&FechaEmision=${data.spec.FechaEmision}` : "")+
            (data.spec.FechaRecepcion != undefined ? `&FechaRecepcion=${data.spec.FechaRecepcion}` : "")+
            (data.spec.FechaPago != undefined ? `&FechaPago=${data.spec.FechaPago}` : "")+
            (data.spec.FechaAceptacion != undefined ? `&FechaAceptacion=${data.spec.FechaAceptacion}` : "")+
            (data.spec.Glosa != undefined ? `&Glosa=${data.spec.Glosa}` : "")+
            (data.spec.Concepto != undefined ? `&Concepto=${data.spec.Concepto}` : "")+
            (data.spec.EstadoAceptacion != undefined ? `&EstadoAceptacion=${data.spec.EstadoAceptacion}` : "")+
            (data.spec.EstadoRecepcion != undefined ? `&EstadoRecepcion=${data.spec.EstadoRecepcion}` : "")+
            (data.spec.Acreedor != undefined ? `&Acreedor=${data.spec.Acreedor}` : "")+
            (data.spec.Deudor != undefined ? `&Deudor=${data.spec.Deudor}` : "")+
            (data.spec.MontoNeto != undefined ? `&MontoNeto=${data.spec.MontoNeto}` : "")+
            (data.spec.MontoBruto != undefined ? `&MontoBruto=${data.spec.MontoBruto}` : "")+
            (data.spec.EstadoEmision != undefined ? `&EstadoEmision=${data.spec.EstadoEmision}` : "")+
            (data.spec.EstadoPago != undefined ? `&EstadoPago=${data.spec.EstadoPago}` : "")+
            (data.spec.RutAcreedor != undefined ? `&RutAcreedor=${data.spec.RutAcreedor}` : "")+
            (data.spec.RutDeudor != undefined ? `&RutDeudor=${data.spec.RutDeudor}` : "")+
            (data.spec.Folio != undefined ? `&Folio=${data.spec.Folio}` : "")+
            (data.spec.NombreAcreedor != undefined ? `&NombreAcreedor=${data.spec.NombreAcreedor}` : "")+
            (data.spec.NombreDeudor != undefined ? `&NombreDeudor=${data.spec.NombreDeudor}` : "")
          : `/sFiltrosRutDeudor?id=${data.id}`,
        method: "GET",
      }),
      providesTags: ["rutDeudor"],
    }),
  }),
});
export const {
  useGetGlosaQuery,
  useGetInstruccionesQuery,
  useGetDeudorDocumentQuery,
  useGetInstruccionesSpecQuery,
  useGetConceptoQuery,
  useGetNombreAcreedorQuery,
  useGetRutAcreedorQuery,
  useGetNameDeudorQuery,
  useGetRutDeudorQuery,
  useGetAcreedorDocumentQuery,
} = instruccionesApi;

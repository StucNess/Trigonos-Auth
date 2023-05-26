import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const empresaApi = createApi({
    reducerPath:'empresas',
    baseQuery: fetchBaseQuery({
        baseUrl:'https://trigonosapi.azurewebsites.net/api/Empresas'
    }),
    //Revisar como utilizar el patch si no cambialo por post en .net

    postAddEmpresa: builder.mutation({
      //  Objeto del body {idProyect:0,idUser:""}
      query: (asing) => ({
        headers: {
          "Content-type": "application/json",
        },
        url: `/Agregar/`,
        method: "POST",
        body: asing,
      }),
    }),
  }),
});
export const { useGetEmpresasQuery, usePostAddEmpresaMutation } = empresaApi;

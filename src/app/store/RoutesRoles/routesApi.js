import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';


export const routesApi = createApi({
    reducerPath:'routes',
    baseQuery: fetchBaseQuery({
        baseUrl:'https://trigonosapi.azurewebsites.net/api/Rol'
    }),
    endpoints:(builder)=>({
        getAllRoutes: builder.query({
            query:()=>'/listarRolPagina'
        }),
        // getListarPaginaWeb: builder.query({
        //     query:(todoid)=>`/routes/${todoid}`
        // }),
        getListarPaginaWeb: builder.query({
            query:(todoid)=>'/ListarPaginaWeb'
        }),
        // postHabilitarRol: builder.query({
        //     query:(id)=>`/activarRolPagina/${id}`
        // }),
        postHabilitarRol: builder.mutation({
            query: (id) => ({
              url: '/activarRolPagina/',
              method: 'POST',
              body: { id },
            }),
          }),
    })
})
export const { useGetAllRoutesQuery, useGetListarPaginaWebQuery,usePostHabilitarRolQuery }= routesApi;
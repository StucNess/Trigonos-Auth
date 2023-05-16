import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';


export const routesApi = createApi({
    reducerPath:'routes',
    baseQuery: fetchBaseQuery({
        baseUrl:'http://localhost:5205/api/Rol/'
    }),
    endpoints:(builder)=>({
        getAllRoutes: builder.query({
            query:()=>'/listarRolPagina'
        }),
        getOnlyHabilitRoutes: builder.query({
            query:()=>'/listarRolPaginaHabilitada'
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
              headers:{
                    'Content-type': 'application/json'
              },
              url: `/activarRolPagina/${id}`,
              method: 'POST',
            
            }),
        }),
        postDeshabilitarRol: builder.mutation({
            query: (id) => ({
                headers:{
                    'Content-type': 'application/json'
                },
                url: `/desactivarRolPagina/${id}`,
                method: 'POST',
            
            }),
        }),
    })
})
export const { useGetAllRoutesQuery, useGetListarPaginaWebQuery,useGetOnlyHabilitRoutesQuery,usePostHabilitarRolMutation ,usePostDeshabilitarRolMutation}= routesApi;
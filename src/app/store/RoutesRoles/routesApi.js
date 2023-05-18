import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';


export const routesApi = createApi({
    reducerPath:'routes',
    baseQuery: fetchBaseQuery({
        baseUrl:'https://trigonosapi.azurewebsites.net/api/Rol/'
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
        postNewRol: builder.mutation({
            query: (rol) => ({
                headers:{
                    'Content-type': 'application/json'
                },
                url: `/Agregar/`,
                method: 'POST',
                body: rol
            }),
        }),
        postEditRol: builder.mutation({
            query: (id,rol) => ({
                headers:{
                    'Content-type': 'application/json'
                },
                url: `/Actualizar/?${id}/`,
                method: 'POST',
                body: rol
            }),
        }),
        postNewRolPages: builder.mutation({ //Agrega un rol y pagina en la tabla de rompimiento
            query: (rolpage) => ({
                headers:{
                    'Content-type': 'application/json'
                },
                url: `/AsignarRolPagina/`,
                method: 'POST',
                body: rolpage
            }),
        }),
    })
})
export const { useGetAllRoutesQuery, useGetListarPaginaWebQuery,useGetOnlyHabilitRoutesQuery,usePostHabilitarRolMutation ,usePostDeshabilitarRolMutation, usePostNewRolMutation,usePostNewRolPagesMutation,usePostEditRolMutation}= routesApi;
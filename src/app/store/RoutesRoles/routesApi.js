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
        // getRoute: builder.query({
        //     query:(todoid)=>`/routes/${todoid}`
        // })
    })
})
export const { useGetAllRoutesQuery }= routesApi;
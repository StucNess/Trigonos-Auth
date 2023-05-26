import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';


export const nominasApi = createApi({
    reducerPath:'nominas',
    tagTypes:["nominas"],
    baseQuery: fetchBaseQuery({
        baseUrl:'https://trigonosapi.azurewebsites.net/api/'
    }),
    endpoints:(builder)=>({
        //Revisar como utilizar el patch si no cambialo por post en .net
        getNominas: builder.mutation({
            query:(spec)=> ({
            // headers: {Authorization: `Bearer ${spec.token}` },
            url :spec? "/Nominas"
            + (spec.id!=undefined?`?id=${spec.id}`: "")
            + (spec.Glosa!=undefined && spec.Glosa!= "" ?`&Glosa=${spec.Glosa}`: "" )
            + (spec.Disc!=undefined?`&Disc=${spec.Disc}`:"" )
            + (spec.PageIndex!=undefined?`?PageIndex=${spec.PageIndex} `:" " )
            + (spec.PageSize!=undefined?`?PageSize=${spec.search}`:"")
            
            :"/Pagination",
            method: 'GET',
          
            }),
            providesTags:["nominas"]
        }),

        
       
    })
})
export const { useGetNominasMutation}= nominasApi;
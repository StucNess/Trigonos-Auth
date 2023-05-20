import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';


export const usuariosApi = createApi({
    reducerPath:'usuarios',
    baseQuery: fetchBaseQuery({
        baseUrl:'http://localhost:5205/api/Usuarios'
    }),
    endpoints:(builder)=>({
       
        getUsuarios: builder.query({
            query:()=>''
        }),
        
        //Revisar como utilizar el patch si no cambialo por post en .net
        getUsuariosPagination: builder.query({
            query:()=>'/Pagination'
        }),
        getUsuariosRoles: builder.query({
            query:()=>'/rolesUsers'
        }),
        getUsuariosById: builder.query({
            query:(id)=>`/account/${id}`
        }),
        postUsuariosAsingProyect: builder.mutation({ //  Objeto del body {idProyect:0,idUser:""}
            query: (asing) => ({
                headers:{
                    'Content-type': 'application/json'
                },
                url: `/AsignarProyecto/`,
                method: 'POST',
                body:asing 
            }),
        }),
        postUsuariosLogin: builder.mutation({ //  Objeto del body {email:"",password:""}
            query: (login) => ({
                headers:{
                    'Content-type': 'application/json'
                },
                url: `/Login/`,
                method: 'POST',
                body:login 
            }),
        }),
        postUsuariosRegistrar: builder.mutation({ //  Objeto del body {email:"",username:"",nombre:"",apellido:"",idEmpresa:0,pais:"",password:"",rol:""}
            query: (data) => ({
                headers:{
                    'Content-type': 'application/json'
                },
                url: `/registrar/`,
                method: 'POST',
                body:data 
            }),
        }),
        postUsuariosActualizar: builder.mutation({ //  Objeto del body {idUser:"", newData:{email:"",username:"",nombre:"",apellido:"",idEmpresa:0,pais:"",password:"",rol:""}}
            query: (data) => ({
                headers:{
                    'Content-type': 'application/json'
                },
                url: `/actualizar/${data.idUser}?registrarDto=`,
                method: 'POST',
                body:data.newData 
            }),
        }),
        postUsuariosValidarEmail: builder.mutation({
            query: (email) => ({
                headers:{
                    'Content-type': 'application/json'
                },
                url: `/ValidarEmail?email=`,
                method: 'POST',
                body:email
            }),
        }),
        postUserUpdatePassword: builder.mutation({ //   Objeto del body {password:""}
            query: (password) => ({
                headers:{
                    'Content-type': 'application/json'
                },
                url: `/ActualizarContrasena`,
                method: 'POST',
                body:password
            }),
        }),
       
       
    })
})
export const { useGetUsuariosQuery, useGetUsuariosPaginationQuery, useGetUsuariosRolesQuery}= usuariosApi;
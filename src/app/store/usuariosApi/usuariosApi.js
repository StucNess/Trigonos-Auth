import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usuariosApi = createApi({
  reducerPath: "usuarios",
  tagTypes: ["usuarios", "usuariosroles"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://trigonosapi.azurewebsites.net/api/Usuarios",
  }),
  endpoints: (builder) => ({
    getUsuarios: builder.query({
      query: () => "",
    }),
    //Revisar como utilizar el patch si no cambialo por post en .net
    getUsuariosPagination: builder.query({
      query: (spec) => ({
        headers: { Authorization: `Bearer ${spec.token}` },
        url: spec
          ? "/Pagination" +
            (spec.nombre != undefined ? `?Nombre=${spec.nombre}` : "") +
            (spec.apellido != undefined ? `?Apellido=${spec.apellido}` : "") +
            (spec.sort != undefined ? `?Sort=${spec.sort}` : "") +
            (spec.pageIndex != undefined
              ? `?PageIndex=${spec.pageIndex}`
              : "") +
            (spec.pageSize != undefined ? `?PageSize=${spec.pageSize} ` : " ") +
            (spec.search != undefined ? `?Search=${spec.search}` : "")
          : "/Pagination",
        method: "GET",
      }),
      providesTags: ["usuarios"],
    }),

    getUsuariosRoles: builder.query({
      query: () => "/rolesUsers",
      providesTags: ["usuariosroles"],
    }),
    getUsuariosById: builder.query({
      query: (id) => `/account/${id}`,
    }),
    postUsuariosAsingProyect: builder.mutation({
      //  Objeto del body {idProyect:0,idUser:""}
      query: (asing) => ({
        headers: {
          "Content-type": "application/json",
        },
        url: `/AsignarProyecto/`,
        method: "POST",
        body: asing,
      }),
    }),
    postUsuariosLogin: builder.mutation({
      //  Objeto del body {email:"",password:""}
      query: (login) => ({
        headers: {
          "Content-type": "application/json",
        },
        url: `/Login/`,
        method: "POST",
        body: login,
      }),
    }),
    postUsuariosRegistrar: builder.mutation({
      //  Objeto del body {email:"",username:"",nombre:"",apellido:"",idEmpresa:0,pais:"",password:"",rol:""}
      query: (data) => ({
        headers: {
          "Content-type": "application/json",
        },
        url: `/registrar/`,
        method: "POST",
        body: data,
      }),
    }),
    postUsuariosActualizar: builder.mutation({
      //  Objeto del body {idUser:"", newData:{email:"",username:"",nombre:"",apellido:"",idEmpresa:0,pais:"",password:"",rolIdAnterior:"",rolIdNuevo:""}}
      query: (data) => ({
        headers: {
          "Content-type": "application/json",
        },
        url: `/actualizar/${data.idUser}?actualizarDto=`,
        method: "POST",
        body: data.newData,
      }),
      invalidatesTags: ["usuarios", "usuariosroles", "empresas"],
    }),
    postUsuariosValidarEmail: builder.mutation({
      query: (email) => ({
        headers: {
          "Content-type": "application/json",
        },
        url: `/ValidarEmail?email=`,
        method: "POST",
        body: email,
      }),
    }),
    postUserUpdatePassword: builder.mutation({
      //   Objeto del body {password:""}
      query: (password) => ({
        headers: {
          "Content-type": "application/json",
        },
        url: `/ActualizarContrasena`,
        method: "POST",
        body: password,
      }),
    }),
    postUserUnlock: builder.mutation({
      query: (idUser) => ({
        headers: {
          "Content-type": "application/json",
        },
        url: `/Activar?usuarioId=${idUser}`,
        method: "POST",
      }),
      invalidatesTags: ["usuarios"],
    }),
    postUserLock: builder.mutation({
      query: (idUser) => ({
        headers: {
          "Content-type": "application/json",
        },
        url: `/Desactivar?usuarioId=${idUser}`,
        method: "POST",
      }),
      invalidatesTags: ["usuarios"],
    }),
  }),
});
export const {
  useGetUsuariosQuery,
  useGetUsuariosPaginationQuery,
  useGetUsuariosRolesQuery,
  usePostUsuariosActualizarMutation,
  usePostUsuariosRegistrarMutation,
  usePostUserUnlockMutation,
  usePostUserLockMutation,
} = usuariosApi;

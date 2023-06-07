import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const participantesApi = createApi({
  reducerPath: "participantes",
  tagTypes: ["listparticipant", "proyectos", "participant"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5205/",
  }),
  endpoints: (builder) => ({
    getParticipantes: builder.query({
      query: () => "/api/Participantes",
      providesTags: ["participant"],
    }),
    getParticipantesById_: builder.query({
      query: (id) => `/api/Participantes?id=${id}`,
    }),
    getExcelById_: builder.query({
      query: (id) => `/excelHistory?id=${id}`,
    }),
    getParticipantell: builder.mutation({
      query: (spec) => ({
        headers: {
          "Content-type": "application/json",
        },
        url: `/api/Participantes?All=s&PageIndex=${spec.PageIndex}&PageSize=${spec.PageSize}`,
        method: "GET",
      }),
    }),
    patchPartcipant: builder.mutation({
      query: (spec) => ({
        headers: {
          "Content-type": "application/json",
        },
        url:
          `/api/Participantes?id=${spec.id}&` +
          `Name=${spec.name}&` +
          `Rut=${spec.rut}&` +
          `Verification_Code=${spec.verificationCode}&` +
          `Business_Name=${spec.businessName}&` +
          `Commercial_Business=${spec.commercialBusiness}&` +
          `Dte_Reception_Email=${spec.email}&` +
          `Bank_Account=${spec.bankAccount}&` +
          `bank=${spec.bank}&` +
          `Commercial_address=${spec.commercialAddress}&` +
          `Postal_address=${spec.postalAddress}&` +
          `Manager=${spec.manager}&` +
          `Pay_Contact_First_Name=${spec.payContactFirstName}&` +
          `Pay_contact_last_name=${spec.payContactLastName}&` +
          `Pay_contact_address=${spec.payContactAddress}&` +
          `Pay_contact_phones=${spec.formatpayContactPhones}&` +
          `Pay_contact_email=${spec.payContactEmail}&` +
          `Bills_contact_first_name=${spec.billsContactFirstName}&` +
          `Bills_contact_last_name=${spec.billsContactLastName}&` +
          `Bills_contact_address=${spec.billsContactAddress}&` +
          `Bills_contact_phones=${spec.formatBillsContactPhones}&` +
          `Bills_contact_email=${spec.billsContactEmail}`,
        method: "PATCH",
      }),
      invalidatesTags: ["listparticipant", "proyectos"],
    }),
    getProyectoById: builder.mutation({
      query: (id) => ({
        headers: {
          "Content-type": "application/json",
        },
        url: `/api/Participantes/ProyectosBy/${id}`,
        method: "GET",
      }),
    }),
    getProyectoAll: builder.mutation({
      query: (spec) => ({
        headers: {
          "Content-type": "application/json",
        },
        url: `/api/Participantes/PaginationProyectos?PageIndex=${spec.PageIndex}&PageSize=${spec.PageSize}`,
        method: "GET",
      }),
    }),
    postActualizarProyecto: builder.mutation({
      query: (spec) => ({
        headers: {
          "Content-type": "application/json",
        },
        url: "/api/Participantes/ActualizarProyecto",
        method: "POST",
        body: spec,
      }),
      invalidatesTags: ["listparticipant", "proyectos"],
    }),

    getParticipantesById: builder.mutation({
      query: (id) => ({
        headers: {
          "Content-type": "application/json",
        },
        url: `/api/Participantes?id=${id}`,
        method: "GET",
      }),
    }),
    // getExcelsById: builder.mutation({
    //   query: (id) => ({
    //     headers: {
    //       "Content-type": "application/json",
    //     },
    //     url: `/excelHistory?id=${id}`,
    //     method: "GET",
    //   }),
    // }),

    getBusinessName: builder.query({
      query: () => "/BusinessName",
    }),
    getRut: builder.query({
      query: () => "/Rut",
    }),
    getParticipantesSpec: builder.query({
      query: (parameters) =>
        `/api/Participantes/${parameters.id}?business_name=${parameters.business_name}?rut=${parameters.rut}`,
    }),
    getHistorificacion: builder.query({
      query: (id) => `/Historificacion?${id}`,
    }),

    //Optimos
    getPartAll: builder.query({
      query: (spec) =>
        `/api/Participantes?All=s&PageIndex=${spec.PageIndex}&PageSize=${spec.PageSize}`,
      providesTags: ["listparticipant"],
    }),
    getProyAll: builder.query({
      query: (spec) =>
        `/api/Participantes/PaginationProyectos?PageIndex=${spec.PageIndex}&PageSize=${spec.PageSize}`,
      providesTags: ["proyectos"],
    }),
    refetchQueriesPart: builder.mutation({
      queryFn: () => ({ data: null }),
      invalidatesTags: ["listparticipant", "proyectos", "participant"],
    }),
  }),
});
export const {
  useGetParticipantesQuery,
  useGetParticipantesById_Query,
  useGetParticipantellMutation,
  useGetProyectoByIdMutation,
  useGetProyectoAllMutation,
  usePostActualizarProyectoMutation,
  usePatchPartcipantMutation,
  useGetParticipantesByIdMutation,
  useGetExcelById_Query,
  useGetBusinessNameQuery,
  useGetRutQuery,
  useGetParticipantesSpecQuery,
  useGetHistorificacionQuery,
  useRefetchQueriesPartMutation,
  useGetPartAllQuery,
  useGetProyAllQuery,
} = participantesApi;

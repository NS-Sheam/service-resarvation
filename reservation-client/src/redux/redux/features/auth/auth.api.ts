import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
    }),

    customerRegistration: builder.mutation({
      query: (userInfo) => ({
        url: "/users/create-customer",
        method: "POST",
        body: userInfo,
      }),
    }),
    providerRegistration: builder.mutation({
      query: (userInfo) => ({
        url: "/users/create-provider",
        method: "POST",
        body: userInfo,
      }),
    }),
    getMyInfo: builder.query({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
    }),
  }),
});

export const { useLoginMutation, useCustomerRegistrationMutation, useProviderRegistrationMutation, useGetMyInfoQuery } =
  authApi;

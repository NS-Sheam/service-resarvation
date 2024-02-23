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
    changePassword: builder.mutation({
      query: (payload) => ({
        url: "/auth/change-password",
        method: "POST",
        body: payload,
      }),
    }),
    forgetPassword: builder.mutation({
      query: (email) => ({
        url: "/auth/forget-password",
        method: "POST",
        body: email,
      }),
    }),
    resetPassword: builder.mutation({
      query: (payload) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: payload,
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

export const {
  useLoginMutation,
  useCustomerRegistrationMutation,
  useProviderRegistrationMutation,
  useChangePasswordMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
  useGetMyInfoQuery,
} = authApi;

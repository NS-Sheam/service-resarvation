import { TCustomer, TProvider, TReduxResponse } from "../../types";
import { baseApi } from "../api/baseApi";

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
    verifyEmail: builder.mutation({
      query: (payload) => {
        return {
          url: "/auth/verify-email",
          method: "POST",
          body: payload,
        };
      },
    }),
    changePassword: builder.mutation({
      query: (payload) => ({
        url: "/auth/change-password",
        method: "POST",
        body: payload,
      }),
    }),
    forgetPassword: builder.mutation({
      query: (payload) => ({
        url: "/auth/forget-password",
        method: "POST",
        body: payload,
      }),
    }),
    resetPassword: builder.mutation({
      query: (payload) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: payload.data,
        headers: {
          Authorization: payload.token,
        },
      }),
    }),

    getMyInfo: builder.query({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
      transformResponse: (response: TReduxResponse<TProvider | TCustomer>) => {
        return {
          data: response.data,
        };
      },
      providesTags: ["user"],
    }),
  }),
});

export const {
  useLoginMutation,
  useCustomerRegistrationMutation,
  useProviderRegistrationMutation,
  useVerifyEmailMutation,
  useChangePasswordMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
  useGetMyInfoQuery,
} = authApi;

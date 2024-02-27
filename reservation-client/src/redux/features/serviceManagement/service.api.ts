import { TCustomer, TProvider, TReduxResponse } from "../../../types";
import { baseApi } from "../../api/baseApi";

const serviceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCustomers: builder.query({
      query: () => ({
        url: "/customers",
        method: "GET",
      }),
      transformResponse: (response: TReduxResponse<TCustomer[]>) => response.data,
    }),

    getSingleCustomer: builder.query({
      query: (id: string) => ({
        url: `/customers/${id}`,
        method: "GET",
      }),
      transformResponse: (response: TReduxResponse<TCustomer>) => response.data,
    }),

    updateCustomer: builder.mutation({
      query: ({ id, body }: { id: string; body: Partial<TCustomer> }) => ({
        url: `/customers/${id}`,
        method: "PATCH",
        body: body,
      }),
      transformResponse: (response: TReduxResponse<TCustomer>) => response.data,
    }),

    getProviders: builder.query({
      query: () => ({
        url: "/providers",
        method: "GET",
      }),
      transformResponse: (response: TReduxResponse<TProvider[]>) => response.data,
    }),
    getSingleProvider: builder.query({
      query: (id: string) => ({
        url: `/providers/${id}`,
        method: "GET",
      }),
      transformResponse: (response: TReduxResponse<TProvider>) => response.data,
    }),
    updateProvider: builder.mutation({
      query: ({ id, body }: { id: string; body: Partial<TProvider> }) => ({
        url: `/providers/${id}`,
        method: "PATCH",
        body: body,
      }),
      transformResponse: (response: TReduxResponse<TProvider>) => response.data,
    }),
  }),
});

export const {
  useGetCustomersQuery,
  useGetSingleCustomerQuery,
  useUpdateCustomerMutation,
  useGetProvidersQuery,
  useGetSingleProviderQuery,
  useUpdateProviderMutation,
} = serviceApi;

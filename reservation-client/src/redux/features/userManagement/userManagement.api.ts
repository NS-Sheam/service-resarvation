import { TReduxResponse, TCustomer, TProvider, TQueryParams } from "../../../types";
import { baseApi } from "../../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCustomers: builder.query({
      query: () => ({
        url: "/customers",
        method: "GET",
      }),
      providesTags: ["customer"],
      transformResponse: (response: TReduxResponse<TCustomer[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    getSingleCustomer: builder.query({
      query: (id: string) => ({
        url: `/customers/${id}`,
        method: "GET",
      }),
      providesTags: ["customer"],
      transformResponse: (response: TReduxResponse<TCustomer>) => response.data,
    }),

    updateCustomer: builder.mutation({
      query: ({ id, body }: { id: string; body: any }) => ({
        url: `/customers/${id}`,
        method: "PATCH",
        body: body,
      }),
      invalidatesTags: ["customer"],
      transformResponse: (response: TReduxResponse<TCustomer>) => response.data,
    }),

    getProviders: builder.query({
      query: (args: TQueryParams[]) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParams) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/providers",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["provider"],
      transformResponse: (response: TReduxResponse<TProvider[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    getSingleProvider: builder.query({
      query: (id: string) => ({
        url: `/providers/${id}`,
        method: "GET",
      }),
      providesTags: ["provider"],
      transformResponse: (response: TReduxResponse<TProvider>) => response.data,
    }),
    updateProvider: builder.mutation({
      query: ({ id, body }: { id: string; body: any }) => ({
        url: `/providers/${id}`,
        method: "PATCH",
        body: body,
      }),
      invalidatesTags: ["provider"],
      transformResponse: (response: TReduxResponse<TProvider>) => response.data,
    }),
    deleteProvider: builder.mutation({
      query: (id: string) => ({
        url: `/providers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["provider"],
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
  useDeleteProviderMutation,
} = userManagementApi;

import { TQueryParams, TReduxResponse, TService } from "../../../types";
import { baseApi } from "../../api/baseApi";

const serviceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getServices: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParams) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/services",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["service"],
      transformResponse: (response: TReduxResponse<TService[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    addService: builder.mutation({
      query: (body: Partial<TService>) => ({
        url: "/services",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["service"],
      transformResponse: (response: TReduxResponse<TService>) => response.data,
    }),

    getSingleService: builder.query({
      query: (id: string) => ({
        url: `/services/${id}`,
        method: "GET",
      }),
      providesTags: ["service"],
      transformResponse: (response: TReduxResponse<TService>) => response.data,
    }),

    updateService: builder.mutation({
      query: ({ id, body }: { id: string; body: Partial<TService> }) => ({
        url: `/services/${id}`,
        method: "PATCH",
        body: body,
      }),
      invalidatesTags: ["service"],
      transformResponse: (response: TReduxResponse<TService>) => response.data,
    }),
  }),
});

export const { useGetServicesQuery, useAddServiceMutation, useGetSingleServiceQuery, useUpdateServiceMutation } =
  serviceApi;

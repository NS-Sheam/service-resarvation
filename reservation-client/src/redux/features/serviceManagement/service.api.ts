import { TReduxResponse, TService } from "../../../types";
import { baseApi } from "../../api/baseApi";

const serviceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getServices: builder.query({
      query: () => ({
        url: "/services",
        method: "GET",
      }),
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
      transformResponse: (response: TReduxResponse<TService>) => response.data,
    }),

    getSingleService: builder.query({
      query: (id: string) => ({
        url: `/services/${id}`,
        method: "GET",
      }),
      transformResponse: (response: TReduxResponse<TService>) => response.data,
    }),

    updateService: builder.mutation({
      query: ({ id, body }: { id: string; body: Partial<TService> }) => ({
        url: `/services/${id}`,
        method: "PATCH",
        body: body,
      }),
      transformResponse: (response: TReduxResponse<TService>) => response.data,
    }),
  }),
});

export const { useGetServicesQuery, useAddServiceMutation, useGetSingleServiceQuery, useUpdateServiceMutation } =
  serviceApi;

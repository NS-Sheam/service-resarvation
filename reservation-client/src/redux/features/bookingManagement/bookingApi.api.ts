import { TBooking, TReduxResponse } from "../../../types";
import { baseApi } from "../../api/baseApi";

const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBookings: builder.query({
      query: () => ({
        url: "/booking",
        method: "GET",
      }),
      providesTags: ["booking"],
      transformResponse: (response: TReduxResponse<TBooking[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    addBooking: builder.mutation({
      query: (body: Partial<TBooking>) => {
        return {
          url: "/booking",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["booking"],
      transformResponse: (response: TReduxResponse<TBooking>) => response.data,
    }),

    getSingleBooking: builder.query({
      query: (id: string) => ({
        url: `/booking/${id}`,
        method: "GET",
      }),
      providesTags: ["booking"],
      transformResponse: (response: TReduxResponse<TBooking>) => response.data,
    }),
    cancelBooking: builder.mutation({
      query: (id: string) => ({
        url: `/booking/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["booking"],
      transformResponse: (response: TReduxResponse<TBooking>) => response.data,
    }),
    getMyBookings: builder.query({
      query: (role) => {
        return {
          url: `/booking/${role}`,
          method: "GET",
        };
      },
      providesTags: ["booking"],
      transformResponse: (response: TReduxResponse<TBooking[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    getServiceBookings: builder.query({
      query: (serviceId: string) => ({
        url: `/booking/service/${serviceId}`,
        method: "GET",
      }),
      providesTags: ["booking"],
      transformResponse: (response: TReduxResponse<TBooking[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    getProviderBookings: builder.query({
      query: () => ({
        url: "/booking/provider",
        method: "GET",
      }),
      providesTags: ["booking"],
      transformResponse: (response: TReduxResponse<TBooking[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    getProviderBookingByProviderId: builder.query({
      query: (id: string) => ({
        url: `/booking/provider/${id}`,
        method: "GET",
      }),
      providesTags: ["booking"],
      transformResponse: (response: TReduxResponse<TBooking[]>) => response.data,
    }),
  }),
});

export const {
  useGetBookingsQuery,
  useAddBookingMutation,
  useGetSingleBookingQuery,
  useGetMyBookingsQuery,
  useGetServiceBookingsQuery,
  useGetProviderBookingByProviderIdQuery,
  useCancelBookingMutation,
} = bookingApi;

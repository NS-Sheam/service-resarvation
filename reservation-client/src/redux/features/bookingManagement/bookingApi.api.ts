import { TBooking, TReduxResponse } from "../../../types";
import { baseApi } from "../../api/baseApi";

const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBookings: builder.query({
      query: () => ({
        url: "/booking",
        method: "GET",
      }),
      transformResponse: (response: TReduxResponse<TBooking[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    addBooking: builder.mutation({
      query: (body: Partial<TBooking>) => {
        console.log(body);

        return {
          url: "/booking",
          method: "POST",
          body,
        };
      },
      transformResponse: (response: TReduxResponse<TBooking>) => response.data,
    }),

    getSingleBooking: builder.query({
      query: (id: string) => ({
        url: `/booking/${id}`,
        method: "GET",
      }),
      transformResponse: (response: TReduxResponse<TBooking>) => response.data,
    }),
    cancelBooking: builder.mutation({
      query: (id: string) => ({
        url: `/booking/${id}`,
        method: "DELETE",
      }),
      transformResponse: (response: TReduxResponse<TBooking>) => response.data,
    }),
    getMyBookings: builder.query({
      query: (role) => {
        return {
          url: `/booking/${role}`,
          method: "GET",
        };
      },
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
      transformResponse: (response: TReduxResponse<TBooking[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
  }),
});

export const { useGetBookingsQuery, useAddBookingMutation, useGetSingleBookingQuery, useGetMyBookingsQuery } =
  bookingApi;

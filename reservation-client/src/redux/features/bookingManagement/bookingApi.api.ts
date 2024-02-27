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
      query: (body: Partial<TBooking>) => ({
        url: "/booking",
        method: "POST",
        body: body,
      }),
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
  }),
});

export const { useGetBookingsQuery, useAddBookingMutation, useGetSingleBookingQuery } = bookingApi;
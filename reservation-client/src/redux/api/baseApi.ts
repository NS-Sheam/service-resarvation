import { BaseQueryApi, BaseQueryFn, FetchArgs, FetchBaseQueryError, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { RootState } from "../store";
import { createApi } from "@reduxjs/toolkit/query/react";
import { logOut, setUser } from "../auth/auth.Slice";
import { TReduxResponse } from "../../types";
import { toast } from "sonner";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:4000/api/v1",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `${token}`);
    }

    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<FetchArgs, BaseQueryApi, FetchBaseQueryError> = async (
  arg,
  api,
  extraOptions
): Promise<any> => {
  let result = (await baseQuery(arg, api, extraOptions)) as TReduxResponse<any>;

  if (result?.error?.statusCode === 401) {
    const res = await fetch("http://localhost:4000/api/v1/auth/refresh-token", {
      method: "POST",
      credentials: "include",
    });
    if (result.error) {
      // toast.error(result?.error?.message);
    }
    const data = await res.json();

    if (data?.data?.accessToken) {
      const user = (api.getState() as RootState).auth.user;
      result = (await baseQuery(arg, api, extraOptions)) as TReduxResponse<any>;
      api.dispatch(setUser({ user, token: data.data.accessToken }));
    } else {
      api.dispatch(logOut());
    }
  }
  if (result.error) {
    toast.error(result?.error?.data?.errorSources[0].message || result?.error?.data?.message, {
      duration: 2000,
    });
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  endpoints: () => ({}),
  tagTypes: ["user", "customer", "provider", "service"],
});

import { BaseQueryApi } from "@reduxjs/toolkit/query";

export type TError = {
  statusCode: number;
  data: {
    message: string;
    errorSources: {
      path: string | number;
      message: string;
    }[];
  };
};

export type TMeta = {
  limit: number;
  page: number;
  total: number;
  totalPages: number;
};

export type TResponse<T> = {
  status: number;
  message: string;
  data?: T;
  error?: TError;
  meta?: TMeta;
};

export type TReduxResponse<T> = TResponse<T> & BaseQueryApi;

export type TQueryParams = {
  name: string;
  value: string | number;
};

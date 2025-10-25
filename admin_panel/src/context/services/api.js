import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_API_URL}/api`,
  prepareHeaders: (headers) => {
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");

    if (username && password) {
      headers.set("Authorization", `Basic ${btoa(`${username}:${password}`)}`);
    }

    headers.set("Cache-Control", "no-cache");
    return headers;
  },
});

const baseQuery = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    window.location.href = "/";
  }

  return result;
};

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 1 });

export const api = createApi({
  reducerPath: "splitApi",
  baseQuery: baseQueryWithRetry,
  tagTypes: [],
  endpoints: () => ({}),
});

import { api } from "./api";

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => ({
        url: "/user/get",
      }),
      providesTags: ["User"],
    }),
  }),
});

export const { useGetUserQuery } = userApi;

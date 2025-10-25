import { api } from "./api";

export const contentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createContent: builder.mutation({
      query: (body) => ({ url: "/content/create", method: "POST", body }),
      invalidatesTags: ["Content"],
    }),
    getContent: builder.query({
      query: (params) => ({
        url: "/content/get",
        method: "GET",
        params,
      }),
      providesTags: ["Content"],
    }),
  }),
});

export const { useCreateContentMutation, useGetContentQuery } = contentApi;

import { api } from "./api";

export const fileApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createFile: builder.mutation({
      query: (body) => ({ url: "/file/create", method: "POST", body }),
      invalidatesTags: ["File"],
    }),
    getFile: builder.query({
      query: () => ({
        url: "/file/get",
      }),
      providesTags: ["File"],
    }),
  }),
});

export const { useCreateFileMutation, useGetFileQuery } = fileApi;

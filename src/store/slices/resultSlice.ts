import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "../../api";
import { IResult } from "../../constants/types";

export const ResultSliceApi = createApi({
  reducerPath: "result",
  baseQuery: fetchBaseQuery({ baseUrl: `${baseURL}/result` }),
  tagTypes: ["Result"],
  endpoints: (builder) => ({
    getAllResult: builder.query<IResult[], void>({
      query: () => {
        return { url: "/" };
      },
    }),

    getResultById: builder.query<IResult, string>({
      query: (id) => `/${id}`,
    }),

    deleteResult: builder.mutation<void, { id: string }>({
      query: (args) => {
        return {
          url: `/${args.id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (result, error, arg) => [
        { type: "Result", _id: arg.id },
      ],
    }),
    updateResult: builder.mutation<void, { id: string; body: any }>({
      query: (args) => {
        return {
          url: `/${args.id}`,
          body: args.body,
          method: "PATCH",
        };
      },
    }),
  }),
});

export const {
  useGetAllResultQuery,
  useGetResultByIdQuery,
  useUpdateResultMutation,
  useDeleteResultMutation,
} = ResultSliceApi;

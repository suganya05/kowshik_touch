import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "../../api";
import { IFeesType, IUnpaidStudentsData } from "../../constants/types";

export const feesSliceApi = createApi({
  reducerPath: "fees",
  baseQuery: fetchBaseQuery({ baseUrl: `${baseURL}/fees` }),
  tagTypes: ["Fee"],
  endpoints: (builder) => ({
    getAllFees: builder.query<IFeesType[], { month: string; year: number }>({
      query: ({ month, year }) => {
        return { url: "/", params: { month, year } };
      },
    }),
    getUnpaidFees: builder.query<IUnpaidStudentsData[], { month: string; year: number }>({
      query: ({ month, year }) => {
        return { url: "/unpaid-students", params: { month, year } };
      },
    }),
    updateFees: builder.mutation<void, { id: string; body: any }>({
      query: (args) => {
        return {
          url: `/${args.id}`,
          body: args.body,
          method: "PATCH",
        };
      },
    }),
    deleteFees: builder.mutation<void, { id: string }>({
      query: (args) => {
        return {
          url: `/${args.id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useGetAllFeesQuery,
  useDeleteFeesMutation,
  useUpdateFeesMutation,
  useGetUnpaidFeesQuery,
} = feesSliceApi;

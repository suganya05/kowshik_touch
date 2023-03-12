import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "../../api";
import { IClass } from "../../constants/types";

interface IClasses extends IClass {}

export const ClassSliceApi = createApi({
  reducerPath: "Class",
  baseQuery: fetchBaseQuery({ baseUrl: `${baseURL}/class` }),
  tagTypes: ["Class"],
  endpoints: (builder) => ({
    getAllClass: builder.query<IClasses[], void>({
      query: () => {
        return { url: "/" };
      },
    }),

    getClassById: builder.query<IClass, string>({
      query: (id) => `/${id}`,
    }),

    deleteClass: builder.mutation<void, { id: string }>({
      query: (args) => {
        return {
          url: `/${args.id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (result, error, arg) => [{ type: "Class", _id: arg.id }],
    }),
    updateClass: builder.mutation<void, { id: string; body: any }>({
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
  useGetAllClassQuery,
  useGetClassByIdQuery,
  useUpdateClassMutation,
  useDeleteClassMutation,
} = ClassSliceApi;

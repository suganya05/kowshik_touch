import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "../../api";
import { IFaculty } from "../../constants/types";

export const facultySliceApi = createApi({
  reducerPath: "faculty",
  baseQuery: fetchBaseQuery({ baseUrl: `${baseURL}/faculty` }),
  tagTypes: ["Faculty"],
  endpoints: (builder) => ({
    getAllFacultys: builder.query<IFaculty[], void>({
      query: () => {
        return { url: "/" };
      },
    }),
    getFacultyById: builder.query<IFaculty, string>({
      query: (id) => `/${id}`,
    }),
    deleteFaculty: builder.mutation<void, { id: string }>({
      query: (args) => {
        return {
          url: `/${args.id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const { useGetAllFacultysQuery, useGetFacultyByIdQuery, useDeleteFacultyMutation } =
  facultySliceApi;

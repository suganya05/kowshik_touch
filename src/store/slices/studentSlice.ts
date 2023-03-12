import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "../../api";
import { IFeesType, IStudent } from "../../constants/types";

interface IStudents extends IStudent {
  feesDetails: IFeesType[];
}

export const studentSliceApi = createApi({
  reducerPath: "students",
  baseQuery: fetchBaseQuery({ baseUrl: `${baseURL}/student` }),
  tagTypes: ["Student"],
  endpoints: (builder) => ({
    getAllStudents: builder.query<IStudents[], { standard: string }>({
      query: ({ standard }) => {
        return { url: "/", params: { standard } };
      },
      providesTags: (result, error, arg) =>
        result
          ? [...result.map(({ _id }) => ({ type: "Student" as const, _id })), "Student"]
          : ["Student"],
    }),
    getStudentById: builder.query<IStudent, string>({
      query: (id) => `/${id}`,
    }),
    deleteStudent: builder.mutation<void, { id: string }>({
      query: (args) => {
        return {
          url: `/${args.id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (result, error, arg) => [{ type: "Student", _id: arg.id }],
    }),
  }),
});

export const { useGetAllStudentsQuery, useGetStudentByIdQuery, useDeleteStudentMutation } =
  studentSliceApi;

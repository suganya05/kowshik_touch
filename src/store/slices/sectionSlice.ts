import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "../../api";
import { ISection, ISectionForThree } from "../../constants/types";

interface ISectiones extends ISection {}

export const sectionSliceApi = createApi({
  reducerPath: "Section",
  baseQuery: fetchBaseQuery({ baseUrl: `${baseURL}/section` }),
  tagTypes: ["Section"],
  endpoints: (builder) => ({
    getAllSection: builder.query<ISectiones[], ISectionForThree>({
      query: ({ chapterNo, standard, title, subject }) => {
        return {
          url: "/",
          params: {
            standard: standard,
            chapterNo: chapterNo,
            title: title,
            subject: subject,
          },
        };
      },
    }),

    getSectionById: builder.query<ISection, string>({
      query: (id) => `/${id}`,
    }),

    deleteSection: builder.mutation<void, { id: string }>({
      query: (args) => {
        return {
          url: `/${args.id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (result, error, arg) => [
        { type: "Section", _id: arg.id },
      ],
    }),
    updateSection: builder.mutation<void, { id: string; body: any }>({
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
  useGetAllSectionQuery,
  useGetSectionByIdQuery,
  useUpdateSectionMutation,
  useDeleteSectionMutation,
} = sectionSliceApi;

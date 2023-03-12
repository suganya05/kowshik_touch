import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "../../api";
import { IDashboardData, ISchoolData } from "../../constants/types";

export const dashboardSliceApi = createApi({
  reducerPath: "dashboard",
  baseQuery: fetchBaseQuery({ baseUrl: `${baseURL}` }),
  endpoints: (builder) => ({
    getDashboardDetails: builder.query<{ data: IDashboardData }, void>({
      query: () => {
        return { url: "/dashboard/" };
      },
    }),
    getSchoolsList: builder.query<ISchoolData[], void>({
      query: () => {
        return { url: "/school/" };
      },
    }),
    addSchool: builder.mutation<ISchoolData, { place: string; schoolName: string }>({
      query: (data) => {
        return { url: "/school/add", body: data, method: "POST" };
      },
    }),
  }),
});

export const { useGetDashboardDetailsQuery, useGetSchoolsListQuery, useAddSchoolMutation } =
  dashboardSliceApi;

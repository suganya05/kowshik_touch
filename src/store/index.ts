import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import { studentSliceApi } from "./slices/studentSlice";
import { feesSliceApi } from "./slices/feesSlice";
import { facultySliceApi } from "./slices/facultySlice";
import { dashboardSliceApi } from "./slices/dashboardSlice";
import generalSlice from "./slices/generalSlice";
import snackbarSlice from "./slices/snackbarSlice";
import { ClassSliceApi } from "./slices/classSlice";
import { sectionSliceApi } from "./slices/sectionSlice";
import { ResultSliceApi } from "./slices/resultSlice";

const store = configureStore({
  reducer: {
    [studentSliceApi.reducerPath]: studentSliceApi.reducer,
    [feesSliceApi.reducerPath]: feesSliceApi.reducer,
    [facultySliceApi.reducerPath]: facultySliceApi.reducer,
    [dashboardSliceApi.reducerPath]: dashboardSliceApi.reducer,
    [generalSlice.name]: generalSlice.reducer,
    [snackbarSlice.name]: snackbarSlice.reducer,
    [ClassSliceApi.reducerPath]: ClassSliceApi.reducer,
    [sectionSliceApi.reducerPath]: sectionSliceApi.reducer,
    [ResultSliceApi.reducerPath]: ResultSliceApi.reducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;

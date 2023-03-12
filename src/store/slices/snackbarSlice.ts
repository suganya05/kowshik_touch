import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISnackBar } from "../../constants/types";

const initialState: ISnackBar = {
  isOpen: false,
  autoHideDuration: 6000,
  message: "",
  severity: "info",
};

const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    openSnackbar: (
      state,
      action: PayloadAction<{ isOpen: boolean; severity: ISnackBar["severity"]; message: string }>
    ) => {
      state.isOpen = action.payload.isOpen;
      state.message = action.payload.message;
      state.severity = action.payload.severity;
    },
    closeSnackbar: (state, action: PayloadAction<void>) => {
      state.isOpen = false;
      state.message = "";
    },
  },
});

export const { openSnackbar, closeSnackbar } = snackbarSlice.actions;

export default snackbarSlice;

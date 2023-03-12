import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const generalSlice = createSlice({
  name: "general",
  initialState: { isDirty: false },
  reducers: {
    updateDirtyStatus: (state, action: PayloadAction<boolean>) => {
      state.isDirty = action.payload;
    },
  },
});

export const { updateDirtyStatus } = generalSlice.actions;

export default generalSlice;

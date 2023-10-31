import { updateCategoryProcess } from "@/src/api";
import { createSlice } from "@reduxjs/toolkit";

export const updateCategorySlice = createSlice({
  name: "updateCategory",
  initialState: {
    data: undefined,
    status: undefined,
    isLoading: false,
    message: undefined,
  },
  reducers: {
    resetUpdateCategory: (state) => {
      state.isLoading = {};
      state.status = undefined;
      state.message = {};
    },
  },
  extraReducers: {
    [updateCategoryProcess.pending]: (state) => {
      state.isLoading = true;
    },
    [updateCategoryProcess.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.data =
        action.payload?.data !== undefined
          ? action.payload?.data
          : action.payload;
      state.status = action.payload?.status;
      state.message = action.payload?.message;
    },
    [updateCategoryProcess.rejected]: (state, action) => {
      state.isLoading = false;
      state.status = "error";
      state.message = action.error?.message;
    },
  },
});

export const { resetUpdateCategory } = updateCategorySlice.actions;

export default updateCategorySlice.reducer;

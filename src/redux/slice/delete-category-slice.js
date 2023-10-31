import { deleteCategoryProcess } from "@/src/api";
import { createSlice } from "@reduxjs/toolkit";
export const deleteCategorySlice = createSlice({
  name: "deleteCategory",
  initialState: {
    isLoading: {},
    status: {},
    message: {},
  },
  reducers: {
    resetDeleteCategory: (state) => {
      state.isLoading = {};
      state.status = {};
      state.message = {};
    },
  },
  extraReducers: {
    [deleteCategoryProcess.pending]: (state) => {
      state.isLoading = { ...state.isLoading, deleteCategoryProcess: true };
    },
    [deleteCategoryProcess.fulfilled]: (state, action) => {
      state.isLoading = { ...state.isLoading, deleteCategoryProcess: false };
      state.status = "success"
      state.message = {
        ...state.message,
        deleteCategoryProcess: action.payload?.message,
      };
    },
    [deleteCategoryProcess.rejected]: (state, action) => {
      state.isLoading = { ...state.isLoading, deleteCategoryProcess: false };
      state.status = "error";
    },
  },
});
export const { resetDeleteCategory } = deleteCategorySlice.actions;
export default deleteCategorySlice.reducer;

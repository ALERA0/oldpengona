import { updateOutgoingDocProductQuantityProcess } from "../../api/index";
import { createSlice } from "@reduxjs/toolkit";

export const updateOutgoingDocProductQuantitySlice = createSlice({
  name: "updateOutgoingProductQuantity",
  initialState: {
    data: undefined,
    status: undefined,
    isLoading: false,
  },
  reducers: {
    resetOutgoingProductQuantityUpdate: (state) => {
      state.isLoading = {};
      state.status = {};
      state.message = {};
    },
  },
  extraReducers: {
    [updateOutgoingDocProductQuantityProcess.pending]: (state) => {
      state.isLoading = true;
    },
    [updateOutgoingDocProductQuantityProcess.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.data =
        action.payload?.data !== undefined
          ? action.payload?.data
          : action.payload;
      state.status = action.payload?.status;
      state.message = action.payload?.message;
    },
    [updateOutgoingDocProductQuantityProcess.rejected]: (state, action) => {
      state.isLoading = false;
      state.status = "error";
      state.message = action.error?.message;
    },
  },
});
export const { resetOutgoingProductQuantityUpdate } =
  updateOutgoingDocProductQuantitySlice.actions;

export default updateOutgoingDocProductQuantitySlice.reducer;

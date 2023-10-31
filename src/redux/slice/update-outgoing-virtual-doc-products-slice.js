import { updateOutgoingVirtualDocProductsProcess } from "@/src/api";
import { createSlice } from "@reduxjs/toolkit";

export const updateOutgoingVirtualDocProductsSlice = createSlice({
  name: "updateOutgoingVirtualDocProducts",
  initialState: {
    data: undefined,
    status: undefined,
    isLoading: false,
    message: undefined,
  },
  reducers: {
    resetUpdateOutgoingVirtualDocProducts: (state) => {
      state.isLoading = {};
      state.status = {};
      state.message = {};
      state.data = {};
    },
  },
  extraReducers: {
    [updateOutgoingVirtualDocProductsProcess.pending]: (state) => {
      state.isLoading = true;
    },
    [updateOutgoingVirtualDocProductsProcess.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.data =
        action.payload?.data !== undefined
          ? action.payload?.data
          : action.payload;
      state.status = action.payload?.status;
      state.message = action.payload?.message;
    },
    [updateOutgoingVirtualDocProductsProcess.rejected]: (state, action) => {
      state.isLoading = false;
      state.status = "error";
      state.message = action.error?.message;
    },
  },
});

export const { resetUpdateOutgoingVirtualDocProducts } =
updateOutgoingVirtualDocProductsSlice.actions;

export default updateOutgoingVirtualDocProductsSlice.reducer;

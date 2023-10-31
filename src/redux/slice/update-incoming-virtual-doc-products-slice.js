import { updateIncomingVirtualDocProductsProcess } from "@/src/api";
import { createSlice } from "@reduxjs/toolkit";

export const updateIncomingVirtualDocProductsSlice = createSlice({
  name: "updateIncomingVirtualDocProducts",
  initialState: {
    data: undefined,
    status: undefined,
    isLoading: false,
    message: undefined,
  },
  reducers: {
    resetUpdateIncomingVirtualDocProducts: (state) => {
      state.isLoading = {};
      state.status = {};
      state.message = {};
      state.data = {};
    },
  },
  extraReducers: {
    [updateIncomingVirtualDocProductsProcess.pending]: (state) => {
      state.isLoading = true;
    },
    [updateIncomingVirtualDocProductsProcess.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.data =
        action.payload?.data !== undefined
          ? action.payload?.data
          : action.payload;
      state.status = action.payload?.status;
      state.message = action.payload?.message;
    },
    [updateIncomingVirtualDocProductsProcess.rejected]: (state, action) => {
      state.isLoading = false;
      state.status = "error";
      state.message = action.error?.message;
    },
  },
});

export const { resetUpdateIncomingVirtualDocProducts } =
  updateIncomingVirtualDocProductsSlice.actions;

export default updateIncomingVirtualDocProductsSlice.reducer;

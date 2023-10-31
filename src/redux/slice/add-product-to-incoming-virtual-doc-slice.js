import { addProductToIncomingVirtualDocProcess } from "../../api/index";
import { createSlice } from "@reduxjs/toolkit";

export const addProductToIncomingVirtualDocSlice = createSlice({
  name: "addProductToIncomingVirtualDoc",
  initialState: {
    data: undefined,
    status: undefined,
    isLoading: false,
    message: undefined,
  },
  reducers: {
    resetAddIncomingProductToVirtualDoc: (state) => {
      state.data = undefined;
      state.isLoading = {};
      state.status = {};
      state.message = {};
    },
  },
  extraReducers: {
    [addProductToIncomingVirtualDocProcess.pending]: (state) => {
      state.isLoading = true;
    },
    [addProductToIncomingVirtualDocProcess.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.data =
        action.payload?.data !== undefined
          ? action.payload?.data
          : action.payload;
      state.status = action.payload?.status;
      state.message = action.payload?.message;
    },
    [addProductToIncomingVirtualDocProcess.rejected]: (state, action) => {
      state.isLoading = false;
      state.message = action.error?.message;
      state.status = "error";
    },
  },
});

export const { resetAddIncomingProductToVirtualDoc } =
  addProductToIncomingVirtualDocSlice.actions;
export default addProductToIncomingVirtualDocSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { getVirtualIncomingProductDetailProcess } from "../../api";
export const getVirtualIncomingProductDetailSlice = createSlice({
  name: "virtualIncomingProductDetail",
  initialState: {
    isLoading: {},
    status: {},
    message: {},
    data: undefined,
  },
  reducers: {
    resetGetVirtualIncomingProductDetail: (state) => {
      state.data = undefined;
      state.isLoading = {};
      state.status = {};
      state.message = {};
    },
  },
  extraReducers: {
    [getVirtualIncomingProductDetailProcess.pending]: (state) => {
      state.isLoading = {
        ...state.isLoading,
        getVirtualIncomingProductDetailProcess: true,
      };
    },
    [getVirtualIncomingProductDetailProcess.fulfilled]: (state, action) => {
      state.isLoading = {
        ...state.isLoading,
        getVirtualIncomingProductDetailProcess: false,
      };
      state.status = action.payload?.status;
      state.message = {
        ...state.message,
        getVirtualIncomingProductDetailProcess: action.payload?.message,
      };
      state.data = action.payload?.data;
    },
    [getVirtualIncomingProductDetailProcess.rejected]: (state, action) => {
      state.isLoading = {
        ...state.isLoading,
        getVirtualIncomingProductDetailProcess: false,
      };
      state.message = action.error?.message;
      state.status = "error";
    },
  },
});
export const { resetGetVirtualIncomingProductDetail } =
  getVirtualIncomingProductDetailSlice.actions;
export default getVirtualIncomingProductDetailSlice.reducer;

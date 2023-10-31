import { addNewOrderProcess } from "../../api/index";
import { createSlice } from "@reduxjs/toolkit";

export const addNewOrderSlice = createSlice({
  name: "newOrder",
  initialState: {
    data: undefined,
    status: undefined,
    isLoading: false,
    message: undefined,
  },
  reducers: {
    resetAddOrder: (state) => {
      state.data = undefined;
      state.isLoading = {};
      state.status = {};
      state.message = {};
    },
  },
  extraReducers: {
    [addNewOrderProcess.pending]: (state) => {
      state.isLoading = true;
    },
    [addNewOrderProcess.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.data =
        action.payload?.savedOrder !== undefined
          ? action.payload?.savedOrder
          : action.payload;
      state.status = action.payload?.status;
      state.message = action.payload?.message;
    },
    [addNewOrderProcess.rejected]: (state, action) => {
      state.isLoading = false;
      state.status = "error";
      state.message = action.error.message;
    },
  },
});

export const { resetAddOrder } = addNewOrderSlice.actions;
export default addNewOrderSlice.reducer;

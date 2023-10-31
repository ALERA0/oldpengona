import { addIncomingProductWithProductsProcess } from "@/src/api";
import { createSlice } from "@reduxjs/toolkit";

export const addIncomingProductWithProductsSlice = createSlice({
  name: "addIncomingProductWithProducts",
  initialState: {
    data: undefined,
    status: undefined,
    isLoading: false,
    message: {},
  },
  reducers: {
    resetAddIncomingProductWithProducts: (state) => {
      state.data = undefined;
      state.isLoading = {};
      state.status = {};
      state.message = {};
    },
  },
  extraReducers: {
    [addIncomingProductWithProductsProcess.pending]: (state) => {
      state.isLoading = true;
    },
    [addIncomingProductWithProductsProcess.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.data =
        action.payload?.data !== undefined
          ? action.payload?.data
          : action.payload;
      state.status = action.payload?.status;
      state.message = action.payload?.message;
    },
    [addIncomingProductWithProductsProcess.rejected]: (state, action) => {
      state.isLoading = false;
      state.status = "error";
      state.message = action.error?.message;
    },
  },
});

export const {
  resetAddIncomingProductWithProducts, 
} = addIncomingProductWithProductsSlice.actions;
export default addIncomingProductWithProductsSlice.reducer;

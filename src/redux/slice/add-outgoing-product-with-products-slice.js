import { addOutgoingProductWithProductsProcess } from "@/src/api";
import { createSlice } from "@reduxjs/toolkit";

export const addOutgoingProductWithProductsSlice = createSlice({
    name: "addOutgoingProductWithProducts",
    initialState: {
        data: undefined,
        status: undefined,
        isLoading: false,
    },
    reducers: {
        resetAddOutgoingProductWithProducts: (state) => {
            state.data = undefined;
            state.isLoading = {};
            state.status = {};
            state.message = {};
        },

    },
    extraReducers: {
        [addOutgoingProductWithProductsProcess.pending]: (state) => {
            state.isLoading = true;
        },
        [addOutgoingProductWithProductsProcess.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.data =
                action.payload?.data !== undefined
                    ? action.payload?.data
                    : action.payload;
            state.status = action.payload?.status;
            state.message = action.payload?.message;
        },
        [addOutgoingProductWithProductsProcess.rejected]: (state, action) => {
            state.isLoading = false;
            state.status = "error";
            state.message = action.error?.message;
        },
    },
});

export const {
    resetAddOutgoingProductWithProducts,
} = addOutgoingProductWithProductsSlice.actions;
export default addOutgoingProductWithProductsSlice.reducer;
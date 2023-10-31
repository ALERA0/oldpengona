import { deleteProductFromOutgoingVirtualDocProcess } from '@/src/api';
import { createSlice } from '@reduxjs/toolkit';


export const deleteProductFromOutgoingVirtualDocSlice = createSlice({
    name: 'removeProductfromOutgoingDocvirtualDoc',
    initialState: {
        isLoading: {},
        status: {},
        message: {},
    },
    reducers: {
        resetDeleteProductFromOutgoingVirtualDoc: state => {
            state.isLoading = {};
            state.status = {};
            state.message = {};
        },
    },
    extraReducers: {
        [deleteProductFromOutgoingVirtualDocProcess.pending]: state => {
            state.isLoading = { ...state.isLoading, deleteProductFromOutgoingVirtualDocProcess: true };
        },
        [deleteProductFromOutgoingVirtualDocProcess.fulfilled]: (state, action) => {
            state.isLoading = { ...state.isLoading, deleteProductFromOutgoingVirtualDocProcess: false };
            state.status = action.payload.status;
            state.message = action.payload.message;

        },
        [deleteProductFromOutgoingVirtualDocProcess.rejected]: (state, action) => {
            state.isLoading = { ...state.isLoading, deleteProductFromOutgoingVirtualDocProcess: false };
            state.status = "error";
            state.message = action.error?.message;
        },
    },
});


export const { resetDeleteProductFromOutgoingVirtualDoc } = deleteProductFromOutgoingVirtualDocSlice.actions;
export default deleteProductFromOutgoingVirtualDocSlice.reducer;
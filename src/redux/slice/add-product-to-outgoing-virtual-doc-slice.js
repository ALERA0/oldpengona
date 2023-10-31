import { addProductToOutgoingVirtualDocProcess } from '../../api/index';
import { createSlice } from '@reduxjs/toolkit';

export const addProductToOutgoingVirtualDocSlice = createSlice({
    name: 'addProductToOutgoingVirtualDoc',
    initialState: {
        data: undefined,
        status: undefined,
        isLoading: false,
        message: undefined,
    },
    reducers: {
        resetAddProductToOutgoingVirtualDoc: state => {
            state.data = undefined;
            state.isLoading = {};
            state.status = {};
            state.message = {};
        },
    },
    extraReducers: {
        [addProductToOutgoingVirtualDocProcess.pending]: state => {
            state.isLoading = true;
        },
        [addProductToOutgoingVirtualDocProcess.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.data =
                action.payload?.data !== undefined
                    ? action.payload?.data
                    : action.payload;
            state.status = action.payload?.status;
            state.message = action.payload?.message;
        },
        [addProductToOutgoingVirtualDocProcess.rejected]: (state, action) => {
            state.isLoading = false;
            state.message = action.error?.message;
            state.status = "error"

        },
    },
});

export const { resetAddProductToOutgoingVirtualDoc } = addProductToOutgoingVirtualDocSlice.actions;
export default addProductToOutgoingVirtualDocSlice.reducer;
import { addIncomingProductToIncomingProductProcess } from '../../api/index';
import { createSlice } from '@reduxjs/toolkit';

export const addIncomingProductToIncomingProductSlice = createSlice({
    name: 'addProductToIncomingProduct',
    initialState: {
        data: undefined,
        status: undefined,
        isLoading: false,
    },
    reducers: {
        resetAddIncomingProductToIncomingProduct: state => {
            state.data = undefined;
            state.isLoading = {};
            state.status = {};
            state.message = {};
        },
    },
    extraReducers: {
        [addIncomingProductToIncomingProductProcess.pending]: state => {
            state.isLoading = true;
        },
        [addIncomingProductToIncomingProductProcess.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.data =
                action.payload?.data !== undefined
                    ? action.payload?.data
                    : action.payload;
            state.status = action.payload?.status;
            state.message = action.payload?.message;
        },
        [addIncomingProductToIncomingProductProcess.rejected]: (state,action) => {
            state.isLoading = false;
            state.status = 'error';
            state.message = action.error?.message;

        },
    },
});

export const { resetAddIncomingProductToIncomingProduct } = addIncomingProductToIncomingProductSlice.actions;
export default addIncomingProductToIncomingProductSlice.reducer;


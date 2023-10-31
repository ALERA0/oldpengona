import { createSlice } from '@reduxjs/toolkit';
import { getVirtualOutgoingProductDetailProcess } from '../../api';
export const getVirtualOutgoingProductDetailSlice = createSlice({
    name: 'virtualOutgoingProductDetail',
    initialState: {
        isLoading: {},
        status: {},
        message: {},
        data: undefined,
    },
    reducers: {
        resetGetVirtualOutgoingProductDetail: state => {
            state.data = undefined;
            state.isLoading = {};
            state.status = {};
            state.message = {};
        },
    },
    extraReducers: {
        [getVirtualOutgoingProductDetailProcess.pending]: state => {
            state.isLoading = { ...state.isLoading, getVirtualOutgoingProductDetailProcess: true };
        },
        [getVirtualOutgoingProductDetailProcess.fulfilled]: (state, action) => {
            state.isLoading = { ...state.isLoading, getVirtualOutgoingProductDetailProcess: false };
            state.status = {
                ...state.status,
                getVirtualOutgoingProductDetailProcess: action.payload?.status,
            };
            state.message = {
                ...state.message,
                getVirtualOutgoingProductDetailProcess: action.payload?.message,
            };
            state.data = action.payload?.data;
        },
        [getVirtualOutgoingProductDetailProcess.rejected]: (state, action) => {
            state.isLoading = { ...state.isLoading, getVirtualOutgoingProductDetailProcess: false };
            state.message = action.error?.message;

        },
    },
});
export const { resetGetVirtualOutgoingProductDetail } = getVirtualOutgoingProductDetailSlice.actions;
export default getVirtualOutgoingProductDetailSlice.reducer;
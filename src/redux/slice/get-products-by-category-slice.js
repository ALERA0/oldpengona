import { createSlice } from '@reduxjs/toolkit';
import { getProductsByCategoryProcess } from '../../api';

export const getProductsByCategorySlice = createSlice({
    name: 'getProductsByCategory',
    initialState: {
        isLoading: {},
        status: {},
        message: {},
        data: undefined,
    },
    reducers: {
        resetProductByCategory: state => {
            state.data = undefined;
            state.isLoading = {};
            state.status = {};
            state.message = {};
        },
    },
    extraReducers: {
        [getProductsByCategoryProcess.pending]: state => {
            state.isLoading = { ...state.isLoading, getProductsByCategoryProcess: true };
        },
        [getProductsByCategoryProcess.fulfilled]: (state, action) => {
            state.isLoading = { ...state.isLoading, getProductsByCategoryProcess: false };
            state.status = {
                ...state.status,
                getProductsByCategoryProcess: action.payload?.status,
            };
            state.message = {
                ...state.message,
                getProductsByCategoryProcess: action.payload?.message,
            };
            state.data = action.payload?.productsInCategory;
        },
        [getProductsByCategoryProcess.rejected]: (state, action) => {
            state.isLoading = { ...state.isLoading, getProductsByCategoryProcess: false };
        },
    },
});
export const { resetProductByCategory } = getProductsByCategorySlice.actions;
export default getProductsByCategorySlice.reducer;
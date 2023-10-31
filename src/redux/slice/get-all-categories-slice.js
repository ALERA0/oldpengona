import { createSlice } from '@reduxjs/toolkit';
import { getAllCategoriesProcess } from '../../api';

export const getAllCategoriesSlice = createSlice({
    name: 'getCategories',
    initialState: {
        isLoading: {},
        status: {},
        message: {},
        data: undefined,
    },
    reducers: {
        resetAllCategories: state => {
            state.data = undefined;
            state.isLoading = {};
            state.status = {};
            state.message = {};
        },
    },
    extraReducers: {
        [getAllCategoriesProcess.pending]: state => {
            state.isLoading = { ...state.isLoading, getAllCategoriesProcess: true };
        },
        [getAllCategoriesProcess.fulfilled]: (state, action) => {
            state.isLoading = { ...state.isLoading, getAllCategoriesProcess: false };
            state.status = {
                ...state.status,
                getAllCategoriesProcess: action.payload?.status,
            };
            state.message = {
                ...state.message,
                getAllCategoriesProcess: action.payload?.message,
            };
            state.data = action.payload?.categories;
        },
        [getAllCategoriesProcess.rejected]: (state, action) => {
            state.isLoading = { ...state.isLoading, getAllCategoriesProcess: false };
        },
    },
});

export const { resetAllCategories } = getAllCategoriesSlice.actions;
export default getAllCategoriesSlice.reducer;
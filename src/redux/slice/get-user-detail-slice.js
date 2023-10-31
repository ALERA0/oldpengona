import { getUserDetailProcess } from '@/src/api';
import { createSlice } from '@reduxjs/toolkit';


export const getUserDetailSlice = createSlice({
    name: 'getUserDetail',
    initialState: {
        isLoading: {},
        status: {},
        message: {},
        data: undefined,
    },
    reducers: {
        resetUserDetail: state => {
            state.data = undefined;
            state.isLoading = {};
            state.status = {};
            state.message = {};
        },
    },
    extraReducers: {
        [getUserDetailProcess.pending]: state => {
            state.isLoading = { ...state.isLoading, getUserDetailProcess: true };
        },
        [getUserDetailProcess.fulfilled]: (state, action) => {
            state.isLoading = { ...state.isLoading, getUserDetailProcess: false };
            state.status = {
                ...state.status,
                getUserDetailProcess: action.payload?.status,
            };
            state.message = {
                ...state.message,
                getUserDetailProcess: action.payload?.message,
            };
            state.data = action.payload?.data;
        },
        [getUserDetailProcess.rejected]: (state, action) => {
            state.isLoading = { ...state.isLoading, getUserDetailProcess: false };
        },
    },
});

export const { resetUserDetail } = getUserDetailSlice.actions;
export default getUserDetailSlice.reducer;
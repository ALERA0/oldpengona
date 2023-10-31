import { createSlice } from '@reduxjs/toolkit';
import { addVirtualIncomingDocProcess } from '../../api';
export const addVirtualIncomingDocSlice = createSlice({
    name: 'addVirtualIncomingDoc',
    initialState: {
        isLoading: {},
        status: {},
        message: {},
        data: undefined,
    },
    reducers: {
        resetVirtualIncomingDoc: state => {
            state.data = undefined;
            state.isLoading = {};
            state.status = {};
            state.message = {};
        },
    },
    extraReducers: {
        [addVirtualIncomingDocProcess.pending]: state => {
            state.isLoading = { ...state.isLoading, addVirtualIncomingDocProcess: true };
        },
        [addVirtualIncomingDocProcess.fulfilled]: (state, action) => {
            state.isLoading = { ...state.isLoading, addVirtualIncomingDocProcess: false };
            state.status = {
                ...state.status,
                addVirtualIncomingDocProcess: action.payload?.status,
            };
            state.message = {
                ...state.message,
                addVirtualIncomingDocProcess: action.payload?.message,
            };
            state.data = action.payload?.incomingDoc;
        },
        [addVirtualIncomingDocProcess.rejected]: (state, action) => {
            state.isLoading = { ...state.isLoading, addVirtualIncomingDocProcess: false };
            state.message = action.error?.message;
        },
    },
});

export const { resetVirtualIncomingDoc } = addVirtualIncomingDocSlice.actions;
export default addVirtualIncomingDocSlice.reducer;
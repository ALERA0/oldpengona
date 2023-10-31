import { createSlice } from '@reduxjs/toolkit';
import { addVirtualOutgoingDocProcess } from '../../api';
export const addVirtualOutgoingDocSlice = createSlice({
    name: 'addVirtualOutgoingDoc',
    initialState: {
        isLoading: {},
        status: {},
        message: {},
        data: undefined,
    },
    reducers: {
        resetAddVirtualOutgoingDoc: state => {
            state.data = undefined;
            state.isLoading = {};
            state.status = {};
            state.message = {};
        },
    },
    extraReducers: {
        [addVirtualOutgoingDocProcess.pending]: state => {
            state.isLoading = { ...state.isLoading, addVirtualOutgoingDocProcess: true };
        },
        [addVirtualOutgoingDocProcess.fulfilled]: (state, action) => {
            state.isLoading = { ...state.isLoading, addVirtualOutgoingDocProcess: false };
            state.status = {
                ...state.status,
                addVirtualOutgoingDocProcess: action.payload?.status,
            };
            state.message = {
                ...state.message,
                addVirtualOutgoingDocProcess: action.payload?.message,
            };
            state.data = action.payload?.outgoingDoc;
        },
        [addVirtualOutgoingDocProcess.rejected]: (state, action) => {
            state.isLoading = { ...state.isLoading, addVirtualOutgoingDocProcess: false };
            state.message = action.error?.message;
        },
    },
});

export const { resetAddVirtualOutgoingDoc } = addVirtualOutgoingDocSlice.actions;
export default addVirtualOutgoingDocSlice.reducer;
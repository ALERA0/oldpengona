import { createSlice } from '@reduxjs/toolkit';
import { deleteVirtualIncomingDocProcess } from '../../api';


export const deleteVirtualIncomingDocSlice = createSlice({
    name: 'deleteVirtualIncomingDoc',
    initialState: {
        isLoading: {},
        status: {},
        message: {},
    },
    reducers: {
        resetDeleteVirtualIncomingDoc: state => {
            state.isLoading = {};
            state.status = {};
            state.message = {};
        },
    },
    extraReducers: {
        [deleteVirtualIncomingDocProcess.pending]: state => {
            state.isLoading = { ...state.isLoading, deleteVirtualIncomingDocProcess: true };
        },
        [deleteVirtualIncomingDocProcess.fulfilled]: (state, action) => {
            state.isLoading = { ...state.isLoading, deleteVirtualIncomingDocProcess: false };
            state.status = action.payload?.status;
            state.message = {
                ...state.message,
                deleteVirtualIncomingDocProcess: action.payload?.message,
            };

        },
        [deleteVirtualIncomingDocProcess.rejected]: (state, action) => {
            state.isLoading = { ...state.isLoading, deleteVirtualIncomingDocProcess: false };
            state.status = "error";
        },
    },
});


export const { resetDeleteVirtualIncomingDoc } = deleteVirtualIncomingDocSlice.actions;
export default deleteVirtualIncomingDocSlice.reducer;
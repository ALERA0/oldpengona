import { createSlice } from '@reduxjs/toolkit';
import { deleteVirtualOutgoingDocProcess } from '../../api';


export const deleteVirtualOutgoingDocSlice = createSlice({
    name: 'deleteVirtualOutgoingDoc',
    initialState: {
        isLoading: {},
        status: {},
        message: {},
    },
    reducers: {
        resetDeleteVirtualOutgoingDoc: state => {
            state.isLoading = {};
            state.status = {};
            state.message = {};
        },
    },
    extraReducers: {
        [deleteVirtualOutgoingDocProcess.pending]: state => {
            state.isLoading = { ...state.isLoading, deleteVirtualOutgoingDocProcess: true };
        },
        [deleteVirtualOutgoingDocProcess.fulfilled]: (state, action) => {
            state.isLoading = { ...state.isLoading, deleteVirtualOutgoingDocProcess: false };
            state.status = action.payload?.status;
            state.message = {
                ...state.message,
                deleteVirtualOutgoingDocProcess: action.payload?.message,
            };

        },
        [deleteVirtualOutgoingDocProcess.rejected]: (state, action) => {
            state.isLoading = { ...state.isLoading, deleteVirtualOutgoingDocProcess: false };
            state.status = "error";
        },
    },
});


export const { resetDeleteVirtualOutgoingDoc } = deleteVirtualOutgoingDocSlice.actions;
export default deleteVirtualOutgoingDocSlice.reducer;
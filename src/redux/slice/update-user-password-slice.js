import { updateUserPasswordProcess } from "@/src/api";
import { createSlice } from "@reduxjs/toolkit";

export const updateUserPasswordSlice = createSlice({
    name: "updateUserPassword",
    initialState: {
        data: undefined,
        status: undefined,
        isLoading: false,
        message: undefined,
    },
    reducers: {
        resetUpdateUserPassword: (state) => {
            state.data = undefined;
            state.status = undefined;
            state.isLoading = false;
            state.message = {};
        },
    },
    extraReducers: {
        [updateUserPasswordProcess.pending]: (state) => {
            state.isLoading = true;
        },
        [updateUserPasswordProcess.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.data =
                action.payload?.updatedUserPassword !== undefined
                    ? action.payload?.updatedUserPassword
                    : action.payload;
            state.status = action.payload?.status;
            state.message = action.payload?.message
        },
        [updateUserPasswordProcess.rejected]: (state, action) => {
            state.isLoading = false;
            state.status = "error";
            state.message = action.error?.message;
        },
    },
});

export const { resetUpdateUserPassword } = updateUserPasswordSlice.actions;
export default updateUserPasswordSlice.reducer;
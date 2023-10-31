import { updateUserProcess } from "@/src/api";
import { createSlice } from "@reduxjs/toolkit";

export const updateUserSlice = createSlice({
    name: "updateUser",
    initialState: {
        data: undefined,
        status: undefined,
        isLoading: false,
    },
    reducers: {
        resetUpdateUser: (state) => {
            state.data = undefined;
            state.status = undefined;
            state.isLoading = false;
        },
    },
    extraReducers: {
        [updateUserProcess.pending]: (state) => {
            state.isLoading = true;
        },
        [updateUserProcess.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.data =
                action.payload?.updatedUser !== undefined
                    ? action.payload?.updatedUser
                    : action.payload;
            state.status = action.payload?.status;
        },
        [updateUserProcess.rejected]: (state) => {
            state.isLoading = false;
            state.status = "error";
        },
    },
});

export const { resetUpdateUser } = updateUserSlice.actions;
export default updateUserSlice.reducer;
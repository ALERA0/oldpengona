import { createSlice } from "@reduxjs/toolkit";
import { addNewCategoryProcess } from "../../api";

export const addNewCategorySlice = createSlice({
    name: "newCategory",
    initialState: {
        data: undefined,
        status: undefined,
        isLoading: false,
    },
    reducers: {
        resetAddCategory: (state) => {
            state.data = undefined;
            state.isLoading = {};
            state.status = {};
        },
    },
    extraReducers: {
        [addNewCategoryProcess.pending]: (state) => {
            state.isLoading = true;
        },
        [addNewCategoryProcess.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.data =
                action.payload?.data !== undefined
                    ? action.payload?.data
                    : action.payload;
            state.status = "success";
        },
        [addNewCategoryProcess.rejected]: (state) => {
            state.isLoading = false;
            state.status = "error";
        },
    },
});

export const { resetAddCategory } = addNewCategorySlice.actions;
export default addNewCategorySlice.reducer;
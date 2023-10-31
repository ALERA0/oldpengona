
import { authLogOut } from "@/src/api";
import { createSlice } from "@reduxjs/toolkit";


export const authLogOutSlice = createSlice({
  name: "authLogOut",
  initialState: {
    status: undefined,
    isLoading: false, 
  },
  reducers: {
    resetAuthLogout: (state) => {
      state.isLoading = {};
      state.status = {};
    },
  },
  extraReducers: {
    [authLogOut.pending]: (state) => {
      state.isLoading = true;
    },
    [authLogOut.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.status = "success";
    },
    [authLogOut.rejected]: (state) => {
      state.status = "error";
    },
  },
});

export const { resetAuthLogout } = authLogOutSlice.actions;
export default authLogOutSlice.reducer;

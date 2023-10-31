import { authLogin, refreshToken } from "@/src/api";
import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: { accessToken: null, status: undefined, message: {} },
  //   reducers: {
  //     setCredentials: (state, action) => {
  //       const { accessToken } = action.payload;
  //       state.token = accessToken;
  //     },
  //     logOut: (state, action) => {
  //       state.token = null;
  //     },
  //   },
  reducers: {
    resetAuth: (state) => {
      state.status = undefined;
      state.message = {};
      state.accessToken= null;
    },
  },
  extraReducers: {
    [authLogin.fulfilled]: (state, action) => {
      state.accesToken = action.payload;
      state.status = "success";
      
    },
    [authLogin.rejected]: (state, action) => {
      state.status = "error";
      state.message = action.error?.message;

    },
    [refreshToken.fulfilled]: (state, action) => {
      state.accesToken = action.payload;
      state.status = "success";
    },
    [refreshToken.rejected]: (state, action) => {
      state.status = "error";
      
    },
  },
});

export const { resetAuth } = authSlice.actions;

// export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentToken = (state) => state.auth.token;

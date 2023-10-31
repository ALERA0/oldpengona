const { createSlice } = require("@reduxjs/toolkit");
import { getNextDocumentNumberProcess } from "../../api";
export const getNextDocumentNumberSlice = createSlice({
  name: "getNextDocumentNumber",
  initialState: {
    isLoading: {},
    status: {},
    message: {},
    data: undefined,
  },
  reducers: {
    resetNextDocumentNumber: (state) => {
      state.data = undefined;
      (state.status = {}), (state.status = {}), (state.message = {});
    },
  },
  extraReducers: {
    [getNextDocumentNumberProcess.pending]: (state) => {
      state.isLoading = {
        ...state.isLoading,
        getNextDocumentNumberProcess: true,
      };
    },
    [getNextDocumentNumberProcess.fulfilled]: (state, action) => {
      state.isLoading = {
        ...state.isLoading,
        getNextDocumentNumberProcess: false,
      };
      state.status = {
        ...state.status,
        getNextDocumentNumberProcess: action.payload?.status,
      };
      state.data = action.payload?.nextDocumentNumber;
    },
    [getNextDocumentNumberProcess.rejected]: (state, action) => {
      state.isLoading = {
        ...state.isLoading,
        getNextDocumentNumberProcess: false,
      };
    },
  },
});

export const { resetNextDocumentNumber } = getNextDocumentNumberSlice.actions;
export default getNextDocumentNumberSlice.reducer;

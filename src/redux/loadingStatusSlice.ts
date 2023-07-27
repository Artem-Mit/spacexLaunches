/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type StatusState = {
  isLoading: boolean,
  isError: boolean,
};

const initialState: StatusState = {
  isLoading: true,
  isError: false,
};

const loadingStatusSlice = createSlice({
  name: 'statuses',
  initialState,
  reducers: {
    setLoadingStatus(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setErrorStatus(state, action: PayloadAction<boolean>) {
      state.isError = action.payload;
    },
  },
});

export const { setLoadingStatus, setErrorStatus } = loadingStatusSlice.actions;
export default loadingStatusSlice.reducer;

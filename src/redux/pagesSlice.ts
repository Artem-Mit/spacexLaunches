/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RocketsFetchData } from '../types/RocketsFetchData';

type PagesState = Omit<RocketsFetchData, 'docs'>;

const initialState: PagesState = {
  currentPage: 1,
  totalPages: 0,
  nextPage: 0,
  prevPage: 0,
  hasNextPage: false,
  hasPrevPage: false,
};

const pagesStateSlice = createSlice({
  name: 'statuses',
  initialState,
  reducers: {
    setInitialPagesState(state, action: PayloadAction<PagesState>) {
      state.totalPages = action.payload.totalPages;
      state.nextPage = action.payload.nextPage;
      state.prevPage = action.payload.prevPage;
      state.hasNextPage = action.payload.hasNextPage;
      state.hasPrevPage = action.payload.hasPrevPage;
    },
    goToPrevPage(state) {
      if (state.hasPrevPage) {
        state.currentPage = state.prevPage;
      }
    },
    goToNextPage(state) {
      if (state.hasNextPage) {
        state.currentPage = state.nextPage;
      }
    },
  },
});

export const {
  goToPrevPage, goToNextPage, setInitialPagesState,
} = pagesStateSlice.actions;
export default pagesStateSlice.reducer;

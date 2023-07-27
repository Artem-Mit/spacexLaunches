/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type PagesState = {
  currentPage: number,
  totalPages: number,
  nextPage: number,
  prevPage: number,
  hasNextPage: boolean,
  hasPrevPage: boolean,
};

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
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setTotalPages(state, action: PayloadAction<number>) {
      state.totalPages = action.payload;
    },
    setNextPage(state, action: PayloadAction<number>) {
      state.nextPage = action.payload;
    },
    setPrevPage(state, action: PayloadAction<number>) {
      state.prevPage = action.payload;
    },
    setHasNextPage(state, action: PayloadAction<boolean>) {
      state.hasNextPage = action.payload;
    },
    setHasPrevPage(state, action: PayloadAction<boolean>) {
      state.hasPrevPage = action.payload;
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
  setCurrentPage,
  setTotalPages,
  setNextPage,
  setHasNextPage, setHasPrevPage, goToPrevPage, goToNextPage, setPrevPage,
} = pagesStateSlice.actions;
export default pagesStateSlice.reducer;

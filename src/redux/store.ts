import { configureStore } from '@reduxjs/toolkit';
import { spacexApi } from './spacexApi';
import missionsReducer from './missionsSlice';
import loadingStatusReducer from './loadingStatusSlice';
import pagesStatusReducer from './pagesSlice';

const store = configureStore({
  reducer: {
    [spacexApi.reducerPath]: spacexApi.reducer,
    missions: missionsReducer,
    status: loadingStatusReducer,
    pages: pagesStatusReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(spacexApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

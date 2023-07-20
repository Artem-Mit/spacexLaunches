import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Rocket } from '../types/Rocket';

type MissionsState = {
  rockets: Rocket[],
  isLoading: boolean,
  isError: boolean
};

const initialState: MissionsState = {
  rockets: [],
  isLoading: true,
  isError: false,
};

const missionsSlice = createSlice({
  name: 'missions',
  initialState,
  reducers: {
    addMissions(state, action: PayloadAction<Rocket[]>) {
      state.rockets.push(...action.payload);
    },
    setLoadingStatus(state, action: PayloadAction<boolean>) {
      // eslint-disable-next-line no-param-reassign
      state.isLoading = action.payload;
    },
    setErrorStatus(state, action: PayloadAction<boolean>) {
      // eslint-disable-next-line no-param-reassign
      state.isError = action.payload;
    },
  },
});

export const { addMissions, setLoadingStatus, setErrorStatus } = missionsSlice.actions;
export default missionsSlice.reducer;

/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Rocket } from '../types/Rocket';

type MissionsState = {
  rockets: Rocket[],
};

const initialState: MissionsState = {
  rockets: [],
};

const missionsSlice = createSlice({
  name: 'missions',
  initialState,
  reducers: {
    addMissions(state, action: PayloadAction<Rocket[]>) {
      state.rockets = action.payload;
    },
    sortMaxDateTop(state) {
      state.rockets = state.rockets.sort((a, b) => Date.parse(b.date_utc) - Date.parse(a.date_utc));
    },
    sortMaxDateBottom(state) {
      state.rockets = state.rockets.sort((a, b) => Date.parse(a.date_utc) - Date.parse(b.date_utc));
    },
  },
});

export const { addMissions, sortMaxDateTop, sortMaxDateBottom } = missionsSlice.actions;
export default missionsSlice.reducer;

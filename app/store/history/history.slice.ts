import {createSlice} from '@reduxjs/toolkit';

import {SliceNames} from '../enums';

import {getHistoryAction} from './history.actions';
import {HistoryState} from './history.types';

const initialState: HistoryState = {
  history: [],
  loading: false,
};

const historySlice = createSlice({
  initialState,
  name: SliceNames.CHAT,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getHistoryAction.fulfilled, (state, {payload}) => {
        state.history = payload;
        state.loading = false;
      })
      .addCase(getHistoryAction.pending, state => {
        state.loading = true;
      })
      .addCase(getHistoryAction.rejected, state => {
        state.loading = false;
      });
  },
});

export default historySlice.reducer;

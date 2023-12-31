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
  reducers: {
    deleteHistoryFromList: (state, {payload}: {payload: number}) => {
      state.history = state.history.filter(item => {
        if (item.id !== payload) {
          return item;
        }
      });
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getHistoryAction.fulfilled, (state, {payload}) => {
        state.history = payload.map((item) => {
          const messages = item.messages.reverse();
          item.messages = messages;
          return item;
        });
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

export const {deleteHistoryFromList} = historySlice.actions;

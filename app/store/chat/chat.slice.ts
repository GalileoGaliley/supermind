import {createSlice} from '@reduxjs/toolkit';

import {SliceNames} from '../enums';

import {fetchChatAction} from './chat.actions';
import {ChatState} from './chat.types';

const initialState: ChatState = {
  chat: {
    id: NaN,
    messages: [],
  },
  loading: false,
};

const chatSlice = createSlice({
  initialState,
  name: SliceNames.CHAT,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchChatAction.fulfilled, (state, {payload}) => {
        state.chat = {
          ...payload,
        };
        state.loading = false;
      })
      .addCase(fetchChatAction.pending, state => {
        state.loading = true;
      })
      .addCase(fetchChatAction.rejected, state => {
        state.loading = false;
      });
  },
});

export default chatSlice.reducer;

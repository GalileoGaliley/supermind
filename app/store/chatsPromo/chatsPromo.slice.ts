import {createSlice} from '@reduxjs/toolkit';

import {SliceNames} from '../enums';

import {fetchChatPromoAction} from './chatsPromo.actions';
import {ChatPromptState} from './chatsPromo.types';

const initialState: ChatPromptState = {
  chats: [],
  loading: false,
};

const chatsPromoSlice = createSlice({
  initialState,
  name: SliceNames.CHAT,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchChatPromoAction.fulfilled, (state, {payload}) => {
        state.chats = payload;
        state.loading = false;
      })
      .addCase(fetchChatPromoAction.pending, state => {
        state.loading = true;
      })
      .addCase(fetchChatPromoAction.rejected, state => {
        state.loading = false;
      });
  },
});

export default chatsPromoSlice.reducer;

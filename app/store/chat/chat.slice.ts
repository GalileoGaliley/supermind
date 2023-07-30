import {createSlice} from '@reduxjs/toolkit';

import {SliceNames} from '../enums';

import { continueChatAction, createChatAction, fetchChatAction } from "./chat.actions";
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
  reducers: {
    fillChat: (state, {payload}) => {
      state.chat = payload;
    },
    addMessage: (state, {payload}: {payload: string}) => {
      state.chat.messages.push({content: payload, role: 'user'});
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchChatAction.fulfilled, (state, {payload}) => {
        state.chat.messages.push(payload.messages[payload.messages.length - 1]);
        state.loading = false;
      })
      .addCase(fetchChatAction.pending, state => {
        state.loading = true;
      })
      .addCase(fetchChatAction.rejected, state => {
        state.loading = false;
      })
      .addCase(createChatAction.fulfilled, (state, {payload}) => {
        state.chat.id = payload.chatId;
        state.loading = false;
      })
      .addCase(createChatAction.pending, state => {
        state.loading = true;
      })
      .addCase(createChatAction.rejected, state => {
        state.loading = false;
      })
      .addCase(continueChatAction.fulfilled, (state, {payload}) => {
        state.loading = false;
      })
      .addCase(continueChatAction.pending, state => {
        state.loading = true;
      })
      .addCase(continueChatAction.rejected, state => {
        state.loading = false;
      });
  },
});

export default chatSlice.reducer;

export const {fillChat, addMessage} = chatSlice.actions;

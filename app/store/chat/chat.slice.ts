import {createSlice} from '@reduxjs/toolkit';

import {SliceNames} from '../enums';

import {
  continueChatAction,
  createChatAction,
  fetchChatAction,
  fetchChatPresetAction,
  fetchChatPresetDataAction
} from "./chat.actions";
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
      console.log(payload);
      state.chat = payload;
    },
    addMessage: (state, {payload}: {payload: string}) => {
      state.chat.messages.unshift({content: payload, role: 'user'});
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchChatAction.fulfilled, (state, {payload}) => {
        function reverseArr(input: any) {
          var ret = [];
          for (var i = input.length - 1; i >= 0; i--) {
            ret.push(input[i]);
          }
          return ret;
        }
        payload.messages = reverseArr(payload.messages);
        state.chat = payload;
        state.loading = false;
      })
      .addCase(fetchChatAction.pending, state => {
        state.loading = true;
      })
      .addCase(fetchChatAction.rejected, state => {
        state.loading = false;
      })
      .addCase(fetchChatPresetAction.fulfilled, (state, {payload}) => {
        state.chat.id = payload;
        state.loading = false;
      })
      .addCase(fetchChatPresetAction.pending, state => {
        state.loading = true;
      })
      .addCase(fetchChatPresetAction.rejected, state => {
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
      })
      .addCase(fetchChatPresetDataAction.fulfilled, (state, {payload}) => {
        console.log(payload);
        state.chat = payload;
        state.loading = false;
      })
      .addCase(fetchChatPresetDataAction.pending, state => {
        state.loading = true;
      })
      .addCase(fetchChatPresetDataAction.rejected, state => {
        state.loading = false;
      });
  },
});

export default chatSlice.reducer;

export const {fillChat, addMessage} = chatSlice.actions;

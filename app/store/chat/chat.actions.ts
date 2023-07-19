import {createAsyncThunk} from '@reduxjs/toolkit';

import {SliceNames} from '../enums';
import type {ThunkAsyncConfig} from '../types';
import {Chat, FetchChatData} from './chat.types';

const fetchChatAction = createAsyncThunk<Chat, FetchChatData, ThunkAsyncConfig>(
  `${SliceNames.CHAT}/fetchChatAction`,
  async (
    data,
    {
      extra: {
        chatServices: {fetchChatService},
      },
    },
  ) => {
    try {
      const chatData = await fetchChatService(data);
      return chatData;
    } catch (error) {
      return Promise.reject(error);
    }
  },
);

export {fetchChatAction};

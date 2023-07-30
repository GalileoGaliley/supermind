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

const createChatAction = createAsyncThunk<
  {chatId: number},
  {message: string},
  ThunkAsyncConfig
>(
  `${SliceNames.CHAT}/createChatAction`,
  async (
    data,
    {
      extra: {
        chatServices: {createChatService},
      },
    },
  ) => {
    try {
      const chatId = await createChatService(data);
      return chatId;
    } catch (error) {
      return Promise.reject(error);
    }
  },
);

const continueChatAction = createAsyncThunk<
  {
    message: string;
    id: string;
  },
  FetchChatData,
  ThunkAsyncConfig
>(
  `${SliceNames.CHAT}/continueChatAction`,
  async (
    data,
    {
      extra: {
        chatServices: {continueChatService},
      },
    },
  ) => {
    try {
      const chatData = await continueChatService(data);
      return chatData;
    } catch (error) {
      return Promise.reject(error);
    }
  },
);

export {fetchChatAction, createChatAction, continueChatAction};

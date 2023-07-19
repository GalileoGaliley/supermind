import {createAsyncThunk} from '@reduxjs/toolkit';

import {SliceNames} from '../enums';
import type {ThunkAsyncConfig} from '../types';

import {ChatPromptList} from './chatsPromo.types';

const fetchChatPromoAction = createAsyncThunk<
  ChatPromptList,
  void,
  ThunkAsyncConfig
>(
  `${SliceNames.CHAT}/fetchChatPromoAction`,
  async (
    _,
    {
      extra: {
        chatsPromoServices: {fetchChatPromoService},
      },
    },
  ) => {
    try {
      const chatData = await fetchChatPromoService();
      return chatData;
    } catch (error) {
      return Promise.reject(error);
    }
  },
);

export {fetchChatPromoAction};

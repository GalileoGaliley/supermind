import {createAsyncThunk} from '@reduxjs/toolkit';

import {SliceNames} from '../enums';
import type {ThunkAsyncConfig} from '../types';
import {History} from './history.types';

const getHistoryAction = createAsyncThunk<History, void, ThunkAsyncConfig>(
  `${SliceNames.HISTORY}/getHistoryAction`,
  async (
    _,
    {
      extra: {
        historyServices: {getHistoryService},
      },
    },
  ) => {
    try {
      const historyData = await getHistoryService();
      return historyData;
    } catch (error) {
      return Promise.reject(error);
    }
  },
);

export {getHistoryAction};

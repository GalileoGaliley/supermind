import {createAsyncThunk} from '@reduxjs/toolkit';

import {SliceNames} from '../enums';
import type {ThunkAsyncConfig} from '../types';

import {Presets} from './presets.types';

const getPresetsAction = createAsyncThunk<Presets[], void, ThunkAsyncConfig>(
  `${SliceNames.PRESETS}/getPresetsAction`,
  async (
    _,
    {
      extra: {
        presetsServices: {getPresetsService},
      },
    },
  ) => {
    try {
      const presetsData = await getPresetsService();
      return presetsData;
    } catch (error) {
      return Promise.reject(error);
    }
  },
);

export {getPresetsAction};

import {createSlice} from '@reduxjs/toolkit';

import {SliceNames} from '../enums';

import {getPresetsAction} from './presets.actions';
import {PresetsData, PresetsState} from './presets.types';

const initialState: PresetsState = {
  presets: {},
  titles: [],
  loading: false,
};

const presetsSlice = createSlice({
  initialState,
  name: SliceNames.CHAT,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getPresetsAction.fulfilled, (state, {payload}) => {
        const titles: string[] = [];

        const normalized = payload.reduce((acc, item) => {
          acc[item.title] = item.presets;
          titles.push(item.title);
          return acc;
        }, {} as PresetsData);

        state.presets = normalized;
        state.loading = false;
      })
      .addCase(getPresetsAction.pending, state => {
        state.loading = true;
      })
      .addCase(getPresetsAction.rejected, state => {
        state.loading = false;
      });
  },
});

export default presetsSlice.reducer;

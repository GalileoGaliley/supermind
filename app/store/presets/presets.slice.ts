import {createSlice} from '@reduxjs/toolkit';

import {SliceNames} from '../enums';

import {getPresetsAction} from './presets.actions';
import {PresetsState} from './presets.types';

const initialState: PresetsState = {
  presets: [],
  loading: false,
};

const presetsSlice = createSlice({
  initialState,
  name: SliceNames.CHAT,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getPresetsAction.fulfilled, (state, {payload}) => {
        state.presets = payload;
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

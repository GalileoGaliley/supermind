import {createSlice} from '@reduxjs/toolkit';

import {SliceNames} from '../enums';

import {getPresetsAction} from './presets.actions';
import {Preset, Presets, PresetsData, PresetsState} from './presets.types';

const initialState: PresetsState = {
  presets: {},
  titles: [],
  items: {},
  loading: false,
};

const presetsSlice = createSlice({
  initialState,
  name: SliceNames.CHAT,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getPresetsAction.fulfilled, (state, {payload}) => {
        const titles: string[] = ['All'];
        const items: {[p: number]: Preset} = {};

        const normalizedIds = payload.reduce(
          (acc, item) => {
            item.presets.forEach(presetItem => {
              items[presetItem.id] = presetItem;
              if (acc[item.title]) {
                acc[item.title].push(presetItem.id);
              } else {
                acc[item.title] = [presetItem.id];
              }
              acc.All.push(presetItem.id);
            });
            titles.push(item.title);
            return acc;
          },
          {All: []} as PresetsData,
        );
        state.items = items;
        state.titles = titles;
        state.presets = normalizedIds;
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

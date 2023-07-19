import {createSlice} from '@reduxjs/toolkit';

import {SliceNames} from '../enums';

import {fetchSignInAction} from './user.actions';
import type {UserState} from './user.types';

const initialState: UserState = {
  user: {},
  loading: false,
};

const userSlice = createSlice({
  initialState,
  name: SliceNames.USER,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchSignInAction.fulfilled, (state, {payload}) => {
        state.user = {
          ...payload,
        };
        state.loading = false;
      })
      .addCase(fetchSignInAction.pending, state => {
        state.loading = true;
      })
      .addCase(fetchSignInAction.rejected, state => {
        state.loading = false;
      });
  },
});

export default userSlice.reducer;

import {createSlice} from '@reduxjs/toolkit';

import {SliceNames} from '../enums';

import {fetchSignInAction} from './user.actions';
import type {UserState} from './user.types';

const initialState: UserState = {
  user: {},
  isEntered: false,
  loading: false,
};

const userSlice = createSlice({
  initialState,
  name: SliceNames.USER,
  reducers: {
    changeFreeRequest: (state, payload) => {
      if (state.user.freeRequest) {
        state.user.freeRequest = state.user.freeRequest - 1;
      }
    },
    setIsEntered: (state, {payload}: {payload: boolean}) => {
      state.isEntered = payload;
    },
  },
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

export const {changeFreeRequest, setIsEntered} = userSlice.actions;

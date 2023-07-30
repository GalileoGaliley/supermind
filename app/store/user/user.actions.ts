import {createAsyncThunk} from '@reduxjs/toolkit';

import {SliceNames} from '../enums';
import type {ThunkAsyncConfig} from '../types';

import type {User, UserReqData} from './user.types';

const fetchSignInAction = createAsyncThunk<User, UserReqData, ThunkAsyncConfig>(
  `${SliceNames.USER}/fetchAuthAction`,
  async (
    data,
    {
      extra: {
        authServices: {fetchAuthService},
      },
    },
  ) => {
    try {
      const userData = await fetchAuthService(data);
      return userData;
    } catch (error) {
      return Promise.reject(error);
    }
  },
);

export {fetchSignInAction};

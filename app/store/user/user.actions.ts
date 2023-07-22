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
      console.log('token12');

      const userData = await fetchAuthService(data);
      console.log(userData);
      console.log('userData');
      return userData;
    } catch (error) {
      return Promise.reject(error);
    }
  },
);

export {fetchSignInAction};

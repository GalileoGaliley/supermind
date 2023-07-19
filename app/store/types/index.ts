import type {
  AnyAction,
  Dispatch,
  PayloadAction as ReduxPayloadAction,
  Reducer,
  SliceCaseReducers,
  ThunkDispatch,
} from '@reduxjs/toolkit';
import {ThunkMiddlewareFor} from '@reduxjs/toolkit/dist/getDefaultMiddleware';
import {PersistPartial} from 'redux-persist/es/persistReducer';

import {authServices} from '../../services/auth';
import {chatServices} from '../../services/chat';
import {chatsPromoServices} from '../../services/chatsPromo';
import {historyServices} from '../../services/history';
import {presetsServices} from '../../services/presets';
import {ChatState} from '../chat/chat.types';
import {ChatPromptState} from '../chatsPromo/chatsPromo.types';
import {HistoryState} from '../history/history.types';
import {PresetsState} from '../presets/presets.types';
import {UserState} from '../user/user.types';

type PayloadAction<T> = ReduxPayloadAction<T>;

type SliceReducer<T> = SliceCaseReducers<T>;

type Dependencies = {
  authServices: typeof authServices;
  chatServices: typeof chatServices;
  chatsPromoServices: typeof chatsPromoServices;
  historyServices: typeof historyServices;
  presetsServices: typeof presetsServices;
};

type AppDispatch = Dispatch & ThunkDispatch<RootState, Dependencies, AnyAction>;

type ThunkAsyncConfig = {
  extra: Dependencies;
  state: RootState;
  dispatch: AppDispatch;
};

type RootState = {
  user: UserState;
  chat: ChatState;
  history: HistoryState;
  chatsPromo: ChatPromptState;
  presets: PresetsState;
} & PersistPartial;

type ThunkMiddlewareOptions = {
  thunk: {
    extraArgument: Dependencies;
  };
};

type Middlewares = ThunkMiddlewareFor<RootState, ThunkMiddlewareOptions>[];

type MainState = Omit<RootState, '_persist'>;

type Reducers = {[K in keyof MainState]: Reducer<MainState[K], AnyAction>};

export type {
  ThunkAsyncConfig,
  SliceReducer,
  PayloadAction,
  RootState,
  Dependencies,
  Middlewares,
  Reducers,
};

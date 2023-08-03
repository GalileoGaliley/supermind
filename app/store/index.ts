import AsyncStorage from '@react-native-async-storage/async-storage';
import {AnyAction, combineReducers, configureStore} from '@reduxjs/toolkit';
import {persistStore} from 'redux-persist';
import persistReducer from 'redux-persist/es/persistReducer';

import {authServices} from '../services/auth';
import {chatServices} from '../services/chat';
import {chatsPromoServices} from '../services/chatsPromo';
import {historyServices} from '../services/history';
import {presetsServices} from '../services/presets';

import chatReducer from './chat/chat.slice';
import chatPromoReducer from './chatsPromo/chatsPromo.slice';
import historyReducer from './history/history.slice';
import presetsReducer from './presets/presets.slice';
import productsReducer from './products/products.slice';
import type {Dependencies, Middlewares, Reducers, RootState} from './types';
import userReducer from './user/user.slice';

const dependencies: Dependencies = {
  authServices,
  chatServices,
  historyServices,
  chatsPromoServices,
  presetsServices,
};

const reducers: Reducers = {
  user: userReducer,
  chat: chatReducer,
  history: historyReducer,
  chatsPromo: chatPromoReducer,
  presets: presetsReducer,
  products: productsReducer,
};

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blackList: [],
  whitelist: ['user'],
};

const rootReducer = combineReducers(reducers);

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore<RootState, AnyAction, Middlewares>({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      thunk: {
        extraArgument: dependencies,
      },
    }),
});

const persistor = persistStore(store);

export {store, persistor};

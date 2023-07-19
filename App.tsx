/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import RootNavigation from './app/navigation/RootNavigation';
import {persistor, store} from './app/store';
import {StatusBar} from 'react-native';

function App(): JSX.Element {
  return (
    <PersistGate persistor={persistor}>
      <StatusBar translucent backgroundColor="transparent" />
      <Provider store={store}>
        <RootNavigation />
      </Provider>
    </PersistGate>
  );
}

export default App;

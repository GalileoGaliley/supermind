import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import RootNavigation from './app/navigation/RootNavigation';
import {persistor, store} from './app/store';
import {StatusBar} from 'react-native';

import Qonversion, {
  QonversionConfigBuilder,
  LaunchMode,
} from 'react-native-qonversion';

function App(): JSX.Element {
  const config = new QonversionConfigBuilder(
    'lFBiIW5rn7pF504WyEDpezmu2hqT-4Uk',
    LaunchMode.ANALYTICS,
  ).build();
  Qonversion.initialize(config);

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

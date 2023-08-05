/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Qonversion, {
  QonversionConfigBuilder,
  LaunchMode,
} from 'react-native-qonversion';


AppRegistry.registerComponent(appName, () => App);

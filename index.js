/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import firebase from '@react-native-firebase/app';
import {firebase as crush} from '@react-native-firebase/crashlytics';

if (!firebase.apps.length) {
  firebase
    .initializeApp({
      appId: '1:267602603220:android:21fc2672d430294f3cdf41',
      projectId: 'supermind-prod-android',
      apiKey: 'AIzaSyCsDwnBeYBPeslmdfb_JqCob9BxYnpzU8E',
      databaseURL: '',
      messagingSenderId: '',
      storageBucket: '',
    })
    .then(res => {
      console.log(res);
    });
}
crush.crashlytics().log('App opened');
AppRegistry.registerComponent(appName, () => App);

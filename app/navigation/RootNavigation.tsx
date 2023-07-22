import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import type {StackNavigationOptions} from '@react-navigation/stack';
import {createStackNavigator} from '@react-navigation/stack';
import React, {createRef, useEffect} from 'react';
import {useDispatch} from 'react-redux';

import {fetchSignInAction} from '../store/user/user.actions';
import {useUserToken} from '../store/user/user.selectors';
import {rubikBold} from '../style/font';

import StartNavigation from './StartNavigation';
import {RootStackParamsList} from './types';
import TabNavigation from "./TabNavigation";

// import {useFirebase} from 'common/types/hooks/useFirebase';

export const navigationRef =
  createRef<NavigationContainerRef<RootStackParamsList>>();
const RootStack = createStackNavigator<RootStackParamsList>();

const RootNavigation = () => {
  const dispatch = useDispatch();

  const token = useUserToken();

  useEffect(() => {
    const data = {
      key: 'yYbW0NpF4HKDarHuyjNGPEn7updjR5g',
      uuid: 'test1111',
    };
    if (!token) {
      dispatch(fetchSignInAction(data));
      return;
    }
  }, []);

  const rootOptions: StackNavigationOptions = {
    headerShown: false,
    headerTitleAlign: 'center',
    headerTitleStyle: {
      fontFamily: rubikBold,
      textTransform: 'uppercase',
      fontSize: 16,
    },
  };

  const tabsOptions: StackNavigationOptions = {
    headerShown: false,
  };
  // useFirebase();

  // useOpenNotification();

  // onNotificationOpenedApp();

  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack.Navigator screenOptions={rootOptions} initialRouteName="Tabs">
        <RootStack.Screen
          name="Tabs"
          component={TabNavigation}
          options={tabsOptions}
        />
        <RootStack.Screen
          name="Start"
          component={StartNavigation}
          options={tabsOptions}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;

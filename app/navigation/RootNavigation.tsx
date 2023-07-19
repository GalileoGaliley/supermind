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

// import {useFirebase} from 'common/types/hooks/useFirebase';

export const navigationRef =
  createRef<NavigationContainerRef<RootStackParamsList>>();
const RootStack = createStackNavigator<RootStackParamsList>();

const RootNavigation = () => {
  const dispatch = useDispatch();

  const token = useUserToken();

  useEffect(() => {
    console.log(
      'token?',
      token ? `вот${token}` : `а нету токена братан! Только ${token}`,
    );
    const data = {
      key: '123',
      uuid: '24123131',
    };
    if (!token) {
      dispatch(fetchSignInAction(data));
      return;
    }
  }, [token]);

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
      <RootStack.Navigator screenOptions={rootOptions} initialRouteName="Start">
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

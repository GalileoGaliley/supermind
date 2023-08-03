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

import StartNavigation from './StartNavigation';
import {RootStackParamsList} from './types';
import TabNavigation from './TabNavigation';
import SettingsScreen from '../screens/customStack/SettingsScreen';
import {StyleSheet} from 'react-native';
import BackButton from '../components/header/components/BackButton';
// import ChatNavigation from './ChatNavigation';
import ChatNavigation from './ChatNavigation';
import {getSubscriptions, initConnection} from 'react-native-iap';
import {addProductsAction} from '../store/products/products.slice';

// import {useFirebase} from 'common/types/hooks/useFirebase';

export const navigationRef =
  createRef<NavigationContainerRef<RootStackParamsList>>();
const RootStack = createStackNavigator<RootStackParamsList>();

const RootNavigation = () => {
  const dispatch = useDispatch();

  const getProd = async () => {
    const connected = await initConnection();
    console.log('connected');
    console.log('connected');
    console.log('connected');
    console.log(connected);
    console.log('connected');
    console.log('connected');
    console.log('connected');
    console.log('connected');

    if (connected) {
      const skus = {
        skus: [
          'org.super_mind.premium.1month',
          'org.super_mind.premium.1week',
          'org.super_mind.premium.1week.offer',
          'org.super_mind.premium.1year',
        ],
      };
      const subs = await getSubscriptions(skus);
      // @ts-ignore
      await dispatch(addProductsAction(subs));
    }
  };
  useEffect(() => {
    getProd();
  });
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

  // const rootOptions: StackNavigationOptions = {
  //   // headerShown: false,
  //   headerTitleAlign: 'center',
  // };

  const navOptions: StackNavigationOptions = {
    headerShown: false,
  };

  const settingsOptions: Partial<StackNavigationOptions> = {
    title: 'Settings',
    headerTransparent: true,
    headerTitleAlign: 'center',
    headerTitleStyle: styles.screenTitle,
    headerLeft: () => <BackButton />,
  };

  const chatOptions: Partial<StackNavigationOptions> = {
    headerTransparent: true,
    headerShown: false,
    headerTitleAlign: 'center',
    headerTitleStyle: styles.screenTitle,
  };

  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack.Navigator initialRouteName="Start">
        <RootStack.Screen
          name="Tabs"
          component={TabNavigation}
          options={navOptions}
        />
        <RootStack.Screen
          name="Start"
          component={StartNavigation}
          options={navOptions}
        />
        <RootStack.Screen
          name="SettingsScreen"
          component={SettingsScreen}
          options={settingsOptions}
        />
        <RootStack.Screen
          options={chatOptions}
          name="ChatNavigation"
          component={ChatNavigation}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  screenTitle: {
    fontSize: 20,
    color: '#fff',
  },
});

export default RootNavigation;

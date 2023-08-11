import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import type {StackNavigationOptions} from '@react-navigation/stack';
import {createStackNavigator} from '@react-navigation/stack';
import React, {createRef, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import changeNavigationBarColor from 'react-native-navigation-bar-color';

import {fetchSignInAction} from '../store/user/user.actions';

import StartNavigation from './StartNavigation';
import {RootStackParamsList} from './types';
import TabNavigation from './TabNavigation';
import SettingsScreen from '../screens/customStack/SettingsScreen';
import {StyleSheet} from 'react-native';
import BackButton from '../components/header/components/BackButton';
// import ChatNavigation from './ChatNavigation';
import ChatNavigation from './ChatNavigation';
import {
  getAvailablePurchases,
  getSubscriptions,
  initConnection,
} from 'react-native-iap';
import {
  addActiveSubsAction,
  addProductsAction,
  setLoading,
} from '../store/products/products.slice';
import RNDeviceInfo from 'react-native-device-info';
import {
  useProductsLoading,
  useActiveSubs,
} from '../store/products/products.selectors';
import SplashComponent from '../components/splashComponent/SplashComponent';
import SplashScreen from 'react-native-splash-screen';
// import {useFirebase} from 'common/types/hooks/useFirebase';

export const navigationRef =
  createRef<NavigationContainerRef<RootStackParamsList>>();
const RootStack = createStackNavigator<RootStackParamsList>();

const RootNavigation = () => {
  const dispatch = useDispatch();
  const DI = RNDeviceInfo.getDeviceId();
  const loading = useProductsLoading();
  const activeSubs = useActiveSubs();

  const getProd = async () => {
    const connected = await initConnection();
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

      const activeSub = await getAvailablePurchases();
      await dispatch(setLoading(false));
      if (activeSub.length) {
        await dispatch(addActiveSubsAction(activeSub));
      }
    }
  };

  useEffect(() => {
    getProd();
    SplashScreen.hide();
    changeNavigationBarColor('#1c1c23');
  }, []);

  useEffect(() => {
    const data = {
      key: 'yYbW0NpF4HKDarHuyjNGPEn7updjR5g',
      uuid: DI,
    };
    dispatch(fetchSignInAction(data));
    return;
  }, []);

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

  if (loading) {
    return <SplashComponent />;
  }

  const isActiveSubs =
    activeSubs &&
    activeSubs.length > 0 &&
    activeSubs[activeSubs.length - 1].purchaseStateAndroid === 1;

  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack.Navigator initialRouteName={isActiveSubs ? 'Tabs' : 'Start'}>
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

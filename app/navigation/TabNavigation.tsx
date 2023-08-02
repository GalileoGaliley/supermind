import React from 'react';
// import {StyleSheet} from 'react-native';

import type {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import ChatsPromptsScreen from '../screens/chatStack/ChatsPromptsScreen';

import type {
  BaseNavigationOptionParams,
  BottomTabsParamsList,
  RootStackParamsList,
} from './types';

// import {rubikBold} from '../style/font';

import ChatPromptsIcon from '../assets/images/icons/ChatPromptsIcon';
import PresetsIcon from '../assets/images/icons/PresetsIcon';
import {StyleSheet} from 'react-native';
import ChatPresetsScreen from '../screens/chatStack/ChatPresetsScreen/ChatPresetsScreen';
import HistoryIcon from '../assets/images/icons/HistoryIcon';
import GearIcon from '../assets/images/icons/GearIcon';
import HeaderButton from '../components/header/components/HeaderButton';

const TabNavigation = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamsList>>();

  const BottomTab = createBottomTabNavigator<BottomTabsParamsList>();

  const getBaseNavigatorOptions = ({
    navigatorParams: {
      route: {name},
    },
    routeNames,
  }: BaseNavigationOptionParams): BottomTabNavigationOptions => {
    const isRouteIncluded = routeNames.includes(name);

    return {
      headerShown: isRouteIncluded,
      tabBarActiveTintColor: '#060606',
      tabBarInactiveTintColor: '#a8bdca',
    };
  };

  const generalTabsOptions: Partial<BottomTabNavigationOptions> = {
    tabBarLabelStyle: {width: 100},
    headerTransparent: true,
    headerShadowVisible: false,
    headerTitleAlign: 'center',
    headerTitleStyle: styles.screenTitle,
    tabBarStyle: {
      borderTopWidth: 0,
      elevation: 0,
      height: 65,
      backgroundColor: '#1C1C25',
    },
    tabBarInactiveTintColor: '#69737B',
    tabBarActiveTintColor: '#69737B',
  };

  const pressSettingButton = () => {
    navigation.navigate('SettingsScreen', undefined);
  };

  const pressHistoryButton = () => {
    navigation.navigate('ChatNavigation', {screen: 'HistoryScreen'});
  };

  const tabPromptsOptions: BottomTabNavigationOptions = {
    tabBarLabel: 'Charts',
    tabBarIcon: ({focused}) => <ChatPromptsIcon active={focused} />,
    title: 'Chat',
    headerLeft: () => (
      <HeaderButton
        callback={pressHistoryButton}
        Icon={<HistoryIcon fill={'#fff'} />}
      />
    ),
    headerRight: () => (
      <HeaderButton
        callback={pressSettingButton}
        Icon={<GearIcon fill={'#fff'} />}
      />
    ),
    ...generalTabsOptions,
  };

  const tabPresetsOptions: BottomTabNavigationOptions = {
    tabBarLabel: 'Tasks fo AI',
    tabBarIcon: ({focused}) => <PresetsIcon active={focused} />,
    title: 'Tasks fo AI',
    headerLeft: () => (
      <HeaderButton
        callback={pressHistoryButton}
        Icon={<HistoryIcon fill={'#fff'} />}
      />
    ),
    headerRight: () => (
      <HeaderButton
        callback={pressSettingButton}
        Icon={<GearIcon fill={'#fff'} />}
      />
    ),
    ...generalTabsOptions,
  };

  return (
    <BottomTab.Navigator
      screenOptions={params =>
        getBaseNavigatorOptions({
          navigatorParams: params,
          routeNames: ['PromptsTab', 'PresetsTab'],
        })
      }>
      <BottomTab.Screen
        name="PromptsTab"
        component={ChatsPromptsScreen}
        options={tabPromptsOptions}
      />
      <BottomTab.Screen
        name="PresetsTab"
        component={ChatPresetsScreen}
        options={tabPresetsOptions}
      />
    </BottomTab.Navigator>
  );
};

const styles = StyleSheet.create({
  screenTitle: {
    fontSize: 20,
    color: '#fff',
  },
});

export default TabNavigation;

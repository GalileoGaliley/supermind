import type {StackNavigationOptions} from '@react-navigation/stack';
import {createStackNavigator} from '@react-navigation/stack';
import type {BaseNavigationOptionParams, ChatStackParamsList} from './types';
import React from 'react';

// import {useUserToken} from 'store/user/user.selectors';
import HistoryScreen from '../screens/chatStack/HistoryScreen/HistoryScreen';

const ChatNavigation = () => {
  const ChatStack = createStackNavigator<ChatStackParamsList>();

  // const token = useUserToken();
  const getBaseNavigatorOptions = ({
    navigatorParams: {
      route: {name},
    },
    routeNames,
  }: BaseNavigationOptionParams): StackNavigationOptions => {
    const isRouteIncluded = routeNames.includes(name);
    console.log(isRouteIncluded);
    return {
      headerMode: 'float',
      cardShadowEnabled: true,
      cardOverlayEnabled: true,
    };
  };

  return (
    <ChatStack.Navigator
      screenOptions={params =>
        getBaseNavigatorOptions({
          navigatorParams: params,
          routeNames: ['HistoryScreen'],
        })
      }>
      <ChatStack.Screen
        options={{headerShown: false, title: '123'}}
        name="HistoryScreen"
        component={HistoryScreen}
      />
    </ChatStack.Navigator>
  );
};

export default ChatNavigation;

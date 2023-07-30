import type {StackNavigationOptions} from '@react-navigation/stack';
import {createStackNavigator} from '@react-navigation/stack';
import type {BaseNavigationOptionParams, ChatStackParamsList} from './types';
import React from 'react';

// import {useUserToken} from 'store/user/user.selectors';
import HistoryScreen from '../screens/chatStack/HistoryScreen/HistoryScreen';
import ChatScreen from '../screens/chatStack/ChatScreen/ChatScreen';
import {StyleSheet} from 'react-native';
import BackButton from '../components/header/components/BackButton';

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

  const options: Partial<StackNavigationOptions> = {
    headerTransparent: true,
    headerShadowVisible: false,
    headerTitleAlign: 'center',
    headerLeft: () => <BackButton />,
    headerTitleStyle: styles.screenTitle,
  };

  return (
    <ChatStack.Navigator
      screenOptions={params =>
        getBaseNavigatorOptions({
          navigatorParams: params,
          routeNames: ['HistoryScreen', 'ChatScreen'],
        })
      }>
      <ChatStack.Screen
        options={{...options, title: 'History'}}
        name="HistoryScreen"
        component={HistoryScreen}
      />
      <ChatStack.Screen
        options={{...options, title: 'Chat'}}
        name="ChatScreen"
        component={ChatScreen}
      />
    </ChatStack.Navigator>
  );
};

const styles = StyleSheet.create({
  screenTitle: {
    fontSize: 20,
    color: '#fff',
  },
});

export default ChatNavigation;

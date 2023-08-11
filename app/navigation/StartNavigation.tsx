import type {StackNavigationOptions} from '@react-navigation/stack';
import {createStackNavigator} from '@react-navigation/stack';
import type {BaseNavigationOptionParams, StartTabsParamsList} from './types';
import React from 'react';

// import {useUserToken} from 'store/user/user.selectors';
import GreetingScreen from '../screens/startStack/GreetingScreen';
import PresentationScreen from '../screens/startStack/PresentationScreen';
import PresentationMessagingScreen from "../screens/startStack/PresentationMessagingScreen";
import SecondPresentationMessagingScreen from "../screens/startStack/SecondPresentationMessagingScreen";
import PaymentScreen from "../screens/startStack/PaymentScreen";

const StartNavigation = () => {
  const StartStack = createStackNavigator<StartTabsParamsList>();

  // const token = useUserToken();
  const getBaseNavigatorOptions = ({
    navigatorParams: {
      route: {name},
    },
    routeNames,
  }: BaseNavigationOptionParams): StackNavigationOptions => {
    const isRouteIncluded = routeNames.includes(name);
    return {
      headerMode: 'float',
      cardShadowEnabled: true,
      cardOverlayEnabled: true,
      cardStyleInterpolator: ({current, layouts}) => {
        return {
          cardStyle: {
            transform: [
              {
                translateX: current.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [layouts.screen.width, 0],
                }),
              },
            ],
          },
        };
      },
    };
  };

  return (
    <StartStack.Navigator
      screenOptions={params =>
        getBaseNavigatorOptions({
          navigatorParams: params,
          routeNames: [
            'GreetingScreen',
            'PresentationScreen',
            'PresentationMessagingScreen',
            'SecondPresentationMessagingScreen',
          ],
        })
      }>
      <StartStack.Screen
        options={{headerShown: false}}
        name="GreetingScreen"
        component={GreetingScreen}
      />
      <StartStack.Screen
        options={{headerShown: false}}
        name="PresentationScreen"
        component={PresentationScreen}
      />
      <StartStack.Screen
        options={{headerShown: false}}
        name="PresentationMessagingScreen"
        component={PresentationMessagingScreen}
      />
      <StartStack.Screen
        options={{headerShown: false}}
        name="SecondPresentationMessagingScreen"
        component={SecondPresentationMessagingScreen}
      />
      <StartStack.Screen
        options={{headerShown: false}}
        name="PaymentScreen"
        component={PaymentScreen}
      />
    </StartStack.Navigator>
  );
};

export default StartNavigation;

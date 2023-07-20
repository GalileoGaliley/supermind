import type {StackNavigationOptions} from '@react-navigation/stack';
import {createStackNavigator} from '@react-navigation/stack';
import type {BaseNavigationOptionParams, StartTabsParamsList} from './types';
import React from 'react';

// import {useUserToken} from 'store/user/user.selectors';
import GreetingScreen from '../screens/startStack/GreetingScreen';
import PresentationScreen from '../screens/startStack/PresentationScreen';

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
    console.log(isRouteIncluded);
    return {
      headerMode: 'float',
      cardShadowEnabled: true,
      cardOverlayEnabled: true,
    };
  };

  return (
    <StartStack.Navigator
      screenOptions={params =>
        getBaseNavigatorOptions({
          navigatorParams: params,
          routeNames: ['GreetingScreen', 'PresentationScreen'],
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
    </StartStack.Navigator>
  );
};

export default StartNavigation;
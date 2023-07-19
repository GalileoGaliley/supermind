import type {RouteProp} from '@react-navigation/native';

export type RootStackParamsList = {
  Start: undefined;
  GreetingScreen: undefined;
  PresentationScreen: undefined;
};

export type StartTabsParamsList = {
  GreetingScreen: undefined;
  PresentationScreen: undefined;
};

type StackScreenOptions = {
  route: RouteProp<RootStackParamsList, keyof RootStackParamsList>;
  navigation: any;
};

export type BaseNavigationOptionParams = {
  navigatorParams: StackScreenOptions;
  routeNames: Array<keyof RootStackParamsList>;
};

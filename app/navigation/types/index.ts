import type {RouteProp} from '@react-navigation/native';

export type BottomTabsParamsList = {
  PromptsTab: undefined;
  PresetsTab: undefined;
};

export type RootStackParamsList = {
  Start: undefined;
  GreetingScreen: undefined;
  PresentationScreen: undefined;
  PresentationMessagingScreen: undefined;
  SecondPresentationMessagingScreen: undefined;
  Tabs: undefined;
} & BottomTabsParamsList;

export type StartTabsParamsList = {
  GreetingScreen: undefined;
  PresentationScreen: undefined;
  PresentationMessagingScreen: undefined;
  SecondPresentationMessagingScreen: undefined;
};

type StackScreenOptions = {
  route: RouteProp<RootStackParamsList, keyof RootStackParamsList>;
  navigation: any;
};

export type BaseNavigationOptionParams = {
  navigatorParams: StackScreenOptions;
  routeNames: Array<keyof RootStackParamsList>;
};

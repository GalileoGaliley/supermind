import type {RouteProp} from '@react-navigation/native';

export type BottomTabsParamsList = {
  PromptsTab: undefined;
  PresetsTab: undefined;
};

export type RootStackParamsList = {
  Start: undefined;
  Custom: undefined;
  Tabs: undefined;
} & BottomTabsParamsList &
  StartTabsParamsList &
  CustomStackParamsList;

export type StartTabsParamsList = {
  GreetingScreen: undefined;
  PresentationScreen: undefined;
  PresentationMessagingScreen: undefined;
  SecondPresentationMessagingScreen: undefined;
};

export type CustomStackParamsList = {
  SettingsScreen: undefined;
};

type StackScreenOptions = {
  route: RouteProp<RootStackParamsList, keyof RootStackParamsList>;
  navigation: any;
};

export type BaseNavigationOptionParams = {
  navigatorParams: StackScreenOptions;
  routeNames: Array<keyof RootStackParamsList>;
};

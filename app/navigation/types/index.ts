import type {RouteProp} from '@react-navigation/native';
import {Chat} from '../../store/chat/chat.types';

export type BottomTabsParamsList = {
  PromptsTab: undefined;
  PresetsTab: undefined;
};

export type RootStackParamsList = {
  Start: undefined;
  Custom: undefined;
  Tabs: undefined;
  ChatNavigation: {screen: string; params?: {data: Partial<Chat>}};
} & BottomTabsParamsList &
  StartTabsParamsList &
  CustomStackParamsList &
  ChatStackParamsList;

export type StartTabsParamsList = {
  GreetingScreen: undefined;
  PresentationScreen: undefined;
  PresentationMessagingScreen: undefined;
  SecondPresentationMessagingScreen: undefined;
  PaymentScreen: undefined;
};

export type ChatStackParamsList = {
  HistoryScreen: undefined;
  ChatScreen: {
    data: Partial<Chat>;
  };
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

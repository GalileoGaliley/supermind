import {Subscription, SubscriptionAndroid} from 'react-native-iap';

type Sub = Subscription & {
  subscriptionOfferDetails?: SubscriptionAndroid['subscriptionOfferDetails'];
};

type SubData = {
  sku: string;
  period: string;
  name?: string;
  subscriptionOfferDetails: SubscriptionAndroid['subscriptionOfferDetails'];
};

type ProductsState = {
  subs: Sub[];
  subscribes: {
    [key: string]: SubData;
  };
  loading: boolean;
};

export type {ProductsState};

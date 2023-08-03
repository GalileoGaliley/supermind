import {createSlice} from '@reduxjs/toolkit';

import {SliceNames} from '../enums';
import {SubscriptionAndroid} from 'react-native-iap';
import {ProductsState} from './products.types';

const initialState: ProductsState = {
  subs: [],
  subscribes: {
    'Week sub with 3 days free trial': {
      subscriptionOfferDetails: [],
      period: 'week',
      name: '3 days free trial',
      sku: 'org.super_mind.premium.1week.offer',
    },
    'One week without trial': {
      subscriptionOfferDetails: [],
      period: 'week',
      name: 'Weekly',
      sku: 'org.super_mind.premium.1week',
    },
    'one month subscribe': {
      subscriptionOfferDetails: [],
      period: 'month',
      name: 'Monthly',
      sku: 'org.super_mind.premium.1month',
    },
    'One year subscribe': {
      subscriptionOfferDetails: [],
      period: 'year',
      name: 'Best Price',
      sku: 'org.super_mind.premium.1year',
    },
  },
  loading: false,
};

const productSlice = createSlice({
  initialState,
  name: SliceNames.PRODUCTS,
  reducers: {
    addProductsAction: (state, {payload}: {payload: SubscriptionAndroid[]}) => {
      state.subs = payload;
      payload.forEach(item => {
        if (item.subscriptionOfferDetails) {
          state.subscribes[item.name].subscriptionOfferDetails =
            item.subscriptionOfferDetails;
        }
      });
    },
  },
});

export const {addProductsAction} = productSlice.actions;
export default productSlice.reducer;

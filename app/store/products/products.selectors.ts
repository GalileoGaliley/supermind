import {useAppSelector} from '../hooks/useAppSelector';

const useSubs = () => useAppSelector(state => state.products.subs);
const useSubscribes = () => useAppSelector(state => state.products.subscribes);
const useSubsCount = () => useAppSelector(state => state.products.subs.length);
const useProductsLoading = () =>
  useAppSelector(state => state.products.loading);

export {useProductsLoading, useSubs, useSubsCount, useSubscribes};

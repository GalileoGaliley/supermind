import {useAppSelector} from '../hooks/useAppSelector';

const useUserToken = () =>
  useAppSelector(
    ({
      user: {
        user: {token},
      },
    }) => token,
  );

const useFreeRequests = () =>
  useAppSelector(
    ({
      user: {
        user: {freeRequest},
      },
    }) => freeRequest,
  );

const useUserLoading = () => useAppSelector(({user: {loading}}) => loading);

export {useUserToken, useUserLoading, useFreeRequests};

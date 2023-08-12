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

const useIsEntered = () => useAppSelector(({user: {isEntered}}) => isEntered);

const useUserLoading = () => useAppSelector(({user: {loading}}) => loading);

export {useUserToken, useIsEntered, useUserLoading, useFreeRequests};

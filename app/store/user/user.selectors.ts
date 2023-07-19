import {useAppSelector} from '../hooks/useAppSelector';

const useUserToken = () =>
  useAppSelector(
    ({
      user: {
        user: {token},
      },
    }) => token,
  );

const useUserLoading = () => useAppSelector(({user: {loading}}) => loading);

export {useUserToken, useUserLoading};

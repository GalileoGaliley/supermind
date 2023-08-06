import {useAppSelector} from '../hooks/useAppSelector';

const useHistory = () => useAppSelector(state => state.history.history);
const useHistoryLoading = () => useAppSelector(state => state.history.loading);

export {useHistory, useHistoryLoading};

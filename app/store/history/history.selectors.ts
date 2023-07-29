import {useAppSelector} from '../hooks/useAppSelector';

const useHistory = () => useAppSelector(state => state.history.history);

export {useHistory};

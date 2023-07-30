import {useAppSelector} from '../hooks/useAppSelector';

const useChat = () => useAppSelector(state => state.chat.chat);

export {useChat};

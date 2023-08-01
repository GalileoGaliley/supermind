import {useAppSelector} from '../hooks/useAppSelector';

const useChat = () => useAppSelector(state => state.chat.chat);
const useChatLoading = () => useAppSelector(state => state.chat.loading);

export {useChat, useChatLoading};

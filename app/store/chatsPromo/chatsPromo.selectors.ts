import {useAppSelector} from '../hooks/useAppSelector';

const usePrompts = () => useAppSelector(state => state.chatsPromo.chats);

export {usePrompts};

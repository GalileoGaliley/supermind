import {useAppSelector} from '../hooks/useAppSelector';

const usePrompts = () => useAppSelector(state => state.chatsPromo.chats);
const usePromptsLoading = () =>
  useAppSelector(state => state.chatsPromo.loading);

export {usePrompts, usePromptsLoading};

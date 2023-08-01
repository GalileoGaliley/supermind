import {FetchChatData} from '../../store/chat/chat.types';

import {fetchChat} from './fetchChat';
import {createChat} from './chatCreate';
import {continueChat} from './continueChat';
import {fetchChatPreset} from './fetchChatPreset';
import {fetchChatPresetData} from './fetchChatPresetData';

class ChatServices {
  fetchChatService = (data: FetchChatData) => fetchChat(data);
  createChatService = (data: {message: string}) => createChat(data);
  continueChatService = (data: FetchChatData) => continueChat(data);
  fetchChatPresetService = (data: {presetId: number}) => fetchChatPreset(data);
  fetchChatPresetDataService = (data: {presetId: number}) =>
    fetchChatPresetData(data);
}

const chatServices = new ChatServices();

export {chatServices};

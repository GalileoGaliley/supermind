import {FetchChatData} from '../../store/chat/chat.types';

import {fetchChat} from './fetchChat';
import {createChat} from './chatCreate';
import {continueChat} from './continueChat';

class ChatServices {
  fetchChatService = (data: FetchChatData) => fetchChat(data);
  createChatService = (data: {message: string}) => createChat(data);
  continueChatService = (data: FetchChatData) => continueChat(data);
}

const chatServices = new ChatServices();

export {chatServices};

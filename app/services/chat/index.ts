import {FetchChatData} from '../../store/chat/chat.types';

import {fetchChat} from './fetchChat';

class ChatServices {
  fetchChatService = (data: FetchChatData) => fetchChat(data);
}

const chatServices = new ChatServices();

export {chatServices};

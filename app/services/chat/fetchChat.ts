import {endpoints} from '../../endpoints';
import {axiosInstance as axios} from '../../services/api';
import type {FetchChatData, Chat} from '../../store/chat/chat.types';

const {
  chat: {chat: chatUrl},
} = endpoints;

const fetchChat = async (reqData: FetchChatData): Promise<Chat> => {
  try {
    const {data: chat} = await axios.post(chatUrl, reqData);
    return chat;
  } catch (error) {
    return Promise.reject(error);
  }
};

export {fetchChat};

import {endpoints} from '../../endpoints';
import {axiosInstance as axios} from '../../services/api';
import type {ChatPromptList} from '../../store/chatsPromo/chatsPromo.types';

const {
  chat: {chatsPromo: chatUrl},
} = endpoints;

const fetchChatPromo = async (): Promise<ChatPromptList> => {
  try {
    const {data: chat} = await axios.get(chatUrl);
    return chat;
  } catch (error) {
    return Promise.reject(error);
  }
};

export {fetchChatPromo};

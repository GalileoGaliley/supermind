import {endpoints} from '../../endpoints';
import {axiosInstance as axios} from '../../services/api';
import type {Chat} from '../../store/chat/chat.types';

const {
  chat: {chatCreate: chatUrl},
} = endpoints;

const createChat = async (reqData: {
  message: string;
}): Promise<{chatId: number}> => {
  try {
    const {data: chat} = await axios.post(chatUrl, reqData);
    return chat;
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};

export {createChat};

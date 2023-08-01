import {endpoints} from '../../endpoints';
import {axiosInstance as axios} from '../../services/api';

const {
  chat: {chatsPresets: chatUrl},
} = endpoints;

const fetchChatPreset = async (reqData: {
  presetId: number;
}): Promise<number> => {
  try {
    const {
      data: {chatId: chatId},
    } = await axios.post<{chatId: number}>(chatUrl, reqData);
    return chatId;
  } catch (error) {
    return Promise.reject(error);
  }
};

export {fetchChatPreset};

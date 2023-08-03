import {endpoints} from '../../endpoints';
import {axiosInstance as axios} from '../../services/api';
import {Chat} from '../../store/chat/chat.types';

const {
  chat: {chatsPresetsData: chatUrl},
} = endpoints;

const fetchChatPresetData = async (reqData: {
  presetId: number;
}): Promise<Chat> => {
  try {
    const {data} = await axios.post<Chat>(chatUrl, reqData);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export {fetchChatPresetData};

import {endpoints} from '../../endpoints';
import {FetchChatData} from '../../store/chat/chat.types';
import {baseURL, tokenAPI} from '../api';
import SSE from 'react-native-sse';

const {
  chat: {chatContinue: chatUrl},
} = endpoints;

const continueChat = async (
  reqData: FetchChatData,
): Promise<{
  message: string;
  id: string;
}> => {
  let textMessage = '';
  try {
    const es = new SSE(
      `${baseURL}${chatUrl}/${reqData.historyId}/${reqData.message}`,
      {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + tokenAPI,
          'Response-Type': 'stream',
          Connection: 'keep-alive',
        },
      },
    );

    es.addEventListener('message', e => {
      if (e.type === 'message') {
        if (e.data === '[DONE]') {
          es.close();
          es.removeAllEventListeners();
          return;
        }
        // @ts-ignore
        let payload = JSON.parse(e.data);
        let text = payload.choices[0].delta.content;
        if (text !== '\n') {
          textMessage += text;
        }
      }
    });

    es.addEventListener('open', e => {
      console.log(e);
    });

    es.addEventListener('error', e => {
      if (e.type === 'error') {
        es.close();
        console.log(e);
        return;
      }
    });
    await es.open();

    return {message: 'asd', id: '16301'};
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};

export {continueChat};

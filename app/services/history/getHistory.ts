import {History} from 'store/history/history.types';

import {endpoints} from '../../endpoints';
import {axiosInstance as axios} from '../../services/api';

const {
  history: {history: historyUrl},
} = endpoints;

const getHistory = async (): Promise<History> => {
  try {
    const {data: history} = await axios.get(historyUrl);
    return history;
  } catch (error) {
    return Promise.reject(error);
  }
};

export {getHistory};

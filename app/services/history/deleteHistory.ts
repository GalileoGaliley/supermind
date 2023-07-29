import {endpoints} from '../../endpoints';
import {axiosInstance as axios} from '../../services/api';

const {
  history: {history: historyUrl},
} = endpoints;

const deleteHistory = async (id: number): Promise<void> => {
  try {
    await axios.delete(historyUrl, {data: {id: id}});
  } catch (error) {
    return Promise.reject(error);
  }
};

export {deleteHistory};

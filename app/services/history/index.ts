import {getHistory} from './getHistory';
import {deleteHistory} from './deleteHistory';

class HistoryServices {
  getHistoryService = () => getHistory();
  deleteHistoryService = (id: number) => deleteHistory(id);
}

const historyServices = new HistoryServices();

export {historyServices};

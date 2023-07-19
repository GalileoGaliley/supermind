import {getHistory} from './getHistory';

class HistoryServices {
  getHistoryService = () => getHistory();
}

const historyServices = new HistoryServices();

export {historyServices};

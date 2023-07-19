import {Chat} from '../chat/chat.types';

export type History = Chat[];

export type HistoryState = {
  history: History;
  loading: boolean;
};

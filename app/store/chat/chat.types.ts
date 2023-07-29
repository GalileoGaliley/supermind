export type MessageItem = {
  role: 'assistant' | 'user';
  content: string;
};

export type Chat = {
  messages: MessageItem[];
  id: number;
  createdAt: string;
};

export type FetchChatData = {
  message: string;
  historyId: number;
};

export type ChatState = {
  chat: Chat;
  loading: boolean;
};

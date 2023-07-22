type ChatPromoItem = {
  id: number;
  title: string;
  desc: string;
  prompt: string;
  created_at: string;
  updated_at: string;
};

type ChatPromptItem = {
  id: number;
  title: string;
  created_at: string;
  updated_at: string;
  chatsPrompt: ChatPromoItem[];
};

type ChatPromptList = ChatPromptItem[];

type ChatPromptState = {
  chats: ChatPromptList;
  loading: boolean;
};

export type {ChatPromoItem, ChatPromptItem, ChatPromptList, ChatPromptState};

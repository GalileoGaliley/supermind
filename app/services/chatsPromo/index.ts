import {fetchChatPromo} from './getChatsPromo';

class ChatsPromoServices {
  fetchChatPromoService = () => fetchChatPromo();
}

const chatsPromoServices = new ChatsPromoServices();

export {chatsPromoServices};

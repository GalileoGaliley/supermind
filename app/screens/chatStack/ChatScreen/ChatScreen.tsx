import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Keyboard, Dimensions, FlatList} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamsList} from '../../../navigation/types';
import ChatInput from '../../../components/ChatInput/ChatInput';
import MessageItem from './components/MessageItem';
import {useDispatch} from 'react-redux';
import {addMessage, fillChat} from '../../../store/chat/chat.slice';
import {useChat, useChatLoading} from '../../../store/chat/chat.selectors';
import {fetchChatAction} from '../../../store/chat/chat.actions';
import HolderChat from './components/Holder';

const {height, width} = Dimensions.get('window');

const ChatScreen = () => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const dispatch = useDispatch();

  const chat = useChat();
  const [keyHeight, setKeyHeight] = useState(0);
  const loading = useChatLoading();

  useEffect(() => {
    const h = Keyboard.metrics()?.height;
    if (h) {
      setKeyHeight(h);
    } else {
      setKeyHeight(0);
    }
  }, [isKeyboardVisible]);

  const {
    params: {data},
  } = useRoute<RouteProp<RootStackParamsList, 'ChatScreen'>>();

  useEffect(() => {
    dispatch(fillChat(data));
    if (data.messages?.length === 1 && data.messages[0].role === 'user') {
      dispatch(
        fetchChatAction({
          message: data.messages[0].content,
          historyId: 0,
        }),
      );
    }
  }, [data]);

  const sendMessage = (message: string) => {
    dispatch(fetchChatAction({message: message, historyId: chat.id}));
    dispatch(addMessage(message));
  };

  return (
    <View
      style={{
        backgroundColor: '#16171D',
        height: '100%',
        position: 'relative',
      }}>
      <View style={{height: 80}} />
      <FlatList
        style={styles.container}
        data={chat.messages}
        inverted={true}
        renderItem={({item}) => {
          return (
            <>
              <MessageItem message={item.content} role={item.role} />
            </>
          );
        }}
        snapToEnd={true}
      />
      {loading ? <HolderChat /> : null}
      <View style={{height: 75}} />
      <ChatInput sendMessage={sendMessage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    // paddingTop: 150,
    backgroundColor: '#16171D',
  },
});

export default ChatScreen;

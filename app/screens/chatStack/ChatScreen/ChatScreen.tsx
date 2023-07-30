import React, {useEffect, useRef} from 'react';
import { StyleSheet, View, ScrollView, Text } from "react-native";
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamsList} from '../../../navigation/types';
import ChatInput from '../../../components/ChatInput/ChatInput';
import MessageItem from './components/MessageItem';
import {useDispatch} from 'react-redux';
import {addMessage, fillChat} from '../../../store/chat/chat.slice';
import {useChat} from '../../../store/chat/chat.selectors';
import {fetchChatAction} from '../../../store/chat/chat.actions';
import DeviceInfo from 'react-native-device-info';

const ChatScreen = () => {
  const dispatch = useDispatch();
  const ref = useRef<any>();

  const chat = useChat();

  const {
    params: {data},
  } = useRoute<RouteProp<RootStackParamsList, 'ChatScreen'>>();

  useEffect(() => {
    dispatch(fillChat(data));
    if (data.messages?.length === 1) {
      dispatch(
        fetchChatAction({
          message: data.messages[0].content,
          historyId: chat.id,
        }),
      );
    }
  }, [data]);

  const sendMessage = (message: string) => {
    dispatch(fetchChatAction({message: message, historyId: chat.id}));
    dispatch(addMessage(message));
  };

  return (
    <View>
      <ScrollView
        style={styles.container}
        ref={ref}
        onContentSizeChange={() => ref.current.scrollToEnd({animated: true})}>
        <Text>
          {DeviceInfo.getDeviceId()}
        </Text>
        {chat.messages.map(item => {
          return <MessageItem text={item.content} role={item.role} />;
        })}
        <View style={{height: 200}} />
      </ScrollView>
      <ChatInput sendMessage={sendMessage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flexDirection: 'column',
    height: '100%',
    backgroundColor: '#16171D',
    paddingTop: 82,
  },
});

export default ChatScreen;

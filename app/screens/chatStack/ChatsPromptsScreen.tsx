import React, {useEffect} from 'react';
import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';

import PromptsScroll from '../../components/Tiles/PromptsScroll';
import {useDispatch} from 'react-redux';
import {fetchChatPromoAction} from '../../store/chatsPromo/chatsPromo.actions';
import {usePrompts} from '../../store/chatsPromo/chatsPromo.selectors';
import {useUserToken} from '../../store/user/user.selectors';
import PromptList from '../../components/Tiles/PromptList';
import ChatInput from '../../components/ChatInput/ChatInput';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamsList} from '../../navigation/types';

const {width, height} = Dimensions.get('window');

const ChatsPromptsScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamsList>>();
  const dispatch = useDispatch();
  const token = useUserToken();

  const chatsPrompts = usePrompts();

  useEffect(() => {
    if (token) {
      dispatch(fetchChatPromoAction());
    }
  }, [token]);

  const sendMessage = (prompt: string) => {
    navigation.navigate('ChatNavigation', {
      screen: 'ChatScreen',
      params: {
        data: {
          messages: [{content: prompt, role: 'user'}],
        },
      },
    });
  };

  return (
    <View>
      <ScrollView style={styles.container}>
        {chatsPrompts.length ? (
          <React.Fragment key={chatsPrompts[0].id}>
            <Text style={styles.listTitle}>{chatsPrompts[0].title}</Text>
            <PromptsScroll
              updated_at={chatsPrompts[0].updated_at}
              created_at={chatsPrompts[0].created_at}
              chatsPrompt={chatsPrompts[0].chatsPrompt}
              title={chatsPrompts[0].title}
              id={1}
            />
          </React.Fragment>
        ) : null}
        {chatsPrompts
          ? chatsPrompts.slice(1).map(item => {
              return (
                <React.Fragment key={item.id}>
                  <Text style={styles.listTitle}>{item.title}</Text>
                  <PromptList
                    id={item.id}
                    title={item.title}
                    created_at={item.created_at}
                    updated_at={item.created_at}
                    chatsPrompt={item.chatsPrompt}
                  />
                </React.Fragment>
              );
            })
          : null}
        <View style={{height: 200}} />
      </ScrollView>
      <ChatInput sendMessage={sendMessage} />
    </View>
  );
};

const styles = StyleSheet.create({
  listTitle: {
    textAlign: 'left',
    width: '100%',
    paddingLeft: 10,
    marginBottom: 10,
    fontSize: 20,
    color: '#fff',
  },
  container: {
    position: 'relative',
    height: '100%',
    backgroundColor: '#16171D',
    paddingTop: 82,
  },
  prompts: {
    width: width,
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  titleContainer: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    color: '#fff',
  },
  subTitle: {
    color: '#fff',
    textAlign: 'center',
    paddingTop: 16,
    fontSize: 20,
  },
  header: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    marginTop: 14,
    marginBottom: 15,
  },
  videoContainer: {
    position: 'absolute',
    width: width,
    height: height,
    zIndex: -1,
    top: 0,
    left: 0,
  },
  video: {
    width: '100%',
    height: '100%',
  },
  image: {
    height: 100,
    width: 300,
  },
  next: {
    paddingBottom: 10,
    flexDirection: 'column',
    alignItems: 'center',
  },
  back: {
    width: width * 1.5,
    height: width * 1.5,
    position: 'absolute',
    top: width / 2.5,
    right: -50,
    zIndex: -2,
  },
});

export default ChatsPromptsScreen;

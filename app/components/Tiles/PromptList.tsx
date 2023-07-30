import React from 'react';
import {StyleSheet, View} from 'react-native';
import PromptTile from './PromptTile';
import {ChatPromptItem} from '../../store/chatsPromo/chatsPromo.types';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamsList} from '../../navigation/types';

type OwnProps = ChatPromptItem;
const PromptsList = ({chatsPrompt, id}: OwnProps) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamsList>>();

  const onClick = (prompt: string) => {
    navigation.navigate('ChatNavigation', {
      screen: 'ChatScreen',
      params: {
        data: {
          id: 0,
          messages: [{content: prompt, role: 'user'}],
          createdAt: '',
        },
      },
    });
  };

  return (
    <View style={styles.container}>
      {chatsPrompt.map(item => {
        return (
          <PromptTile
            onClick={() => onClick(item.prompt)}
            id={id}
            title={item.title}
            desc={item.desc}
            prompt={item.prompt}
            mr={0}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    width: '100%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
export default PromptsList;

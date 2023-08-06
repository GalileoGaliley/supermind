import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import PromptTile from './PromptTile';
import {ChatPromptItem} from '../../store/chatsPromo/chatsPromo.types';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamsList } from "../../navigation/types";

type OwnProps = ChatPromptItem;
const PromptsScroll = ({chatsPrompt, id}: OwnProps) => {
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
    <ScrollView
      showsHorizontalScrollIndicator={false}
      horizontal={true}
      style={styles.container}>
      {chatsPrompt.map(item => {
        return (
          <PromptTile
            id={id}
            onClick={() => onClick(item.prompt)}
            title={item.title}
            desc={item.desc}
            prompt={item.prompt}
          />
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
});
export default PromptsScroll;

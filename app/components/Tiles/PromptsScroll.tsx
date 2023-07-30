import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import PromptTile from './PromptTile';
import {ChatPromptItem} from '../../store/chatsPromo/chatsPromo.types';

type OwnProps = ChatPromptItem;
const PromptsScroll = ({chatsPrompt, id}: OwnProps) => {

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      horizontal={true}
      style={styles.container}>
      {chatsPrompt.map(item => {
        return (
          <PromptTile
            id={id}
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

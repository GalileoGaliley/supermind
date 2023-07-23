import React from 'react';
import {StyleSheet, View} from 'react-native';
import PromptTile from './PromptTile';
import {ChatPromptItem} from '../../store/chatsPromo/chatsPromo.types';

type OwnProps = ChatPromptItem;
const PromptsList = ({chatsPrompt, id}: OwnProps) => {
  return (
    <View style={styles.container}>
      {chatsPrompt.map(item => {
        return (
          <PromptTile
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

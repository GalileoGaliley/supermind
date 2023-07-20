import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import PromptContainer from './components/PromptContainer';
import LinesBack from '../../assets/images/icons/LinesBack';
import {promptsList} from '../../store/enums';

const {width, height} = Dimensions.get('window');
export default () => {
  return (
    <View style={styles.container}>
      {promptsList.map((item, index) => {
        return (
          <PromptContainer
            title={item.title}
            index={index}
            firstEmoji={item.firstEmoji}
            secondEmoji={item.secondEmoji}
            firstPrompt={item.firstPrompt}
            secondPrompt={item.secondPrompt}
            start={-200}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});

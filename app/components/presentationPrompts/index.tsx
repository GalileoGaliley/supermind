import React from 'react';
import {StyleSheet, View} from 'react-native';
import PromptContainer from './components/PromptContainer';

export default () => {
  return (
    <View style={styles.container}>
      <PromptContainer
        title={'Creativity'}
        icon={''}
        firstPrompt={'Generate atr'}
        secondPrompt={'Write song'}
        start={-200}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});

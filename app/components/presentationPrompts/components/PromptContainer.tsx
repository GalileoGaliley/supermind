import React, {useRef, useEffect} from 'react';
import {StyleSheet, View, Text, Animated} from 'react-native';

type OwnProps = {
  title: string;
  firstPrompt: string;
  secondPrompt: string;
  icon: string;
  start: number;
};
export default ({firstPrompt, secondPrompt, icon, title, start}: OwnProps) => {
  const translateXAnim = useRef(new Animated.Value(start)).current;

  useEffect(() => {
    Animated.timing(translateXAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View>
      <View style={styles.titleContainer}>
        <View style={styles.line} />
        <Text style={styles.title}>{title}</Text>
        <View style={styles.line} />
      </View>
      <Animated.View
        style={[styles.box, {transform: [{translateX: translateXAnim}]}]}>
        <Text>
          Hello worldlkxnvkkladjfnvlsknvmkaaaaaaaaaaaaaaakjdfnakjsdnaa
        </Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    backgroundColor: 'lightblue',
    padding: 20,
    borderRadius: 10,
  },
  messageContainer: {
    backgroundColor: 'transparent',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#07B548',
    marginHorizontal: 10,
    fontSize: 17,
  },
  line: {
    height: 1,
    flex: 1,
    backgroundColor: '#07B548',
    opacity: 0.3,
  },
});

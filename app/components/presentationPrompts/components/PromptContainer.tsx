import React, {useRef, useEffect} from 'react';
import {StyleSheet, View, Text, Animated, Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

type OwnProps = {
  title: string;
  firstPrompt: string;
  secondPrompt: string;
  firstEmoji: string;
  secondEmoji: string;
  start: number;
  index: number;
};

const {width} = Dimensions.get('window');
export default ({
  firstPrompt,
  secondPrompt,
  firstEmoji,
  secondEmoji,
  title,
  index,
  start,
}: OwnProps) => {
  const translateXFirstMessage = useRef(new Animated.Value(start)).current;
  const translateXSecondMessage = useRef(
    new Animated.Value(-start + width / 2),
  ).current;

  useEffect(() => {
    Animated.timing(translateXFirstMessage, {
      toValue: 0,
      duration: 1000 + index * 300,
      useNativeDriver: true,
    }).start();
    Animated.timing(translateXSecondMessage, {
      toValue: width / 2 - 33,
      duration: 1000 + index * 300,
      useNativeDriver: true,
    }).start();
  }, []);

  const firstColors =
    index % 2 === 0
      ? ['rgba(13, 77, 114, 0.7)', 'rgba(37, 137, 83, 0.7)']
      : ['rgba(101, 14, 141, 0.7)', 'rgba(37, 83, 137, 0.7)'];

  const secondColors =
    index % 2 !== 0
      ? ['rgba(13, 77, 114, 0.7)', 'rgba(37, 137, 83, 0.7)']
      : ['rgba(101, 14, 141, 0.7)', 'rgba(37, 83, 137, 0.7)'];

  return (
    <View>
      <View style={styles.titleContainer}>
        <View style={styles.line} />
        <Text style={styles.title}>{title}</Text>
        <View style={styles.line} />
      </View>
      <Animated.View
        style={[
          styles.box,
          {transform: [{translateX: translateXFirstMessage}], top: 30},
        ]}>
        <LinearGradient
          colors={firstColors}
          start={{x: 0.0887, y: 0.2941}}
          end={{x: 0.96, y: 0.9394}}
          style={styles.gradient}>
          <Text style={styles.text}>{firstPrompt}</Text>
          <Text style={styles.icon}>{firstEmoji}</Text>
        </LinearGradient>
      </Animated.View>
      <Animated.View
        style={[
          styles.box,
          {transform: [{translateX: translateXSecondMessage}]},
        ]}>
        <LinearGradient
          colors={secondColors}
          start={{x: 0.0887, y: 0.2941}}
          end={{x: 0.96, y: 0.9394}}
          locations={[-0.2692, 0.9263]}
          style={styles.gradient}>
          <Text style={styles.text}>{secondPrompt}</Text>
          <Text style={styles.icon}>{secondEmoji}</Text>
        </LinearGradient>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    borderRadius: 10,
    width: width / 2.2865853658536,
  },
  gradient: {
    minHeight: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderRadius: 10,
    border: '10px solid',
  },
  icon: {
    position: 'absolute',
    fontSize: 28,
    left: 15,
    top: -24,
    opacity: 1,
    color: '#fff',
  },
  text: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '400',
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

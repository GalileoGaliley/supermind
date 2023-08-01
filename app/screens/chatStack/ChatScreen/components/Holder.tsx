import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet, Text, View} from 'react-native';

const HolderChat = () => {
  const firstDotAnim = useRef(new Animated.Value(0)).current;
  const secondDotAnim = useRef(new Animated.Value(0)).current;
  const lastDotAnim = useRef(new Animated.Value(0)).current;

  const time = 500;

  useEffect(() => {
    Animated.loop(
      Animated.stagger(200, [
        Animated.timing(firstDotAnim, {
          toValue: -5,
          duration: time,
          useNativeDriver: true,
        }),
        Animated.timing(secondDotAnim, {
          toValue: -5,
          duration: time,
          useNativeDriver: true,
        }),
        Animated.timing(lastDotAnim, {
          toValue: -5,
          duration: time,
          useNativeDriver: true,
        }),
        Animated.timing(firstDotAnim, {
          toValue: 0,
          duration: time,
          useNativeDriver: true,
        }),
        Animated.timing(secondDotAnim, {
          toValue: 0,
          duration: time,
          useNativeDriver: true,
        }),
        Animated.timing(lastDotAnim, {
          toValue: 0,
          duration: time,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  return (
    <View style={[styles.holderContainer, {justifyContent: 'flex-start'}]}>
      <View style={[styles.holder, {backgroundColor: '#23232D'}]}>
        <Text style={styles.text}>Typing</Text>
        <Animated.View
          style={[styles.dot, {transform: [{translateY: firstDotAnim}]}]}
        />
        <Animated.View
          style={[styles.dot, {transform: [{translateY: secondDotAnim}]}]}
        />
        <Animated.View
          style={[styles.dot, {transform: [{translateY: lastDotAnim}]}]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  holderContainer: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 15,
    paddingHorizontal: 15,
  },
  dot: {
    backgroundColor: '#fff',
    height: 5,
    opacity: 0.3,
    width: 5,
    borderRadius: 20,
  },
  holder: {
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 10,
  },
  text: {
    color: '#fff',
    opacity: 0.4,
    marginRight: 5,
  },
});

export default HolderChat;

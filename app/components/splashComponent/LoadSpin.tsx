import React, {useEffect} from 'react';
import {Animated, Easing, Image, View} from 'react-native';
// @ts-ignore
import imageParticles from './1.png';
import {Lines} from './SVGImages';

const LoadSpin = () => {
  const spinValue = new Animated.Value(0);

  useEffect(() => {
    startRotation();
  }, []);

  const startRotation = () => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
    ).start();
  };
  return (
    <View
      style={{
        marginBottom: 120,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Animated.View
        style={{
          position: 'absolute',
          paddingLeft: 23,
          paddingBottom: 18,
          transform: [
            {
              rotate: spinValue.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '360deg'],
              }),
            },
          ],
        }}>
        <Image source={imageParticles} />
      </Animated.View>
      <Lines />
    </View>
  );
};

export default LoadSpin;

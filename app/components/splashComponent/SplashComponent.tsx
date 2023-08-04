import React, {useEffect} from 'react';
import {
  Dimensions,
  Image,
  Animated,
  ImageBackground,
  StyleSheet,
  View,
} from 'react-native';
// @ts-ignore
import image from '../../assets/launch_screen.png';
// @ts-ignore
import imageParticles from './1.png';
import {Lines} from './SVGImages';

const {width, height} = Dimensions.get('screen');
const SplashComponent = () => {
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
      }),
    ).start();
  };
  return (
    <View style={styles.container}>
      <ImageBackground style={styles.imageBack} source={image} />
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
            paddingLeft: 15,
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: width,
    height: height,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  imageBack: {
    position: 'absolute',
    width: width,
    height: height,
  },
});

export default SplashComponent;

import React from 'react';
import {Dimensions, ImageBackground, StyleSheet, View} from 'react-native';
// @ts-ignore
import image from '../../assets/launch_screen.png';
import LoadSpin from './LoadSpin';

const {width, height} = Dimensions.get('screen');

const SplashComponent = () => {
  return (
    <View style={styles.container}>
      <ImageBackground style={styles.imageBack} source={image} />
      <LoadSpin />
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

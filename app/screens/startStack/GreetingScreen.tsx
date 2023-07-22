import React, {useEffect, useRef} from 'react';
import {Dimensions, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Video from 'react-native-video';
import {StackNavigationProp} from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';

import {RootStackParamsList} from '../../navigation/types';
// @ts-ignore
import robot from '../../../app/assets/videos/robot_v1.mp4';
// @ts-ignore
import PoweredByIc from '../../assets/images/icons/PoweredBy';
import Button from '../../components/button';
import Chevron from '../../assets/images/icons/Chevron';

const {width, height} = Dimensions.get('window');

const GreetingScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamsList>>();
  const videoRef = useRef<Video>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.seek(0);
      // @ts-ignore
      videoRef.current.play();
    }
  }, []);

  const press = () => {
    navigation.navigate('PresentationScreen', undefined);
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#16171D', '#16171D', 'transparent', '#16171D', '#16171D']}
        style={styles.gradient}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        locations={[0, 0.1, 0.5, 0.9, 1]}>
        <View style={styles.titleContainer}>
          <View>
            <Text style={styles.title}>Hi! I am Supermind, your AI</Text>
            <Text style={styles.title}>based assistant!</Text>
          </View>
          <View>
            <Text style={styles.subTitle}>
              I'll answer any questions you have!
            </Text>
          </View>
        </View>
        <View style={styles.next}>
          <PoweredByIc />
          <Button onPress={press} Icon={<Chevron />} title={'Continue'} />
        </View>
        <View style={styles.videoContainer}>
          <Video
            style={styles.video}
            playInBackground={true}
            resizeMode="cover"
            source={robot}
            repeat={true}
          />
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
  },
  titleContainer: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    color: '#fff',
  },
  subTitle: {
    color: '#fff',
    textAlign: 'center',
    paddingTop: 16,
    fontSize: 20,
  },
  header: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    marginTop: 14,
    marginBottom: 15,
  },
  videoContainer: {
    position: 'absolute',
    width: width,
    height: height,
    zIndex: -1,
    top: 0,
    left: 0,
  },
  video: {
    width: '100%',
    height: '100%',
  },
  image: {
    height: 100,
    width: 300,
  },
  next: {
    paddingBottom: 10,
    flexDirection: 'column',
    alignItems: 'center',
  },
  gradient: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#16171d',
    paddingTop: 42,
    height: height,
  },
});

export default GreetingScreen;
